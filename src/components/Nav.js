import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../images/logo.png'
import { postLogout } from '../utils/http'
import NavBottom from './NavBottom'

class Nav extends Component{
  isLogin = localStorage.getItem('token')
  role = atob(localStorage.getItem('_h'))
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
            window.location.href =process.env.REACT_APP_BASE_URL+'/login'
        })
        .catch((error) => {
            this.setState({
                isLoading:false
            })
            alert('Something wrong')
            console.log({error})
        })
  }

  ulNav = (isLogin,role) => {
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
              {role==="0"?
              <li className="nav-item">
                <Link to='/mybooks' className="nav-link text-light">
                My Books
                </Link>
              </li>
              :
              <li className="nav-item">
                <Link to='/manage' className="nav-link text-light">
                  Manage
                </Link>
              </li>
              }
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Profile
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Profile Setting</a>
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
            <Link to='/register' className="nav-link nav-active btn btn-nav-2">
              Register
            </Link>
          </li>
       </ul>
     )
    }
  }

  render(){
    const loading = <i className="fas fa-spinner fa-pulse"></i>
    return(
      <>
      <div className="navbar navbar-expand-lg navbar-light bg-two py-0 fixed-top">
          <div className="container">
              <Link to='/' className="navbar-brand px-4">
                  <img src={Logo} alt="logo" />
              </Link>
              {this,this.isLogin != null?
              <div className="dropleft">
                <a href="#" className="navbar-toggler dropdown-toggle no-arrow order-1 border-0 " id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-user-shield text-light"></i>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <a className="dropdown-item" href="#">Account Setting</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#" onClick={this.handleLogout}>
                     {this.state.isLoading?loading:""} Logout
                  </a>
                </div>
              </div>
              :
              <Link to={'/'} className="text-light mr-2"><i className="fas fa-home"></i></Link>
              } 
            <div className="collapse navbar-collapse order-3" id="navbarCollapse">
              {this.ulNav(this.isLogin,this.role)}
            </div>
          </div>
      </div>
      <NavBottom name={this.props.name}/>
      </>
    )
  }
}


export default Nav