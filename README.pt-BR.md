# 🏦 System Bank Frontend

Este projeto serve como o front end para uma aplicação bancária, projetada para interagir com o sistema backend para gerenciamento de usuários, transações e contas.

## 🚀 Getting Started

Para configurar e executar a aplicação, siga estes passos:

### Prerequisitos

- Node.js (v14 ou superior)
- Vite (para o servidor de desenvolvimento)
- Um servidor backend configurado (veja [System Bank Backend](link-to-backend-readme))

### Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd system-bank/front-end
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

4. Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5173 (ou na porta especificada na sua configuração do Vite).

## 🔑 Authentication

Certifique-se de que seu servidor backend esteja em execução e devidamente configurado. Pode ser necessário implementar a funcionalidade de login do usuário para obter um token JWT para fazer solicitações à API do backend.

## 🛠️ Features

- Gerenciamento de Usuários: Funcionalidade de registro e login para usuários.
- Gerenciamento de Contas: Usuários podem visualizar e gerenciar suas contas (corrente e poupança).
- Gerenciamento de Transações: Usuários podem criar, visualizar e acompanhar suas transações, incluindo os tipos TED e PIX.
- Internacionalização: Suporte a idiomas como inglês, espanhol e português.

## 📦 Dependências

- Vite: Ferramenta de build para desenvolvimento rápido.
- React: Biblioteca JavaScript para construção de interfaces de usuário.
- React Router: Para roteamento na aplicação.
- Redux : Para gerenciamento de estado (dependendo da implementação).

## 🔒 Segurança

Certifique-se de implementar medidas de segurança adequadas, particularmente para o armazenamento e manuseio de tokens JWT e senhas de usuários.
