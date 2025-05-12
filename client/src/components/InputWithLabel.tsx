interface InputWithLabelProps {
  label: string;
  placeholder: string;
  value: any;
  setValue: any;
  type: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  placeholder,
  value,
  setValue,
  type,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-400" htmlFor="name">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
    </div>
  );
};

export default InputWithLabel;
