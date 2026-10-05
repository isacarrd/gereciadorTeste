class Produto {
  constructor() {
    this.produtos = [{
      id: 1,
      nomeProduto: "RX9060 XT 16gb",
      descProduto: "Placa de vídeo AMD nível Intermediário",
      imgProduto: "https://images5.kabum.com.br/produtos/fotos/779095/placa-de-video-asrock-rx9060xt-cl-16go_1748868930_gg.jpg",
      categProduto: ["Hardware", "GPU", "AMD"],
      quantProduto: 10
    },
    {
      id: 2,
      nomeProduto: "RTX5060 8gb",
      descProduto: "Placa de vídeo NVIDIA nível Básico",
      imgProduto: "https://images1.kabum.com.br/produtos/fotos/1000741/placa-de-video-msi-rtx-5060-shadow-2x-oc-nvidia-geforce-8gb-gddr7-128-bit-912-v537-038_1771333499_gg.jpg",
      categProduto: ["Hardware", "GPU", "NVIDIA"],
      quantProduto: 20
    },
    {
      id: 3,
      nomeProduto: "Blusa do Brasil",
      descProduto: "FIFA 2026",
      imgProduto: "https://stories.cnnbrasil.com.br/wp-content/uploads/sites/9/2026/03/nova-camisa-oficial-selecao-2026-vinijr.jpg",
      categProduto: ["Roupa", "Esporte"],
      quantProduto: 0
    },
    {
      id: 4,
      nomeProduto: "Copo de plástico",
      descProduto: "Copo preto de plástico fosco.",
      imgProduto: "https://http2.mlstatic.com/D_NQ_NP_2X_748888-MLB89576682471_082025-F-kit-50-copos-ecologico-lisos-pp-400ml-varias-cores-festas.webp",
      categProduto: ["Casa"],
      quantProduto: 0
    }
    ]

    this.id = this.produtos.length + 1
    this.categoriasSistema = this.getCategoriasUnicas() // Inicializa as categorias no construtor
  }

  // Pega todas as categorias únicas que já existem nos produtos
  getCategoriasUnicas() {
    let todasCategorias = [];
    this.produtos.forEach((prod) => {
      todasCategorias.push(...prod.categProduto)
    });
    return Array.from(new Set(todasCategorias)) // Retorna o Array sem repetições através da coleção Set
  }

  // Preenche um <select> específico com as categorias únicas
  selectCategoria(selectElement) {
    const categorias = this.categoriasSistema || this.getCategoriasUnicas();
    selectElement.innerHTML = '<option value="">Selecione uma categoria...</option>';

    categorias.forEach(categ => {
      const opcao = document.createElement('option');
      opcao.value = categ;
      opcao.textContent = categ;
      selectElement.appendChild(opcao);
    });
  }

  // Adiciona uma nova linha com <select> e botão de remover, no caso, cria-se um novo select e a função selectCategoria passa as opções existentes para o mesmo (duplicata)
  // Os parâmetros estão sendo passados através do HTML -> produto.addCategoriaSelect('containerCategoriasCriar', 'categProdutoSelect')
  addCategoriaSelect(containerId, classeSelect) {
    const container = document.getElementById(containerId);

    const div = document.createElement('div');
    div.className = 'linha-categoria';
    div.style.display = 'flex';
    div.style.gap = '10px';
    div.style.marginBottom = '5px';

    const select = document.createElement('select');
    select.className = classeSelect;
    this.selectCategoria(select);

    const btnRemove = document.createElement('button');
    btnRemove.type = 'button';
    btnRemove.className = 'botao';
    btnRemove.textContent = '-';
    // Remove a linha quando clicado
    btnRemove.onclick = () => container.removeChild(div);

    div.appendChild(select);
    div.appendChild(btnRemove);
    container.appendChild(div);
  }

  // Adiciona a nova categoria criada em todos os <select> abertos nos modais
  atualizarSelectsDeModais(novaCategoria) {
    const todosSelects = document.querySelectorAll('.categProdutoSelect, .categProdutoNovasSelect');

    todosSelects.forEach(select => {
      const opcao = document.createElement('option');
      opcao.value = novaCategoria;
      opcao.textContent = novaCategoria;
      select.appendChild(opcao);
    });
  }

  async createProduct() {
    let produto = await this.readData()
    if (this.validate(produto)) {
      this.add(produto)

      // Limpando os campos
      document.getElementById('nomeProduto').value = ''
      document.getElementById('descProduto').value = ''
      document.getElementById('quantProduto').value = ''
      document.getElementById('imgProduto').value = ''

      // Limpar os selects de categoria gerados (deixando só o primeiro)
      const containerCategorias = document.getElementById('containerCategoriasCriar');
      const linhas = containerCategorias.querySelectorAll('.linha-categoria');
      linhas.forEach((linha, index) => {
        if (index === 0) {
          linha.querySelector('select').value = ''; // Apenas zera o valor do primeiro
        } else {
          linha.remove(); // Remove os adicionais
        }
      });
    }
    console.log(this.produtos)
  }

  add(produto) {
    this.produtos.push(produto)
    this.render()
  }

  render(listaProdutos = this.produtos) {
    const divProdutos = document.getElementById('produtos')
    const produtoCard = listaProdutos.map((prod) => {
      return `
  <div class="produtoCard ${prod.quantProduto <= 0 ? 'quantidadeZero' : ''}">

    <h2 class="nomeProduto texto">${prod.nomeProduto}</h2>
    <p class="descricao texto">${prod.descProduto}</p>

    <img class="imagemDoProduto imgProd" src="${prod.imgProduto || 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/500px-No-Image-Placeholder.svg.png'}" alt="${prod.nomeProduto}">

    <div>${prod.categProduto
          .map(categ => `<button > ${categ} </button>`)
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

  readImage(arquivo) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader()
      leitor.onload = () => resolve(leitor.result)
      leitor.onerror = (erro) => reject(erro)
      leitor.readAsDataURL(arquivo)
    })
  }

  async readData() {
    let produto = {}
    produto.id = this.id

    produto.nomeProduto = document.getElementById('nomeProduto').value
    produto.descProduto = document.getElementById('descProduto').value

    // Pegando dados dos múltiplos selects
    const selectsCategoria = document.querySelectorAll('#containerCategoriasCriar .categProdutoSelect')
    produto.categProduto = Array.from(selectsCategoria)
      .map(select => select.value) // Substitui o elemento HTML pelo valor, ou seja, os textos
      .filter(valor => valor !== "") // Guarda apenas o que são diferentes de 'vazio', remove os vazios caso haja

    produto.quantProduto = Number(document.getElementById('quantProduto').value)

    const inputFile = document.getElementById('imgProduto')
    if (inputFile.files.length > 0) {
      const arquivo = inputFile.files[0]
      produto.imgProduto = await this.readImage(arquivo)
    } else {
      produto.imgProduto = ""
    }
    return produto
  }

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
      message += 'A quantidade do produto não pode ser menor que zero. \n'
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

      const produtosFiltrados = this.produtos.filter(prod => {
        const prodId = String(prod.id).includes(campo)
        const prodNome = prod.nomeProduto.toLowerCase().includes(campo)
        const prodCateg = prod.categProduto.some((categ) => categ.toLowerCase().includes(campo))

        return prodId || prodNome || prodCateg
      })

      if (produtosFiltrados.length === 0) {
        divProdutos.innerHTML = `<p class="texto">Produto não encontrado</p>`
      } else {
        this.render(produtosFiltrados)
      }
    })
  }

  select() {
    const divProdutos = document.getElementById('produtos')
    const cancelarModal = document.getElementById('cancelarModalCateg')
    const salvarCateg = document.getElementById('salvarCateg')
    const criarCateg = document.getElementById('criarCateg')
    const modalCateg = document.getElementById('modalCateg')
    const selectN1 = document.getElementById('selectN1')

    // Popula o select de filtro (pesquisa principal)
    selectN1.innerHTML = '<option value="">Selecione uma categoria</option>'
    this.categoriasSistema.forEach((catF) => {
      const opcao = document.createElement('option')
      opcao.setAttribute('value', catF)
      opcao.innerHTML = catF
      selectN1.appendChild(opcao)
    })

    criarCateg.addEventListener('click', () => {
      modalCateg.showModal()
    })

    salvarCateg.addEventListener('click', (evt) => {
      evt.preventDefault()

      const inputCateg = document.getElementById('inputCateg')
      const novaCategoria = inputCateg.value.trim()

      if (novaCategoria === "") {
        alert("O nome da categoria não pode estar vazio!");
        return;
      }

      if (!this.categoriasSistema.includes(novaCategoria)) {
        this.categoriasSistema.push(novaCategoria)

        addOptions(novaCategoria)
        this.atualizarSelectsDeModais(novaCategoria) // Passando a nova categoria para os selects

        inputCateg.value = "";
        modalCateg.close();
      } else {
        alert('Categoria já existente!')
      }
    })

    cancelarModal.addEventListener('click', () => {
      modalCateg.close()
    })

    function addOptions(categoria) {
      const opcao = document.createElement('option')
      opcao.value = categoria
      opcao.textContent = categoria
      selectN1.appendChild(opcao)
    }

    selectN1.addEventListener('change', (evt) => {
      const categoriaSelecionada = evt.target.value

      if (categoriaSelecionada === "") {
        this.render();
        return;
      }

      const produtosFiltrados = this.produtos.filter(prod => {
        return prod.categProduto.some((categ) => categ.includes(categoriaSelecionada))
      })

      if (produtosFiltrados.length === 0) {
        divProdutos.innerHTML = `<p class="texto">Produto não encontrado</p>`
      } else {
        this.render(produtosFiltrados)
      }
    })
  }

  update() {
    const btnEdit = document.querySelectorAll('.editBtn')
    const modalAlterar = document.querySelector('#modalAlterar')
    const cancelarAlteracao = document.getElementById('cancelarAlteracao')
    const salvarAlteracoes = document.getElementById('salvarAlteracoes')

    let idEdit = null

    btnEdit.forEach(botaoEdit => {
      botaoEdit.addEventListener('click', (evt) => {
        evt.preventDefault()
        idEdit = Number(evt.currentTarget.dataset.id);

        // Popula o primeiro select do modal de edição
        const primeiroSelectEditar = document.querySelector('#containerCategoriasAlterar .categProdutoNovasSelect');

        // Remove os selects adicionais caso tenham ficado abertos de edições anteriores
        const containerCategorias = document.getElementById('containerCategoriasAlterar');
        const linhas = containerCategorias.querySelectorAll('.linha-categoria');
        linhas.forEach((linha, index) => {
          if (index !== 0) linha.remove();
        });

        this.popularSelectCategoria(primeiroSelectEditar);
        modalAlterar.showModal()
      })
    })

    salvarAlteracoes.onclick = async (evt) => {
      evt.preventDefault()
      const produtoId = this.produtos.find(pdId => pdId.id === idEdit)

      const nomeNovo = document.getElementById('nomeNovo').value
      const descNova = document.getElementById('descNova').value
      const quantNova = Number(document.getElementById('quantNova').value)

      // Pegando as categorias múltiplas
      const selectsCategoria = document.querySelectorAll('#containerCategoriasAlterar .categProdutoNovasSelect');
      const novasCategorias = Array.from(selectsCategoria)
        .map(select => select.value)
        .filter(valor => valor !== "");

      if (novasCategorias.length > 0) {
        produtoId.categProduto = novasCategorias;
      }

      const inputFile = document.getElementById('novaImgProduto')
      if (inputFile.files.length > 0) {
        const arquivo = inputFile.files[0]
        produtoId.imgProduto = await this.readImage(arquivo)
      }

      if (nomeNovo.trim() !== "") produtoId.nomeProduto = nomeNovo;
      if (descNova.trim() !== "") produtoId.descProduto = descNova;
      if (!Number.isNaN(quantNova) && document.getElementById('quantNova').value.trim() !== "") {
        produtoId.quantProduto = quantNova;
      }

      this.render()
      modalAlterar.close()
    }

    cancelarAlteracao.addEventListener('click', () => {
      modalAlterar.close()
    })
  }

  delete() {
    const btnDel = document.querySelectorAll('.deleteBtn')

    btnDel.forEach(botaoDel => {
      botaoDel.addEventListener('click', (evt) => {
        evt.preventDefault()

        const prodId = Number(evt.currentTarget.dataset.id)
        const prodIndex = this.produtos.findIndex(index => index.id === prodId)

        if (prodIndex > -1) {
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
produto.select()

const abrirModalCriar = document.getElementById('abrirModalCriar')
const modalCriar = document.getElementById('modalCriar')
const cancelarCriacao = document.getElementById('cancelarCriacao')

abrirModalCriar.addEventListener('click', () => {
  // Popula o primeiro select do modal de criação
  const primeiroSelect = document.querySelector('#containerCategoriasCriar .categProdutoSelect');
  produto.selectCategoria(primeiroSelect);

  modalCriar.showModal();
})

cancelarCriacao.addEventListener('click', () => {
  modalCriar.close()
})