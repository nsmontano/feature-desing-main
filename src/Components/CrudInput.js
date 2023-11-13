const CrudInput = ({ label, value, onChange }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default CrudInput;
