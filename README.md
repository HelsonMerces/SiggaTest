# CRUD Web + Cypress (MVP de Automação E2E)

Este projeto é um **MVP simples de automação end-to-end**, desenvolvido para demonstrar
conhecimento em **testes automatizados com Cypress**.

A aplicação web foi criada propositalmente de forma simples em **HTML + JavaScript puro**,
servindo como base para validar fluxos críticos do usuário.

---

## 🚀 Tecnologias
- HTML + CSS + JavaScript
- Cypress (E2E)
- Node.js

---

## 📋 Funcionalidades
- Login com validação de email (`@test.com`)
- CRUD simples (Create, Read, Delete)
- Persistência via `localStorage`
- Logout com limpeza de dados sensíveis

---

## 🧪 Cenários Automatizados
1. Login → Criar item → Validar → Excluir → Logout
2. Persistência entre sessões (login → logout → login)
3. Validação de email inválido

---

## ▶️ Como rodar o projeto

```bash
# 1. Subir a aplicação
npx serve .

# 2. Acessar no navegador
# http://localhost:3000

# 3. Rodar os testes automatizados (Cypress)
npm install
npm run cypress:open
```

---

## 🎯 Objetivo do Projeto
Demonstrar boas práticas de automação E2E, clareza de código e validação
de fluxos críticos do usuário em um cenário simples e controlado.
