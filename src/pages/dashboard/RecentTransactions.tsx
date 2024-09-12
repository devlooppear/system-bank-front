import { useTranslation } from "react-i18next";
import { Transaction, useUserTransactions } from "../../api/hooks/useUser";
import Loader from "../../common/Loader";
import React, { useState } from "react";

interface RecentTransactionsProps {
  userId: any;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ userId }) => {
  const { t } = useTranslation();
  const { transactions, loading, error } = useUserTransactions(userId, 1, 6);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleRowClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-5">
        {t("loadingTransactionsError", {
          error: typeof error === "string" ? error : "Unknown error",
        })}
      </div>
    );
  }

  return (
    <div>
      <div className="w-full mt-6 bg-white shadow-lg rounded-lg p-4 text-neutral-800 overflow-auto max-[738px]:max-h-[38vh]">
        <h2 className="text-xl font-semibold mb-4 text-blue-950">
          {t("recentTransactionsTitle")}
        </h2>
        <div className="flex flex-col divide-y">
          <div className="flex justify-between p-2 font-bold text-neutral-900">
            <div className="flex-1">{t("transactionType")}</div>
            <div className="flex-1">{t("transactionValue")}</div>
            <div className="flex-1">{t("transactionDate")}</div>
            <div className="flex-1">{t("transactionRecipient")}</div>
          </div>
          {transactions.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className="flex justify-between p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleRowClick(transaction)}
            >
              <div className="flex-1">{transaction.transaction_type}</div>
              <div className="flex-1">R$ {transaction.amount.toFixed(2)}</div>
              <div className="flex-1">
                {new Date(transaction.transaction_date).toLocaleDateString()}
              </div>
              <div className="flex-1">{transaction.recipient_name}</div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {t("transactionDetails")}
            </h3>
            <p>
              <strong>{t("transactionType")}:</strong>{" "}
              {selectedTransaction.transaction_type}
            </p>
            <p>
              <strong>{t("transactionValue")}:</strong> R${" "}
              {selectedTransaction.amount.toFixed(2)}
            </p>
            <p>
              <strong>{t("transactionDate")}:</strong>{" "}
              {new Date(
                selectedTransaction.transaction_date
              ).toLocaleDateString()}
            </p>
            <p>
              <strong>{t("transactionRecipient")}:</strong>{" "}
              {selectedTransaction.recipient_name}
            </p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
