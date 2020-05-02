import React,{Component} from 'react'
import {getAuthor, postAuthor, putAuthor, deleteAuthor} from '../utils/http'


class Author extends Component{

    state = {
        id:"",
        name:"",
        edit:false,
        author:[],
        isLoading : false
    }

    handleClick = (e) => {
        this.setState({
            id:e.target.id,
            name:e.target.text,
            edit:true,
        })
    }

    handleChange = (e) => {
        if(e.target.value === ""){
            this.setState({
                name:e.target.value,
                edit:false,
            })
        }else{
            this.setState({
                name:e.target.value
            })
        }
        
    }

    handleDelete = async () => {
            this.setState({
                isLoading:true
            })
            await deleteAuthor(this.state.id)
            .then(()=>{
                this.getData()
            })
            .catch((error) => {
                if(error.response.data.data.message === "JsonWebTokenError" || error.response.data.data.message === "TokenExpiredError"){
                    this.props.history.push("/refresh-token")
                }
            })
    }

    handleStore = async () => {
        this.setState({
            isLoading:true
        })
        await postAuthor({name : this.state.name})
            .then(()=>{
                this.getData()
            })
            .catch((error) => {
                if(error.response.data.data.message === "JsonWebTokenError" || error.response.data.data.message === "TokenExpiredError"){
                    this.props.history.push("/refresh-token")
                }
            })
    }

    handleUpdate = async () => {
        this.setState({
            isLoading:true
        })
        await putAuthor({name : this.state.name},this.state.id)
            .then(()=>{
                this.getData()
            })
            .catch((error) => {
                if(error.response.data.data.message === "JsonWebTokenError" || error.response.data.data.message === "TokenExpiredError"){
                    this.props.history.push("/refresh-token")
                }
            })
    }

    getData = async () => {
        this.setState({
            name:"",
            id:"",
            edit:false,
            isLoading:false
        })
        await getAuthor()
        .then(response=>{
            this.setState({
                author : response.data.data
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    async componentDidMount(){
       this.getData()
        
    }


    render(){
        const {author,name,edit,isLoading} = this.state
        const LiAuthor = author.map(author =>{
            return (
                <li className="pointer" key={author.id}>
                  <a id={author.id} onClick={this.handleClick}>
                    {author.name}
                  </a>
                </li>
            )
        })
        const loading = <i className="fas fa-spinner fa-pulse"></i>
        return (
             
            <>  
                <div className="row mt-3">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-6">
                                <h4 className="l-app bold">
                                    Manage Author {isLoading?loading:""}
                                </h4>
                            </div>
                            <div className="col-lg-6">
                                <div className="input-group">
                                    <input type="text" className="form-control" value={name} onChange={this.handleChange}/>
                                    <div className="input-group-append">
                                        {
                                          edit ?
                                          (<><button className="btn btn-success" onClick={this.handleUpdate}><i className="fas fa-edit"></i></button>
                                          <button className="btn btn-success" onClick={this.handleDelete}><i className="fas fa-trash"></i></button></>)
                                            :
                                          (<button className="btn btn-success" onClick={this.handleStore}><i className="fas fa-plus"></i></button>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-2 my-lg-2"/>
                        <small><i>Click to select author</i></small>
                    </div>
                </div>
                <ul>
                    {LiAuthor}
                </ul>
            </>
        )
    }
}

export default Author