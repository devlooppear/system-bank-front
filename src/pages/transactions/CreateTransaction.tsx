import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTransaction, {
  TransactionType,
} from "../../api/hooks/useTransaction";
import { BANK_ACCOUNTS } from "./static/banks";

const CreateTransactionPage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [formattedAmount, setFormattedAmount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.TED
  );
  const [recipientName, setRecipientName] = useState<string>("");
  const [accountRecipient, setAccountRecipient] = useState<string>("");
  const [pixKey, setPixKey] = useState<string>("");
  const [transactionPassword, setTransactionPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recipientDocumentType, setRecipientDocumentType] = useState<
    "CNPJ" | "CPF"
  >("CNPJ");
  const [recipientDocument, setRecipientDocument] = useState<string>("");

  const { createTransaction } = useTransaction();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transactionData = {
      transaction_type: transactionType,
      amount: parseFloat(amount.toFixed(2)),
      transaction_date: new Date().toISOString(),
      cpf_recipient: recipientDocumentType === "CPF" ? recipientDocument : null,
      cnpj_recipient:
        recipientDocumentType === "CNPJ" ? recipientDocument : null,
      recipient_name: recipientName,
      bank: "Metis Bank",
      branch: "1158",
      account_recipient: accountRecipient,
      pix_key: pixKey,
      transaction_password: transactionPassword,
    };

    try {
      const response = await createTransaction({
        transaction: transactionData,
      });
      if (response) {
        toast.success("Transação criada com sucesso!");
      } else {
        throw new Error("Erro ao criar transação.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar transação. Tente novamente.");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || /^\d*\.?\d*$/.test(value)) {
      const numericValue = parseFloat(value) || 0;
      setAmount(numericValue);
      setFormattedAmount(value);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-t from-blue-500 to-blue-100 flex items-center justify-center">
        <div className="absolute top-[6rem] bg-white rounded-lg shadow-lg p-8 max-w-[90%] w-[480px]">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Criar Transação
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Valor
              </label>
              <input
                type="text"
                value={formattedAmount}
                onChange={handleAmountChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite o valor da transação"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Transação
              </label>
              <select
                value={transactionType}
                onChange={(e) =>
                  setTransactionType(e.target.value as TransactionType)
                }
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={TransactionType.TED}>TED</option>
                <option value={TransactionType.PIX}>PIX</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome do Destinatário
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite o nome do destinatário"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Conta do Destinatário
              </label>
              <select
                value={accountRecipient}
                onChange={(e) => setAccountRecipient(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Selecione uma conta
                </option>
                {BANK_ACCOUNTS.map((account) => (
                  <option key={account.account} value={account.account}>
                    {account.bank} - {account.account}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chave PIX
              </label>
              <input
                type="text"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite a chave PIX"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Documento
              </label>
              <div className="flex space-x-2 mb-4">
                <button
                  type="button"
                  onClick={() => setRecipientDocumentType("CNPJ")}
                  className={`border rounded-lg p-2 ${
                    recipientDocumentType === "CNPJ"
                      ? "bg-blue-800 text-white"
                      : "bg-white"
                  } opacity-90`}
                >
                  CNPJ
                </button>
                <button
                  type="button"
                  onClick={() => setRecipientDocumentType("CPF")}
                  className={`border rounded-lg p-2 ${
                    recipientDocumentType === "CPF"
                      ? "bg-blue-800 text-white"
                      : "bg-white"
                  } opacity-90`}
                >
                  CPF
                </button>
              </div>
              <label className="block text-sm font-medium text-gray-700">
                {recipientDocumentType === "CNPJ" ? "CNPJ" : "CPF"}
              </label>
              <input
                type="text"
                value={recipientDocument}
                onChange={(e) => setRecipientDocument(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Digite o ${recipientDocumentType}`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha da Transação
              </label>
              <input
                type="password"
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite a senha da transação"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-800 to-blue-950 text-white font-semibold py-2 rounded-lg transition duration-300 hover:from-blue-700 hover:to-blue-800"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar Transação"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateTransactionPage;
