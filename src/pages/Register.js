import React,{Component} from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { postRegister } from '../utils/http'

class Register extends Component{

    state = {
        username:"",
        password:"",
        password2:"",
        name:"",
        match:true,
        usernameCheck:true,
        isLoading : false,
        response:{}
    }

    handlerChange = (e) => {
        const key = e.target.name
        if(key === "password2"){
            if(e.target.value !== this.state.password){
                this.setState({match:false})
            }else{
                this.setState({match:true})
            }
        }

        if(key === "username"){
            if(e.target.value.indexOf(' ') >= 0){
                this.setState({usernameCheck:false})
            }else{
                this.setState({usernameCheck:true})
            }
        }
        this.setState({
            [key] : e.target.value
        })
    }

    handlerSubmit = async (e) => {
        const {username,password,name,usernameCheck,match} = this.state
        if(usernameCheck&&match){
            e.preventDefault()
            this.setState({
                isLoading:true
            })
            await postRegister({username,password,name})
            .then((response) => {
                this.setState({
                    isLoading:false,
                    response: response.data.data
                })
                localStorage.clear()
                this.props.history.push('/login')
            })
            .catch((error) => {
                this.setState({
                    isLoading:false
                })
                alert('Something wrong')
                console.log(error)
            })
        }

    }


    render(){
        const {isLoading,match,usernameCheck} = this.state
        return(
            <>
            <Nav {...this.props} name={'register'}/>
            <div className="container mt-5 pt-2">
                <div className="row mt-3 justify-content-center">
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h3 className="l-app bold">
                                    Register
                                </h3>
                            </div>
                        </div>
                        <hr className="my-2 my-lg-0"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <form>
                            <small>Name</small>
                            <input type="text" name="name" className="form-control mb-3" onChange={this.handlerChange}/>
                            <small>Username</small>
                            {usernameCheck?"":<small className="text-danger"> | Username cannot use space</small>}
                            <input type="text" name="username" className={usernameCheck?"form-control mb-3 ":"form-control mb-3 is-invalid"} onChange={this.handlerChange}/>
                            <small>Password</small>
                            <input type="password" name="password" className="form-control mb-3" onChange={this.handlerChange}/>
                            <small>Confirm Password</small>
                            {match?"":<small className="text-danger"> | Confirm password doesn't match</small>}
                            <input type="password" name="password2" className={match?"form-control mb-3 ":"form-control mb-3 is-invalid"} onChange={this.handlerChange}/>
                            <button className="btn btn-success form-control" onClick={this.handlerSubmit}>
                               {isLoading ? <i className="fas fa-spinner fa-pulse mr-2"></i>: ""}
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        )
    }
}

export default Register
