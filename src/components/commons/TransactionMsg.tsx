
const TransactionMsg = ({
  success,
  summary,
  errSummary,
}: {
  success?: boolean;
  summary?: string;
  errSummary?: string
}) => {
  return (
    <div className="flex-nowrap font-medium">
      <div className={
        success ? "text-green-500" : "text-red-500"
      }>
        {success ? summary : errSummary}
      </div>
    </div>
  );
};

export default TransactionMsg;