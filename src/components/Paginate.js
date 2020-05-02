import React from 'react'
import LiPaginate from './LiPaginate'

function Paginate({pagination,handlerChange}){
    let array = []
    for(let i=1;i<=pagination.pageAmount;i++){
        array[i] = i
    }

    const li = array.map(number=>{
        let name = ""
        if(number === parseInt(pagination.currentPage)){name = "pag-active"}
        return(
            <LiPaginate name={name} number={number} key={number} handlerChange={handlerChange}/>
        )
    })
    
    return (
        <div className="row justify-content-center mt-3">
            <div className="col-lg-12">
                <ul className="pagination">
                    <li className="page-item">
                        <span className="page-link" onClick={handlerChange} id={pagination.prevPage}>Previous</span>
                    </li>
                    {li}
                    <li className="page-item">
                        <span className="page-link" onClick={handlerChange} id={pagination.nextPage}>Next</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Paginate