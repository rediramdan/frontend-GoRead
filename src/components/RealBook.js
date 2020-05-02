import React from 'react'
import {Link} from 'react-router-dom'
function RealBook({data}){
    return (
        <div className="col-lg-4 mt-3">
            <div className="card">
                <div className="card-body py-0 pr-1 pl-0">
                    <div className="row justify-content-center">
                        <div className="col-6 pr-lg-1">
                            <div className="book-cover">
                                <img src={'http://localhost:3001/public/images/'+data.image} className="book-image" alt={data.image}/>
                            </div>
                        </div>
                        <div className="col-6">
                        <Link to={'book/'+btoa(data.id)}>
                        <label className="book-title text-dark">{data.title}</label><br/>
                        </Link>
                        <label className="book-author">
                            <small>Genre</small><br/>
                            {data.genre_name}
                        </label><br/>
                        <label className="book-author">
                            <small>Author</small><br/>
                            {data.author_name}
                        </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RealBook