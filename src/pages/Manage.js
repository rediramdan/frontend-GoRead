import React,{Component} from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Author from '../components/Author'
import Genre from '../components/Genre'

class BookEdit extends Component{

    state = {
        isLoading : true
    }

    async componentDidMount(){

        
    }


    render(){
        return (
            <>
                <Nav {...this.props}/>
                <div className="container mt-5 pt-2">
                    <div className="row mt-3 justify-content-center">
                        <div className="col-lg-5">
                            <Author {...this.props}/>
                        </div>
                        <div className="col-lg-5">
                            <Genre {...this.props}/>
                        </div>
                    </div>    
                </div>
                <Footer/>
            </>
        )
    }
}

export default BookEdit