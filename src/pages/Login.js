import React,{Component} from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { postLogin } from '../utils/http'

class Login extends Component{

    state = {
        username:"",
        password:"",
        isLoading : false,
        response:{}
    }

    handlerChange = (e) => {
        const key = e.target.name
        this.setState({
            [key] : e.target.value
        })
    }

    handlerSubmit = async (e) => {
        e.preventDefault()
        this.setState({
            isLoading:true
        })
        const {username,password} = this.state
        await postLogin({username,password})
        .then((response) => {
            this.setState({
                isLoading:false,
                response: response.data.data
            })
            localStorage.clear()
            localStorage.setItem('token', response.data.data.accessToken)
            localStorage.setItem('_token', response.data.data.refreshToken)
            localStorage.setItem('_r', btoa(response.data.data.id))
            localStorage.setItem('_h', btoa(response.data.data.role))
            this.props.history.push('/')
        })
        .catch((error) => {
            this.setState({
                isLoading:false
            })
            alert('Something wrong')
            console.log(error)
        })

    }


    render(){
        const {isLoading} = this.state
        return(
            <>
            <Nav {...this.props}/>
            <div className="container mt-5 pt-2">
                <div className="row mt-3 justify-content-center">
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h3 className="l-app bold">
                                    Login
                                </h3>
                            </div>
                        </div>
                        <hr className="my-2 my-lg-0"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4">
                        <form>
                            <small>Username</small>
                            <input type="text" name="username" className="form-control mb-3" onChange={this.handlerChange}/>
                            <small>Password</small>
                            <input type="password" name="password" className="form-control mb-3" onChange={this.handlerChange}/>
                            <button className="btn btn-success form-control" onClick={this.handlerSubmit}>
                               {isLoading ? <i className="fas fa-spinner fa-pulse mr-2"></i>: ""}
                                Login
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

export default Login
