import React from 'react'

function Header(){
    return(
        <>
        <div className="row mt-3">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-4">
                        <h2 className="l-app bold">Books List</h2>
                    </div>
                    <div className="col-lg-4">
                        <div className="row mb-2 mb-lg-0">
                            <div className="col-6">
                                <select className="form-control">
                                    <option>-View-</option>
                                    <option>5</option>
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>  
                            </div>
                                <div className="col-6">
                                <select className="form-control">
                                    <option>-Sort by-</option>
                                    <option>Author</option>
                                    <option>Genre</option>
                                </select>  
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="input-group search">
                            <input type="" name="" className="form-control" placeholder="Search Books here"/>
                            <div className="input-group-append">
                                <button className="btn btn-success">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-0"/>
            </div>
        </div>
        </>
    )
}

export default Header