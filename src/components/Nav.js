import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../images/logo.png'
import { postLogout } from '../utils/http'

class Nav extends Component{
  isLogin = localStorage.getItem('token')
  state = {
    isLoading:false,
    token:localStorage.getItem('_token')
  }

  handleLogout = async (e) => {
    e.preventDefault()
        this.setState({
            isLoading:true
        })
        await postLogout({token :this.state.token})
        .then(() => {
            this.setState({
                isLoading:false,
            })
            localStorage.clear()
            this.props.history.push('/login')
        })
        .catch((error) => {
            this.setState({
                isLoading:false
            })
            alert('Something wrong')
            console.log({error})
        })
  }

  ulNav = (isLogin) => {
    const loading = <i className="fas fa-spinner fa-pulse"></i>
    if(isLogin !== null)
    {
      return (
            <ul className="navbar-nav ml-auto px-3">
               <li className="nav-item">
                <Link to='/' className="nav-link text-light">
                <i className="fas fa-home mr-2"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/login' className="nav-link text-light">
                My Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/manage' className="nav-link text-light">
                  Manage
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Account Setting</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={this.handleLogout}>
                     {this.state.isLoading?loading:""} Logout
                  </a>
                </div>
              </li>
           </ul>
      )
    }else{
      return (
        <ul className="navbar-nav ml-auto px-2">
          <li className="nav-item">
            <Link to='/login' className="nav-link nav-active btn btn-nav-2">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/' className="nav-link nav-active btn btn-nav-2">
              Register
            </Link>
          </li>
       </ul>
     )
    }
  }

  render(){
    return(
      <>
      <div className="navbar navbar-expand-lg navbar-light bg-two py-0 fixed-top">
          <div className="container">
              <Link to='/' className="navbar-brand px-4">
                  <img src={Logo} alt="logo" />
              </Link>
              <Link to='/' className="navbar-toggler order-1 border-0 " data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-list"></i>
              </Link>
            <div className="collapse navbar-collapse order-3" id="navbarCollapse">
              {this.ulNav(this.isLogin)}
            </div>
          </div>
      </div>
      </>
    )
  }
}


export default Nav