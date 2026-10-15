# Eat Green — site/PWA inicial

Site estático responsivo com recursos básicos de PWA. Preparado para publicação no GitHub Pages como **página informativa e de validação**.

## Arquivos
- `index.html`: conteúdo e estrutura do site.
- `styles.css`: identidade visual e adaptação para celular.
- `config.js`: **edite aqui** produtos, preços, planos, disponibilidade, WhatsApp, Instagram e área de entrega.
- `app.js`: renderização dos produtos/planos e interações.
- `manifest.webmanifest`: nome e configurações da instalação PWA.
- `sw.js`: cache básico para recursos do site.
- `assets/icon.svg`: ícone provisório.

## Antes de divulgar
1. Abra `config.js`.
2. Troque `whatsappNumber` pelo número oficial no formato internacional, só dígitos (ex.: `5511999999999` — exemplo de formato, não é número da marca).
3. Atualize `instagramUrl` e `deliveryArea`.
4. Substitua os produtos de exemplo por produtos reais. Não publique ingredientes, alergênicos, preços ou disponibilidade sem confirmação.
5. Defina preços dos planos somente após levantar custos e condições.
6. Mantenha `available: false` enquanto o produto/plano não estiver realmente disponível. Quando estiver validado, altere para `true`.
7. Adicione imagens reais à pasta `assets` e indique o caminho em `image`, por exemplo `assets/salada-verde.jpg`.

## Publicar no GitHub Pages
1. Entre em GitHub e crie um repositório, por exemplo `eat-green-site`.
2. Para um repositório público, selecione **Public**. GitHub Pages é hospedagem estática; não use este repositório para guardar dados pessoais de clientes, senhas, chaves secretas ou informações privadas.
3. Envie todos os arquivos e a pasta `assets` para a raiz do repositório (não envie somente o ZIP).
4. No repositório, abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**; branch `main`, pasta `/(root)`; salve.
6. Aguarde a publicação e abra a URL informada pelo GitHub Pages.
7. Teste em celular e computador, incluindo links, navegação e console do navegador.

## Observações importantes
- O PWA e o cache offline funcionam em contexto HTTPS (GitHub Pages fornece HTTPS). O primeiro carregamento precisa de conexão para baixar os arquivos.
- A fonte web pode não carregar offline; o navegador usará fontes alternativas.
- O cache é básico. Após alterações, se o navegador mostrar uma versão antiga, feche/reabra o site ou limpe os dados do site. Se fizer mudanças no `sw.js`, altere `CACHE_NAME` para `eat-green-v2`.
- GitHub Pages não fornece banco de dados, painel administrativo, carrinho persistente, estoque, login, checkout, pagamentos ou cobrança recorrente.
- O conteúdo de `config.js` é público, assim como todo o código publicado. Não coloque dados sensíveis nele.
- O formulário de pedido não foi conectado a um serviço externo nesta versão; o fluxo inicial é consulta por WhatsApp depois de configurar o número.
- Não há cobrança automática nem assinatura ativa. Os planos são apenas apresentação de formatos exploratórios.
- Consulte os termos e limites atuais do GitHub Pages antes de usar como hospedagem comercial definitiva. Esta versão serve para validar interesse; a operação de vendas, pagamentos e dados de clientes pode exigir serviços próprios e políticas de privacidade/termos.
