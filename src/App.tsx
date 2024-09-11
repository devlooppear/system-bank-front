import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./common/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/transactions/TransactionPage";
import TransactionDetailPage from "./pages/TransactionDetailPage";
import CreateTransactionPage from "./pages/transactions/CreateTransaction";
import NoPage from "./pages/NoPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transaction" element={<TransactionPage />} />
            <Route path="transaction/create" element={<CreateTransactionPage />} />
            <Route path="transaction/:id" element={<TransactionDetailPage />} />
          </Route>

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
