import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlayerForm from '../components/PlayerForm'
import {HEADERS, REGISTER_URL} from '../constants'

class EditProfileContainer extends Component {

    handleChange = (e) => {
        if (e.target) {
            this.setState({[e.target.name]: e.target.value})
        } else {
            this.setState({country: e})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let {username, email, password_digest} = this.state
        if (username === '' || password_digest === '' || email === ''){
            alert("Please fill the * required * fields")
        } else if (this.state.password_digest !== this.state.confirm) {
            alert("Please be sure that the password and confirmation match")
            this.setState({password_digest: '', confirm: ''})
        } else {
            fetch(REGISTER_URL, {
                method: "POST",
                headers: HEADERS,
                body: JSON.stringify(this.state)
            })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    username: '',
                    email: '',
                    'password_digest': '',
                    confirm: '',
                    country: ''
                })
                this.props.dispatch({type: "SET_USER", payload: data})
            })
        }
    }
    render() {
        return(
            <div className='ordinary' >
                <br />
                <h3> TEST HELLO WORLD! </h3>
                <PlayerForm  
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit} 
                    player={this.props.currentPlayer} 
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
        
    }
}


export default connect(mapStateToProps)(EditProfileContainer)
