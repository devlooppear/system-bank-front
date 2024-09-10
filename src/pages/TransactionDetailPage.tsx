import { useParams } from "react-router-dom";

const TransactionDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <div className="min-h-[90vh] bg-neutral-50 shadow-inner">
        Transaction Detail Page for transaction ID: {id}
      </div>
    </>
  );
};

export default TransactionDetailPage;
