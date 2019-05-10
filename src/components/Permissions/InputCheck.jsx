import React from 'react'



export default props => (
    < div className="form-check" >
        <input
            value={props.value ? props.value : ''}
            type="checkbox"
            name={props.name}
            className="form-check-input"
            id={props._key}
            {...props} />

        <label className="form-check-label">{props.label}</label>
    </div >
)