import React from 'react'
import {Link} from 'react-router-dom'

const NavBottom = ({name}) => {
    const role = atob(localStorage.getItem('_h'))
    if(role == 0){
      return (
        <div className="menu">
        <div className="row">
          <div className="menu-item">
            <Link to={'/'} className={name==="home"?"active":""}>
              <i className="fas fa-home "></i><br/>
              <small>Home</small>
            </Link>
          </div>
          <div className="menu-item">
            <Link to={'/mybooks'} className={name==="mybooks"?"active":""}>
              <i className="fas fa-bookmark"></i><br/>
              <small>My Books</small>
            </Link>
          </div>
        </div>
      </div>
      )
    }else if(role ==1){
      return (
        <div className="menu">
        <div className="row">
          <div className="menu-item">
            <Link to={'/'} className={name==="home"?"active":""}>
              <i className="fas fa-home "></i><br/>
              <small>Home</small>
            </Link>
          </div>
          <div className="menu-item">
            <Link to={'/manage'} className={name==="manage"?"active":""}>
              <i className="fas fa-cog"></i><br/>
              <small>Manage</small>
            </Link>
          </div>
        </div>
      </div>
      )
    }else{
      return (
        <div className="menu">
        <div className="row">
          <div className="menu-item">
            <Link to={'/login'} className={name==="login"?"active":""}>
              <i className="fas fa-sign-in-alt "></i><br/>
              <small>Login</small>
            </Link>
          </div>
          <div className="menu-item">
            <Link to={'/register'} className={name==="register"?"active":""}>
              <i className="fas fa-user-edit"></i><br/>
              <small>Register</small>
            </Link>
          </div>
        </div>
      </div>
      )
    }
    
}

export default NavBottom