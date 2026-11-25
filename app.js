(() => {
  const config = window.EAT_GREEN_CONFIG || {};
  const $ = (s) => document.querySelector(s);
  const menuToggle = $("#menuToggle"), nav = $("#mainNav");
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open"); menuToggle?.setAttribute("aria-expanded", "false");
  }));
  $("#year").textContent = new Date().getFullYear();

  document.querySelectorAll("[data-interest]").forEach(el => el.addEventListener("click", () => {
    const interest = $("#formInterest");
    if (interest) {
      const value = el.dataset.interest;
      const option = [...interest.options].find(o => o.text.toLowerCase().includes(value.toLowerCase()));
      if (option) interest.value = option.value;
    }
  }));
  document.querySelectorAll("[data-audience]").forEach(el => el.addEventListener("click", () => {
    const profile = $("#formProfile");
    if (profile) {
      const value = el.dataset.audience;
      const option = [...profile.options].find(o => o.text.toLowerCase().includes(value.toLowerCase().split(" ")[0]));
      if (option) profile.value = option.value;
    }
  }));

  const form = $("#proposalForm");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      "Olá, Hortejo! Gostaria de fazer uma solicitação.",
      "",
      ...[...data.entries()].map(([key, value]) => key + ": " + value)
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const subject = encodeURIComponent("Solicitação de atendimento — Hortejo / Eat Green");
    if (config.contactEmail) {
      window.location.href = "mailto:" + config.contactEmail + "?subject=" + subject + "&body=" + body;
      $("#formFeedback").textContent = "Seu aplicativo de e-mail será aberto com a solicitação preenchida.";
    } else {
      $("#formFeedback").textContent = "O formulário está estruturado, mas o e-mail de recebimento ainda precisa ser configurado no arquivo config.js. Por enquanto, entre em contato pelo canal oficial da Hortejo.";
      $("#formFeedback").classList.add("form-warning");
    }
  });
})();