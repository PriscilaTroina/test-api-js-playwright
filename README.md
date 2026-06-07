# Automação de API - ServeRest

Projeto de automação de testes de API desenvolvido com Playwright utilizando JavaScript.

A ideia desse projeto foi praticar automação backend aplicando uma estrutura mais organizada e próxima do que é utilizado em projetos reais, separando responsabilidades entre testes, services, fixtures e factories.

A API utilizada nos testes foi a pública do ServeRest:

https://serverest.dev

---

# Tecnologias utilizadas

- Node.js
- JavaScript
- Playwright
- Faker JS

---

# Estrutura do projeto

```bash
tests/
├── login/
├── products/
├── users/

support/
├── factories/
├── fixtures/
├── services/
```

## Organização

### Specs
Responsáveis pelos cenários de teste e validações.

### Services
Camada responsável pelas chamadas HTTP da API.

### Factories
Responsáveis pela criação das massas de teste dinâmicas utilizando Faker.

### Fixtures
Responsáveis por disponibilizar os serviços de forma reutilizável nos testes através do `test.extend()` do Playwright.

---

# Cenários automatizados

## Usuários
- Cadastro de usuário com sucesso
- Validação de e-mail duplicado
- Validação de e-mail vazio
- Busca de usuário por ID
- Listagem de usuários
- Remoção de usuário
- Validação de remoção com ID inválido

## Login
- Login com sucesso
- Login com e-mail vazio
- Login com senha vazia

## Produtos
- Cadastro de produto com sucesso
- Validação de produto duplicado
- Remoção de produto

---

# Como executar o projeto

## Instalar Playwright

```bash
npx playwright install
```

## Instalar dependências

```bash
npm install
```

## Executar os testes

```bash
npx playwright test
```

## Executar um arquivo específico

```bash
npx playwright test tests/users
```

---

# Objetivo do projeto

Esse projeto foi desenvolvido com foco em:
- prática de automação backend
- organização de framework
- reutilização de código
- separação de responsabilidades
- manutenção de testes
- estudo de arquitetura para testes de API

---

# Ajustes finais pendentes

- Configuração de baseURL no Playwright
- Relatórios customizados

# Objetivo futuro

- Integração com CI

---

