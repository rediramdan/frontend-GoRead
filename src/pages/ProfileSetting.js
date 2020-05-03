import React,{Component} from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { postRegister } from '../utils/http'

class ProfileSetting extends Component{

    state = {
        username:"",
        name:"",
        match:true,
        usernameCheck:true,
        isLoading : false,
        response:{}
    }

    handlerChange = (e) => {
        const key = e.target.name
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
        const {username,name,usernameCheck} = this.state
        if(usernameCheck){
            e.preventDefault()
            this.setState({
                isLoading:true
            })
            await postRegister({username,name})
            .then((response) => {
                this.setState({
                    isLoading:false,
                    response: response.data.data
                })
                localStorage.clear()
                window.location.href =process.env.REACT_APP_BASE_URL+'/login'
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
        const {isLoading,usernameCheck} = this.state
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
                            <button className="btn btn-success form-control" onClick={this.handlerSubmit}>
                               {isLoading ? <i className="fas fa-spinner fa-pulse mr-2"></i>: <i className="fas fa-save mr-2"></i>}
                                Save
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

export default ProfileSetting
