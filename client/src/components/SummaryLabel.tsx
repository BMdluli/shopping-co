interface SummaryLabelProps {
  text: string;
  amount: number;
  textStyles?: string;
  amountStyles?: string;
}

const SummaryLabel: React.FC<SummaryLabelProps> = ({
  text,
  amount,
  textStyles,
  amountStyles,
}) => {
  return (
    <div className="flex justify-between">
      <p
        className={` font-thin md:text-xl ${
          textStyles ? textStyles : "text-gray-600"
        }`}
      >
        {text}
      </p>

      <p className={`font-bold text-xl ${amountStyles}`}>R{amount}</p>
    </div>
  );
};

export default SummaryLabel;
