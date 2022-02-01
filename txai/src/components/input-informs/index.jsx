import React from 'react';
import './styles.css'

export default function InputInforms({titleLabel, onChangeState, value}) {
    return (
        <div className='container-input-informs'>
            <label>{titleLabel}</label>
            <input type="text" value={value} onChange={(e) => onChangeState(e.target.value)} />
        </div>
    )
}
