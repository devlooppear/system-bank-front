# 🏦 System Bank Frontend

This project serves as the front end for a banking application designed to interact with the backend system for user, transaction, and account management.

## 🚀 Getting Started

To set up and run the application, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- Vite (for the development server)
- A configured backend server (see [System Bank Backend](link-to-backend-readme))

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd system-bank/front-end
```

2. Install the dependencies:

```bash
npm install
```

3. Configure the environment variables:

```bash
cp .env.example .env
```

4. To start the development server, run:

```bash
npm run dev
```

## 🆕 Default User

If you want to skip the registration step, you can use the following default user for authentication:

Email: dev@metisbank.com
Password: password

The application will be available at http://localhost:5173 (or on the port specified in your Vite configuration).

## 🔑 Authentication

Make sure your backend server is running and properly configured. You may need to implement user login functionality to obtain a JWT token for making requests to the backend API.

## 🧪 Testing

To ensure the quality and functionality of your code, the project uses Jest in conjunction with Vitest for automated testing. Below are the instructions for running the tests and some additional information.

### Running the Tests

To run the tests, use the following command:

```bash
npm run test
```

## 🛠️ Features

- User Management: Registration and login functionality for users.
- Account Management: Users can view and manage their accounts (checking and savings).
- Transaction Management: Users can create, view, and track their transactions, including TED and PIX types.
- Internationalization: Support for languages such as English, Spanish, and Portuguese.

## 📦 Dependencies

- Vite: Build tool for rapid development.
- React: JavaScript library for building user interfaces.
- React Router: For routing within the application.
- Redux: For state management (depending on implementation).

## 🔒 Security

Ensure that appropriate security measures are implemented, particularly for the storage and handling of JWT tokens and user passwords.
