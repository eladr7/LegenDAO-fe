
const TransactionMsg = ({
  success,
  summary,
}: {
  success?: boolean;
  summary?: string;
}) => {
  return (
    <div className="flex-nowrap">
      <div className={
        success ? "text-green-500" : "text-red-500"
      }>
        {`${summary} ${success ? "successfully" : "failed"}`}
      </div>
    </div>
  );
};

export default TransactionMsg;