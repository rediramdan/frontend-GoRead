import React,{Component} from 'react'

import Nav from '../components/Nav'
// import Header from '../components/Header'
import Book from '../components/Book'
import RealBook from '../components/RealBook'
import Paginate from '../components/Paginate'
import Footer from '../components/Footer'

import {getAllBooks} from '../utils/http'

class BooksList extends Component{

    state = {
        search : "",
        sort : "",
        asc : "",
        requestPage : "",
        limit : "",
        data : [],
        done : false,
        pagination:{}
    }

     getData = async () => {
        
        await getAllBooks(this.state)
        .then((response) => {
            this.setState({
                data: response.data.data,
                pagination:response.data.pagination,
                done:true
            });
        })
        .catch((error) => {
            console.log(error)
        })
    }

    componentDidMount(){
        this.getData()
    }

    handlerChange = async (e) => {
        this.setState({requestPage: e.target.id,done:false},
        ()=>{
            this.getData()
        })
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value,done:false},()=>{
            this.getData()
        })
        
    }

    render(){
        const {pagination,data} = this.state
        const bookList = data.map(data => {
            return (
                <RealBook data={data} key={data.id}/>
            )
        })
        const paginationView = <Paginate pagination={pagination} key={pagination.currentPage} handlerChange={this.handlerChange}/>
        const bookTmp = <><Book/><Book/></>
        return(
            <>
            <Nav {...this.props}/>
            <div className="container mt-5 pt-2">
                <div className="row mt-3 justify-content-center">
                    <div className="col-lg-10">
                        <div className="row">
                            <div className="col-lg-4">
                                <h2 className="l-app bold">Books List</h2>
                            </div>
                            <div className="col-lg-4">
                                <div className="row mb-2 mb-lg-0">
                                    <div className="col-3 pr-1">
                                        <select className="form-control" name="limit" onChange={this.handleChange} defaultValue={2}>
                                            <option value={2}>2</option>
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}> 100</option>
                                        </select>  
                                    </div>
                                    <div className="col-5 px-0">
                                        <select className="form-control" name="sort" onChange={this.handleChange} defaultValue="">
                                            <option value="">-Sort by-</option>
                                            <option value="author">Author</option>
                                            <option value="genre">Genre</option>
                                        </select>  
                                    </div>
                                    <div className="col-4 pl-1">
                                        <select className="form-control" name="asc" onChange={this.handleChange} defaultValue="">
                                            <option value="">asc</option>
                                            <option value="false">Desc</option>
                                        </select>  
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="input-group search">
                                    <input type="text" name="search"  className="form-control" onKeyUp={this.handleChange} placeholder="Search Books here"/>
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
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="row">
                            {this.state.done ? bookList : bookTmp}
                        </div>
                        {paginationView}
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        )
    }
}

export default BooksList
