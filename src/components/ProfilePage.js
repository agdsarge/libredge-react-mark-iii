import React, { Component } from 'react';
import {connect} from 'react-redux';
import { API_ROOT } from '../constants'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state ={
            completedGames: 0
        }
    }

    componentDidMount() {
       fetch(`${API_ROOT}/profile/${this.props.currentUser.id}`)
            .then(r => r.json())
            .then(d => {
                console.log(d)
                this.setState({completedGames: d.playerData.completedGames})
                    
            })
    }

    render() {
        return (
            <div className='ordinary'>
                <br />
                <h2> {this.props.currentUser.username } </h2>
                <NavLink exact to='/edit_profile' style={{float:'right'}} ><Button color='blue'> EDIT </Button> </NavLink>
                <h5> This is your information </h5>
                
                <br />
                <p> Email: {this.props.currentUser.email } </p>
                <p> Country: {this.props.currentUser.country } </p>
                <p> Games completed: {this.state.completedGames } </p>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
    currentUser: state.currentUser
        
    }
}

export default connect(mapStateToProps)(ProfilePage)
