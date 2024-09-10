import { useParams } from "react-router-dom";

const TransactionDetailPage = () => {
  const { id } = useParams();

  return (
    <>
      <div>Transaction Detail Page for transaction ID: {id}</div>
    </>
  );
};

export default TransactionDetailPage;
