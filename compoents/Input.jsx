import Logo from '../ui/Logo';
import React from 'react'

function Input(props) {
  const { type, touched, errorMessage, placeholder, ...inputProps } = props;



  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input

          className="h-14 w-full border border-primary outline-none px-4 peer pt-2"
          required
          {...inputProps}
        />

        {type == "date" ? "" :
          <span className="absolute top-0 left-0 px-4 text-sm flex items-center h-full 
        peer-focus:h-7 peer-focus:text-xs peer-valid:h-7 peer-valid:text-xs transition-all">
            {placeholder}
          </span>}

      </label>
      {touched && <span className="text-xs text-red-500">{errorMessage}</span>}
    </div>

  )
}

export default Input