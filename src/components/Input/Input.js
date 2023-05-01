const Input = ({value, onChange}) => {
  const handleChange = (e) => {
    onChange(e?.target?.value);
  };
  return <input value={value} onChange={handleChange} />;
};

export default Input;
