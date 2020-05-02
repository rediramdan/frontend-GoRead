import React from 'react'

const Options = (props) => {
    return (
        <>
        <option value={props.data.id} {...props.id_2 == props.data.id?"selected" : ""}>{props.data.name}</option>
        </>
    )
}

export default Options