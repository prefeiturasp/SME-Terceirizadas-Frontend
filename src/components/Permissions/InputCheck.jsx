import React from 'react'

export default props => (

    < div className="form-check" >
        <input type="checkbox" className="form-check-input" id={props.key} />
        <label className="form-check-label">{props.name}</label>
    </div >

)