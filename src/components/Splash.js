import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

import '../css/splash.css'

class Splash extends Component {

    render() {
        return (
            <div className='splashBackground' >
                <div className='veryLarge'>
                    <em> Welcome to <span className='lg'>LiBre</span>dge!</em>
                </div>
                <br />
                <br />
                <div className='splashBox'>
                    <h2> Play contract bridge online. </h2>
                    <h2> LiBredge is <span className='lg'>free</span>.</h2>
                    <h2> LiBredge always will be <span className='lg'>free</span>.</h2>
                    {this.props.currentUser ?
                        <h2 style={{width: '480px'}}>You may see your games in the <NavLink to='/lobby' exact style={{color:'lightGreen'}}><u>lobby</u>.</NavLink></h2>
                            :
                        <h2 style={{width: '480px'}}> Please <NavLink to='/login' exact style={{color:'lightGreen'}} ><u>sign in.</u></NavLink> If you are new, please <NavLink to='/register' exact style={{color:'lightGreen'}} > <u>register</u></NavLink>.</h2>
                    }
                </div>
                <div className='paintingInfo'>
                    George Goodwin Kilburne, <em>A Good Hand</em> 1924. Watercolor.
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}


export default connect(mapStateToProps)(Splash)

