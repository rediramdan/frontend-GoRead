import React,{Component} from 'react'
import {refreshToken} from '../utils/http'

import Nav from '../components/Nav'
import Footer from '../components/Footer'

class RefreshToken extends Component{

    state = {
        isLoading : false,
        token : localStorage.getItem('_token')
    }

    handleClick = async () => {
        this.setState({
            isLoading:true
        })
        await refreshToken({token:this.state.token})
        .then((response)=>{
            localStorage.removeItem('token')
            localStorage.setItem('token', response.data.data.accessToken)
            window.location.href=process.env.REACT_APP_BASE_URL
        })
        .catch((error) => {
            window.location.href =process.env.REACT_APP_BASE_URL
            this.props.history.push("/login")
        })
    }

    async componentDidMount(){

        
    }


    render(){
        const {isLoading} = this.state
        return (
            <>
                <Nav {...this.props}/>
                <div className="container mt-5 pt-2">
                    <div className="row mt-3 justify-content-center">
                        <div className="col-lg-4 text-center mt-5">
                            <span className="text-secondary">Your token has expired, this can happen if your token has expired or your token has been lost</span>
                            <button className="btn btn-success form-control mt-3" onClick={this.handleClick}>
                               <i className={isLoading ? "fas fa-sync-alt mr-1 fa-spin":"fas fa-sync-alt mr-1"}></i> Refresh
                            </button>
                        </div>
                    </div>    
                </div>
                <Footer/>
            </>
        )
    }
}

export default RefreshToken