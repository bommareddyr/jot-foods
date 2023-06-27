function FormInput({ htmlForId, label, type, value, onChange, ...rest }) {
    return (
      <div className="form-group ">
        <label htmlFor={htmlForId}>{label}</label>
        <input
          {...rest}
          onChange={onChange}
          value={value}
          type={type}
          className="form-control"
          id={htmlForId}
          name={htmlForId}
        />
      </div>
    );
  }
  
  export default FormInput;
  