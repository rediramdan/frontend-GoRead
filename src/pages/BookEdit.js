import React,{Component} from 'react'
import { getBookById,getAuthor,getGenre,putBook } from '../utils/http'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

class BookEdit extends Component{

    state = {
        title:"",
        description:"",
        id_author : "",
        id_genre : "",
        book :{},
        author:[],
        genre:[],
        isLoading : false
    }

    handlerChange = (e) => {
        const key = e.target.name
        this.setState({
            [key] : e.target.value
        })
    }

    handleUpload = (e) => {
        const key = e.target.name
        this.setState({
            [key] : e.target.files[0]
        })
    }

    handleUpdate = async () => {
        const {title,description,id_author,id_genre,image,book} = this.state
        this.setState({
            isLoading : true
        })
        await putBook({title,description,id_author,id_genre,image},book.id)
        .then(() => {
            this.props.history.push("/")
        })
        .catch((error) => {
            if(error.response.data.data.message === "JsonWebTokenError" || error.response.data.data.message === "TokenExpiredError"){
                this.props.history.push("/refresh-token")
            }
        })
    }

    async componentDidMount(){
        const {bookId} = this.props.match.params
        await getBookById(atob(bookId))
        .then((response) => {
            this.setState({
                book: response.data.data,
                title:response.data.data.title,
                description:response.data.data.description,
                id_author : response.data.data.id_author,
                id_genre : response.data.data.id_genre,
            });
        })
        .catch((error) => {
            console.log(error)
        })

        await getAuthor()
        .then((response) => {
            this.setState({
                author: response.data.data,
            });
        })
        .catch((error) => {
            console.log(error)
        })

        await getGenre()
        .then((response) => {
            this.setState({
                genre: response.data.data,
            });
        })
        .catch((error) => {
            console.log(error)
        })

        
    }


    render(){
        const {book,author,genre, isLoading} = this.state
        const optAuthor = author.map(author =>{
            return (
                <option  value={author.id} key={author.id}>{author.name}</option>
            )
        })
        const optGenre = genre.map(genre =>{
            return (
                <option  value={genre.id} key={genre.id}>{genre.name}</option>
            )
        })
        const loading = <i className="fas fa-spinner fa-pulse"></i>
        return (
            <>
               <Nav {...this.props}/>
                <div className="container mt-5 pt-2">
                    <div className="row mt-3 justify-content-center">
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-lg-8">
                                    <h3 className="l-app bold">
                                        <i className="fas fa-edit mr-1"></i>
                                        Book Edit
                                    </h3>
                                </div>
                            </div>
                            <hr className="my-2 my-lg-0"/>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2">
                        <div className="col-lg-4">
                           <span>Title</span>
                           <input name="title" className="form-control" defaultValue={book.title} onChange={this.handlerChange}/>
                           <span>Genre</span>
                           <select name="id_genre" className="form-control" onChange={this.handlerChange} defaultValue={this.state.id_genre}>
                            <option disabled>Select Genre</option>
                            {optGenre}
                           </select>
                           <span>Author</span>
                           <select name="id_author" className="form-control" onChange={this.handlerChange} defaultValue={this.state.id_author}>
                            <option disabled>Select Author</option>
                            {optAuthor}
                           </select>
                           <span>Cover</span>
                           <input name="image" type="file" className="form-control" onChange={this.handleUpload}/>
                        </div>
                        <div className="col-lg-4">
                           <span>Description</span>
                           <textarea name="description" className="form-control" rows="6" value={this.state.description} onChange={this.handlerChange}/>
                            <button className="btn btn-success form-control mt-4" onClick={this.handleUpdate}>
                                {isLoading ? loading : (<i className="fas fa-save"></i>)} Save
                            </button>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
}

export default BookEdit