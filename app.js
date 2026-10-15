(() => {
  const config = window.EAT_GREEN_CONFIG || {};
  const $ = (selector) => document.querySelector(selector);
  const formatPrice = (price) => {
    if (typeof price !== "number" || !Number.isFinite(price)) return "Preço a definir";
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: config.currency || "BRL" }).format(price);
  };
  const whatsappUrl = (message) => {
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    if (!number) return "";
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  };
  const setupContact = () => {
    const url = whatsappUrl("Olá! Gostaria de conhecer a Eat Green e consultar as opções disponíveis.");
    ["#mainWhatsApp", "#contactWhatsApp"].forEach(sel => {
      const el = $(sel);
      if (!el) return;
      if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener"; }
      else {
        el.href = "#contato";
        if (sel === "#mainWhatsApp") el.addEventListener("click", e => {
          e.preventDefault();
          alert("O WhatsApp ainda não foi configurado. Abra config.js e preencha whatsappNumber com DDI + DDD + número.");
        });
        else el.textContent = "Número pendente de configuração";
      }
    });
    const insta = $("#instagramLink");
    if (insta) {
      if (config.instagramUrl) { insta.href = config.instagramUrl; insta.textContent = "Visitar Instagram"; }
      else { insta.href = "#contato"; insta.addEventListener("click", e => { e.preventDefault(); alert("Adicione o link do Instagram em config.js."); }); }
    }
    $("#deliveryArea").textContent = config.deliveryArea || "Informação pendente";
    $("#year").textContent = new Date().getFullYear();
  };

  const renderPlans = () => {
    const grid = $("#plansGrid");
    const plans = Array.isArray(config.plans) ? config.plans : [];
    if (!plans.length) { grid.innerHTML = '<p class="empty-state">Os planos serão divulgados em breve.</p>'; return; }
    grid.innerHTML = plans.map(plan => `
      <article class="plan-card ${plan.featured ? "featured" : ""}">
        <div class="plan-top"><span class="plan-tag">${escapeHtml(plan.tag || "CLUBE EAT GREEN")}</span></div>
        <h3>${escapeHtml(plan.name || "Plano")}</h3>
        <p>${escapeHtml(plan.description || "")}</p>
        <ul class="plan-includes">${(plan.includes || []).map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <div class="plan-price">${formatPrice(plan.price)} <small>${typeof plan.price === "number" ? "/ mês" : ""}</small></div>
        <a class="button ${plan.featured ? "button-primary" : "button-light"} plan-cta" href="${whatsappUrl(`Olá! Tenho interesse no plano ${plan.name}. Poderiam me informar disponibilidade, preço e condições?`) || "#pedido"}" data-plan="${escapeHtml(plan.name)}">${plan.available ? "Consultar plano" : "Manifestar interesse"}</a>
      </article>`).join("");
    grid.querySelectorAll(".plan-cta").forEach(link => {
      if (!config.whatsappNumber) link.addEventListener("click", e => { e.preventDefault(); alert("Configure o WhatsApp em config.js. Nenhuma assinatura será contratada por este site."); });
    });
  };

  const categories = () => ["Todos", ...new Set((config.products || []).map(p => p.category || "Outros"))];
  const renderFilters = (active = "Todos") => {
    const holder = $("#categoryFilters");
    holder.innerHTML = categories().map(c => `<button class="filter-button ${c === active ? "active" : ""}" type="button" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");
    holder.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
      renderFilters(btn.dataset.category);
      renderProducts(btn.dataset.category);
    }));
  };
  const renderProducts = (category = "Todos") => {
    const grid = $("#productsGrid");
    const products = (config.products || []).filter(p => category === "Todos" || (p.category || "Outros") === category);
    if (!products.length) { grid.innerHTML = '<p class="empty-state">Nenhum produto cadastrado nesta categoria.</p>'; return; }
    grid.innerHTML = products.map(p => {
      const image = p.image ? `<img src="${escapeAttribute(p.image)}" alt="${escapeAttribute(p.name || "Produto Eat Green")}" loading="lazy">` : '<span class="placeholder-art" aria-hidden="true">✳</span>';
      const msg = `Olá! Tenho interesse em ${p.name}. Poderiam confirmar ingredientes, preço, disponibilidade e entrega?`;
      const url = whatsappUrl(msg);
      return `<article class="product-card ${p.available ? "" : "unavailable"}">
        <div class="product-image">${image}</div>
        <div class="product-body">
          <span class="product-category">${escapeHtml(p.category || "Produto")}</span>
          <h3>${escapeHtml(p.name || "Produto sem nome")}</h3>
          <p>${escapeHtml(p.description || "")}</p>
          <div class="product-meta">${escapeHtml(p.ingredients || "Ingredientes a confirmar")}</div>
          <div class="product-bottom"><span class="product-price">${formatPrice(p.price)}</span><a class="button button-primary product-cta" href="${url || "#pedido"}">${p.available ? "Consultar" : "Em validação"}</a></div>
        </div>
      </article>`;
    }).join("");
    grid.querySelectorAll(".product-cta").forEach(link => {
      if (!config.whatsappNumber || link.getAttribute("href") === "#pedido") link.addEventListener("click", e => {
        e.preventDefault();
        if (!config.whatsappNumber) alert("Configure o WhatsApp em config.js para receber consultas de produtos.");
        else document.querySelector("#pedido").scrollIntoView({ behavior: "smooth" });
      });
    });
  };
  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function escapeAttribute(value) { return escapeHtml(value); }

  const menuToggle = $("#menuToggle");
  const nav = $("#mainNav");
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); menuToggle?.setAttribute("aria-expanded", "false");
  }));

  setupContact();
  renderPlans();
  renderFilters();
  renderProducts();
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(err => console.warn("PWA offline não registrado:", err)));
  }
})();