import React from 'react'

const InputComponent = (props) => {
    const { name, placeholder, type, value, handleChange, id, required } = props
    return (
        <div className="form-group">
            <input
                value={value}
                id={id}
                type={type}
                className="form-control"
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    )
}

export default InputComponent