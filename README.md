# 📦 Gerenciador de Produtos (Visão Geral & Testes)

Este projeto tem como objetivo central criar uma aplicação capaz de gerenciar uma base de produtos. O desenvolvimento foi planejado para evoluir de uma simulação simples até um sistema robusto com persistência de dados real.

<div align="center">
<img src="https://github.com/user-attachments/assets/294488d6-129d-44cc-845e-49f252d010e0" alt="desktop" width="400">
</div>

## 🎯 Premissas do Projeto
Para garantir um código limpo e uma experiência de usuário (UX) inteligente, as seguintes regras de negócio foram estabelecidas:
- **Validação:** Mínimo de 1 categoria obrigatória e estoque sempre `>= 0`.
- **UI Inteligente:** Produtos com estoque zerado alteram seu estilo visual para indicar indisponibilidade.
- **Flexibilidade:** Apenas a imagem do produto é opcional.
- **UX:** Sistema de busca e filtros nativos para agilizar a gestão.

## 🛠️ Stack Tecnológico Completo
- Frontend: ReactJS + Tailwind CSS
- Backend: Node.js
- Banco de Dados: MongoDB

---

## 🧪 Estado Atual: Fase de Testes (HTML + JS Puro)
Este diretório reflete a **Fase de Testes** do projeto. O objetivo aqui não é construir a aplicação final, mas sim validar lógicas básicas, como o funcionamento da barra de pesquisa e regras de validação simples utilizando apenas HTML e Vanilla JavaScript. 

Atualmente testado:
- [x] Lógica da barra de pesquisa.
- [x] Lógica renderização de itens.
- [x] Cores dinâmicas determinadas pela quantidade do estoque (0 ou >0).
- [x] Lógica de criação de produtos.
- [x] Criação (e renderização) de produtos com produtos existentes.
- [x] Tudo em um -> barra de pesquisa + renderização + criação de produtos.
- [ ] CRUD -> Deletar produto específico e Alterar informações de um produto específico.


<br>

---

➡️ **[Avançar para a Fase 1: React + Dados Simulados](https://github.com/isacarrd/gerenciadorProdutosScript)**

➡️ **[Avançar para a Fase 2: Integração com API Pública](#)**

➡️ **[Avançar para a Fase 3: Backend e Banco de Dados](#)**
