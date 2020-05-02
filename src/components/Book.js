import React from 'react'

function Book(){
    return (
        <div className="col-lg-3 mt-3">
            <div className="card">
                <div className="card-body py-0 px-0">
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <div className="book-cover">
                                
                            </div>
                        </div>
                        <div className="col-6">
                            <span className="l-load"></span>
                            <span className="l-load"></span>
                            <span className="l-load"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book