import React from 'react'

function LiPaginate({number,name,handlerChange}){
    return(
        <li className={'page-item '+name}>
            <span className={'page-link '+name} onClick={handlerChange} id={number}>{number}</span>
        </li>
    )
}

export default LiPaginate