import React from 'react';
import './styles.css'
export default function InputLogin({ inputType, inputTitle, inputValue, onChangeState, titleColor, inputColor, inputBorder }) {

    const MYINFORMS = {
        NAME_USER: 'Matheus',
        MAIL:  'mattheus@gmail.com',
        TOKEN: '12sd1sf35d4fd35g41f5dgf4v41d63gf43'
    }

    return (
        <div className='container-input'>
            <label style={{ color: titleColor }}>{inputTitle}</label>
            <input
                type={inputType || 'text'}
                value={inputValue}
                onChange={(e) => onChangeState(e.target.value)}
                style={{ backgroundColor: inputColor, border: inputBorder }}
            />
        </div>
    )
}
