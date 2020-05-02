import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { getBookById } from '../utils/http'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

class BookDetail extends Component{

    state = {
        book :{},
        isLoading : true
    }

    async componentDidMount(){
        const {bookId} = this.props.match.params
        await getBookById(atob(bookId))
        .then((response) => {
            this.setState({
                book: response.data.data,
                isLoading: false
            });
        })
        .catch((error) => {
            console.log(error)
        })

        
    }


    render(){
        const {book,isLoading} = this.state
        return (
            <>
                <Nav {...this.props}/>
                <div className="container mt-5 pt-2">
                    <div className="row mt-3 justify-content-center">
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h3 className="l-app bold">Book Detail</h3>
                                </div>
                                <div className="col-lg-4">
                                    <button className="btn btn-success mx-lg-2 float-lg-right">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <Link to={'/book/edit/'+btoa(book.id)}>
                                    <button className="btn btn-success mx-2 float-lg-right">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    </Link>
                                </div>
                            </div>
                            <hr className="my-2 my-lg-0"/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 px-0">
                            <div className="">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="book-cover-detail">
                                               {!isLoading?(<img src={'http://localhost:3001/public/images/'+book.image} className="book-image-detail" alt={book.image}/>):(<></>)} 
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="book-title-detail">{book.title}</label>
                                            <label className="btn btn-success btn-sm float-right mt-2 smt-lg-0"> 
                                                <i className="fas fa-check-circle"></i> Available
                                            </label>
                                            <br/>
                                            <label className="book-author">
                                                <small>Genre</small><br/>
                                                {book.genre_name}
                                            </label><br/>
                                            <label className="book-author">
                                                <small>Author</small><br/>
                                                {book.author_name}
                                            </label><br/>
                                            <label className="book-author">
                                                Deskripsi
                                            </label>
                                            <p className="book-author p">
                                                {book.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default BookDetail