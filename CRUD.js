
class Produto {
  constructor() {
    this.produtos = [{
      id: 1,
      nomeProduto: "RX9060 XT 16gb",
      descProduto: "Placa de vídeo AMD nível Intermediário",
      categProduto: ["Hardware", "GPU", "AMD"],
      quantProduto: 10
    },
    {
      id: 2,
      nomeProduto: "RTX5060 8gb",
      descProduto: "Placa de vídeo NVIDIA nível Básico",
      categProduto: ["Hardware", "GPU", "NVIDIA"],
      quantProduto: 20
    },
    {
      id: 3,
      nomeProduto: "Blusa do Brasil",
      descProduto: "FIFA 2026",
      categProduto: ["Roupa", "Esporte"],
      quantProduto: 0
    },
    {
      id: 4,
      nomeProduto: "Copo de plástico",
      descProduto: "Copo preto de plástico fosco.",
      categProduto: ["Casa"],
      quantProduto: 0
    }]

    this.id = this.produtos.length + 1 // O id recebe o tamanho do array atual na criação(que é 4) + 1, ou seja, acrescentando
  }

  createProduct() {
    let produto = this.readData()
    if (this.validate(produto)) {
      this.add(produto)
    }
    console.log(this.produtos)
  }

  add(produto) {
    this.produtos.push(produto)
    this.render()
  }

  // O valor padrão é a lista completa caso não esteja sendo passada outra lista, ou seja, 'produtos' sempre será opção default
  render(listaProdutos = this.produtos) {
    const divProdutos = document.getElementById('produtos')
    const produtoCard = listaProdutos.map((prod) => {
      return `
  <div class="produtoCard ${prod.quantProduto <= 0 ? 'quantidadeZero' : ''}">

    <h2 class="nomeProduto texto">${prod.nomeProduto}</h2>
    <p class="descricao texto">${prod.descProduto}</p>
    <div>${prod.categProduto
          .map(categ => `<button >${categ}</button>`)
          .join("")}
    </div>

    <p class="texto"> <strong> Quantidade: </strong> ${prod.quantProduto}</p>

    <button class="botao editBtn" data-id="${prod.id}" ${prod.quantProduto <= 0 ? 'disabled="disabled"' : null} >Editar</button>

    <button class="botao deleteBtn" data-id="${prod.id}" >Excluir</button>
    
  </div>
  `
    })
    divProdutos.innerHTML = produtoCard.join('')
    this.update()
    this.delete()
  }

  readData() {
    let produto = {}

    produto.id = this.id

    // A ideia original é um modal onde a função validade() faz mais sentido do que usar o window.prompt, mas meu intuito é basicamente o mesmo.
    produto.nomeProduto = window.prompt('Insira o nome do produto') // Nome do produto
    produto.descProduto = window.prompt('Insira a descrição do produto') // Descrição do produto
    produto.categProduto = [] // Categorias do produto

    // Lógica para adicionar no máximo 5 categorias no produto
    for (let contador = 0; contador < 5; contador++) {
      let categUsuario = window.prompt('Insira a(s) categoria(s) do produto')
      if (categUsuario === null) {
        console.log("O usuário clicou em 'Cancelar' ou fechou a janela.");
        break
      } else if (categUsuario.trim() === "") {
        console.log("O usuário clicou em 'OK', mas não digitou nada.");
        break
      } else {
        console.log("O usuário digitou: " + categUsuario + " e clicou em 'OK'.");
        produto.categProduto.push(categUsuario)
      }
    }

    produto.quantProduto = Number(window.prompt('Insira a quantidade do produto'))

    return produto
  }

  // Essa função não faz tanto sentido com o uso do window.prompt, mas o intuito da ideia original é essa (modal).
  validate(produto) {
    let message = ''
    if (produto.nomeProduto == '') {
      message += 'Nome do produto não pode ficar vazio. \n'
    }

    if (produto.descProduto == '') {
      message += 'A descrição do produto não pode ficar vazia. \n'
    }

    if (produto.categProduto.length == 0) {
      message += 'O produto precisa ter pelo menos uma categoria. \n'
    }

    if (produto.quantProduto < 0) {
      message += 'A quantidade do produto não ser menor que zero. \n'
    }

    if (message != '') {
      alert(message)
      return false
    }

    return true
  }

  search() {
    const divProdutos = document.getElementById('produtos')
    const inputPesquisa = document.getElementById('pesquisa')

    inputPesquisa.addEventListener("input", () => {
      let campo = inputPesquisa.value.toLowerCase()
      divProdutos.innerHTML = ""

      // É necessário trocar para os mesmos parâmetros do construtor
      const produtosFiltrados = this.produtos.filter(prod => {
        const prodId = prod.id.toString() === campo
        const prodNome = prod.nomeProduto.toLowerCase().includes(campo)
        const prodCateg = prod.categProduto.some((categ) => categ.toLowerCase().includes(campo))

        return prodId || prodNome || prodCateg
      })

      if (produtosFiltrados.length === 0) {
        divProdutos.innerHTML = `<p class="texto">Produto não encontrado</p>`
      } else {
        this.render(produtosFiltrados) // é passado como parâmetro a lista filtrada para a renderização otimizada
      }
    })
  }

  update() {
    const btnEdit = document.querySelectorAll('.editBtn')
    btnEdit.forEach(botaoEdit => {
      botaoEdit.addEventListener('click', (evt) => {
        evt.preventDefault()
        const prodId = Number(evt.currentTarget.dataset.id)
        const produtoId = this.produtos.find(pdId => pdId.id === prodId) // Pega o id dado no target e devolve o elemento que consiste neste id ("encontra um item do array e retorna o primeiro (array) que satisfaz-o") 

        const nomeNovo = window.prompt('Insira o novo nome do produto:')
        const descNova = window.prompt('Insira a nova descrição do produto:')
        const categProdutoNovas = []

        for (let contador = 0; contador < 5; contador++) {
          let categsNovas = window.prompt('Insira a(s) categoria(s) do produto')
          if (categsNovas === null) {
            break
          } else if (categsNovas.trim() === "") {
            break
          } else {
            categProdutoNovas.push(categsNovas)
          }
        }

        const quantNova = Number(window.prompt('Insira a quantidade atual:'))


        if (nomeNovo !== null && descNova.trim() !== "") produtoId.nomeProduto = nomeNovo; // Só altera quando não clicou em 'cancelar'
        if (descNova !== null && descNova.trim() !== "") produtoId.descProduto = descNova; // Só altera quando não clicou em 'cancelar'
        if (categProdutoNovas.length !== 0) produtoId.categProduto = categProdutoNovas
        if (!Number.isNaN(quantNova)) produtoId.quantProduto = quantNova; // Só altera quando realmente forneceu o valor

        this.render()
      })
    })
  }

  delete() {
    const btnDel = document.querySelectorAll('.deleteBtn')

    btnDel.forEach(botaoDel => {
      botaoDel.addEventListener('click', (evt) => {
        evt.preventDefault()

        const prodId = Number(evt.currentTarget.dataset.id)

        const prodIndex = this.produtos.findIndex(index => index.id === prodId) // Pega o index do array produtos e 'compara' com o id do target, devolvendo o índice/posição -> Retorna a posição (índice) do primeiro elemento no array que satisfaz a condição exigida

        if (prodIndex > -1) { // Remove o objeto se ele existir (index !== -1)
          this.produtos.splice(prodIndex, 1)
        }

        this.render()
      })
    })
  }
}

var produto = new Produto()
produto.render()
produto.search()
