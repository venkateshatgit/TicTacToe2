function InputComponents({label, ...inputProperties}) {
    return (  
        <div>
            <label>{label}</label>
            <input
              type={`${inputProperties.type}`}
              value={inputProperties.value}
              name={`${inputProperties.name}`}
              onChange={ e =>  inputProperties.onColorChange(e)}
            />
        </div>
    );
}

export default InputComponents;