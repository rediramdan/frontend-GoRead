import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { getBookById,deleteBook,transactionBook,checkBook } from '../utils/http'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

class BookDetail extends Component{

    state = {
        book :{},
        status:"",
        userMatch:false,
        role : atob(localStorage.getItem('_h')),
        id : atob(this.props.match.params.bookId),
        isLoading : true
    }

    handleDelete = async (e) => {
        e.preventDefault()
        await deleteBook(this.state.id)
        .then(() => {
            this.props.history.push("/")
        })
        .catch((error) => {
            if(error.response.data.data.message === "JsonWebTokenError" || error.response.data.data.message === "TokenExpiredError"){
                this.props.history.push("/refresh-token")
            }
        })
    }

    handleTransaction = async (e) => {
        let st = ""
        if(this.state.status===1){
            st = 0
        }else{
            st = 1
        }
        await transactionBook({status:st},this.state.id)
        .then(() => {
            this.props.history.push("/mybooks")
        })
        .catch((error) => {
            if(error.response.data.data.message === "JsonWebTokenError" || error.response.data.data.message === "TokenExpiredError"){
                this.props.history.push("/refresh-token")
            }
        })
    }

    async componentDidMount(){
        const {bookId, role} = this.props.match.params
        await getBookById(atob(bookId))
        .then(async (response) => {
            this.setState({
                book: response.data.data,
                isLoading: false,
                status:response.data.data.status,
            });
            console.log(response.data.data.status)
            if(response.data.data.status === 0 || response.data.data.status === "0" && role !== 1 || role !== "1" ){
                await checkBook(atob(bookId))
                .then((response) => {
                    console.log(response.data.data.message)
                    this.setState({
                        userMatch: response.data.data.message,
                    });
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })

        
    }


    render(){
        const {book,isLoading,role,status,userMatch} = this.state
        let btn;
        if(role == 0)
        {
            if(status == 1){
                btn = <>
                <button className="btn btn-success mx-2 float-lg-right" onClick={this.handleTransaction}>
                    <i className="fas fa-bookmark"></i> Borrow
                </button>
            </>
            }else{
                if(userMatch){
                    btn = <>
                    <button className="btn btn-success mx-2 float-lg-right" onClick={this.handleTransaction}>
                        <i className="fas fa-bookmark"></i> Return
                    </button>
                    </>
                }else{
                    btn = <></>
                }
                
            }
        }else if(role == 1){
             btn = <>
                            <button className="btn btn-success mx-lg-2 float-lg-right" onClick={this.handleDelete}>
                            <i className="fas fa-trash"></i>
                            </button>
                            <Link to={'/book/edit/'+btoa(book.id)}>
                            <button className="btn btn-success mx-2 float-lg-right">
                                <i className="fas fa-edit"></i>
                            </button>
                            </Link>
                        </>
        }else{
             btn = ""
        }
        return (
            <>
                <Nav {...this.props}/>
                <div className="container mt-5 pt-2">
                    <div className="row mt-3 justify-content-center">
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-7">
                                    <h3 className="l-app bold">Book Detail</h3>
                                </div>
                                <div className="col-5">
                                    {btn}
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
                                        <div className="col-lg-6  mt-4 mt-lg-0">
                                            <label className="book-title-detail">{book.title}</label>
                                            <label className="badge badge-success btn-sm float-right mt-2 smt-lg-0">
                                                {status===1? 
                                                <><i className="fas fa-check-circle"></i> Available</>
                                                :
                                                <><i className="fas fa-minus-circle"></i> Unavailable</>
                                                }   
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