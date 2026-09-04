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

<br>

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-%236DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

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
- [x] CRUD -> Deletar produto específico e Alterar informações de um produto específico.
- [x] CRUD -> Adicionar imagens na lógica.
- [x] Adicionar imagens como algo alterável.
- [x] Criar categorias com uso do select.
- [x] Criar produto com a categoria + select.


<br>

---

➡️ **[Avançar para a Fase 1: React + Dados Simulados](https://github.com/isacarrd/GerenciadorFase1)**

➡️ **[Avançar para a Fase 2: Integração com API Pública](#)**

➡️ **[Avançar para a Fase 3: Backend e Banco de Dados](#)**
