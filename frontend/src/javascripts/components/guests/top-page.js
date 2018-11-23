import * as React from from 'react'
import { Route, Switch } from 'react-router-dom'
import SigninForm from './signin-form'
import SignupForm from './signup-form'
import ImgLogo from '../../../images/index/logo.png'
import ImgPlanet from '../../../images/index/top_earth.png'

export default class TopPage extends React.Component {
  render() {
    return (
      <div className="top-page-container">
        <div className="logo-container">
          <img src={ImgLogo} className="top-page-logo" />
        </div>
        <div className="sign-form">
          <Switch>
            <Route exact path="/guests/signin" component={SigninForm} />
            <Route exact path="/guests/signup" component={SignupForm} />
          </Switch>
        </div>
        <div className="planet-img-container">
          <img src={ImgPlanet} className="top-page-planet" />
        </div>
      </div>
    )
  }
}
