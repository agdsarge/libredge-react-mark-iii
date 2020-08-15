import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './css/App.css';

import { JWT_URL } from './constants'

import Splash from './components/Splash'
import NavBar from './components/NavBar'
import ProfilePage from './components/ProfilePage'

import LoginContainer from './containers/LoginContainer'
import RegistrationContainer from './containers/RegistrationContainer'
import ContentGrid from './containers/ContentGrid'
import EditProfileContainer from './containers/EditProfileContainer'


class App extends Component {

    componentDidMount() {   // Auth for jwt in local storage
        if (localStorage.getItem('jwt-libredge')) {
            fetch(JWT_URL, {
                method: "GET",
                headers: {Authentication: localStorage.getItem('jwt-libredge')}
            })
            .then(res => res.json())
            .then(d =>
                this.props.dispatch({type: 'SET_USER', payload: d}))
        }
    }

      render() {
          return (
              <div className="supra">
                  <Router>
                      <NavBar />
                      <Switch>
                      
                          <Route exact path='/login' render={(rp) =>
                            this.props.currentUser ?
                                <Redirect to='/lobby'/>
                                    :
                                <ContentGrid {...rp} focusComponent={<LoginContainer />} />}
                          />
                          
                          <Route exact path='/register' render={(rp) =>
                              this.props.currentUser ? <Redirect to='/lobby' /> :
                              <ContentGrid {...rp} focusComponent={<RegistrationContainer />} /> } 
                          />

                         <Route exact path='/profile' render={(rp) =>
                            this.props.currentUser ?
                                <ContentGrid {...rp} focusComponent={<ProfilePage />}/>
                                    :
                                <Redirect to='/login' />}
                        /> 
                          
                         <Route exact path='/edit_profile' render={(rp) =>
                            this.props.currentUser ?
                                <ContentGrid {...rp} focusComponent={<EditProfileContainer />}/>
                                    :
                                <Redirect to='/login' />}
                        /> 
                          <Route exact path='/home' render={(rp) => <Splash {...rp} />}/>
                        
                          <Route path="*" render={(rp) => <Redirect to='/home' />}/>
                     
                      </Switch>    
                  </Router>
              </div>
          )
      }; 
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser};
};


export default connect(mapStateToProps)(App);
