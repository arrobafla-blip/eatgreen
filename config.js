/*
  CONFIGURAÇÃO EDITÁVEL DO EAT GREEN
  Altere os textos e dados abaixo. Campos não confirmados ficam explicitamente pendentes.
  WhatsApp: informe somente DDI + DDD + número, apenas dígitos (ex.: 5511999999999).
*/
window.EAT_GREEN_CONFIG = {
  brandName: "Eat Green",
  whatsappNumber: "", // PENDENTE: número oficial de atendimento
  instagramUrl: "",   // PENDENTE: link oficial do Instagram
  deliveryArea: "PENDENTE: definir bairros/cidades atendidos",
  currency: "BRL",
  plans: [
    {
      id: "plano-1",
      name: "Essencial",
      tag: "PLANO EXPLORATÓRIO",
      description: "Para experimentar a praticidade do Clube.",
      includes: ["4 saladas por mês"],
      price: null, // PENDENTE: definir preço após levantamento de custos
      featured: false,
      available: false
    },
    {
      id: "plano-2",
      name: "Equilíbrio",
      tag: "PLANO EXPLORATÓRIO",
      description: "Mais variedade para acompanhar a semana.",
      includes: ["4 saladas por mês", "4 porções de frutas por mês"],
      price: null,
      featured: true,
      available: false
    },
    {
      id: "plano-3",
      name: "Completo",
      tag: "PLANO EXPLORATÓRIO",
      description: "Uma combinação ampliada de produtos frescos.",
      includes: ["4 saladas por mês", "4 porções de frutas por mês", "4 complementos por mês"],
      price: null,
      featured: false,
      available: false
    }
  ],
  products: [
    {
      id: "produto-exemplo",
      name: "Produto em definição",
      category: "Em breve",
      description: "Este é um espaço provisório. Cadastre aqui a descrição real quando o produto estiver definido.",
      ingredients: "PENDENTE: informar ingredientes e alergênicos relevantes",
      price: null,
      image: "", // Coloque, por exemplo, "assets/salada-1.jpg" depois de adicionar a imagem
      available: false
    }
  ]
};