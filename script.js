const produto = [
  {
    id: 1,
    nome: "RX9060 XT 16gb",
    descricao: "Placa de vídeo AMD nível Intermediário",
    imagem: "IMG",
    categorias: [
      "Eletrônicos",
      "Hardware"
    ],
    quantidade: 10
  },
  {
    id: 2,
    nome: "RTX5060 8gb",
    descricao: "Placa de vídeo NVIDIA nível Básico",
    imagem: "IMG",
    categorias: [
      "Eletrônicos",
      "Hardware"
    ],
    quantidade: 20
  },
  {
    id: 3,
    nome: "Blusa do Brasil",
    descricao: "FIFA 2026",
    imagem: "IMG",
    categorias: [
      "Camisetas"
    ],
    quantidade: 0
  },
  {
    id: 4,
    nome: "Copo de plástico",
    descricao: "Copo preto de plástico fosco.",
    imagem: "IMG",
    categorias: [
      "Utensílios",
      "Plástico",
      "Uso pessoal"
    ],
    quantidade: 0
  }
]

const filtroCategorias = ["Eletrônicos", "Hardware", "Uso pessoal"]
// Retornar cada produto que possui essas categorias

const prodsFiltrados = produto.filter((prod) => {
  return prod.categorias.some(categ => filtroCategorias.includes(categ))
})
console.log(prodsFiltrados)
