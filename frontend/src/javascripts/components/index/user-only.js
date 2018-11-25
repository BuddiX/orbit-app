import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../organisms/header'
import Mypage from '../organisms/mypage-main'
import ProjectPage from '../organisms/project-page-main'
import HistoryPage from '../organisms/history-page-main'
import ProfilePage from '../organisms/profile-page-main'
import Footer from '../organisms/footer'

class UserOnly extends Component {
  render() {
    const { url } = this.props.match

    return this.props.currentUser ? (
      <div className="page-container">
        <Header {...this.props} />
        <Switch>
          <Route
            exact
            path={`${url}/:userId/projects`}
            component={ProjectPage}
          />
          <Route
            exact
            path={`${url}/:userId/history`}
            component={HistoryPage}
          />
          <Route exact path={`${url}/:userId/edit`} component={ProfilePage} />
          <Route exact path={`${url}/:userId`} component={Mypage} />
          <Route render={() => <h2>404 Not Found</h2>} />
        </Switch>
        <Footer {...this.props} />
      </div>
    ) : (
      <Redirect to="/guests" />
    )
  }
}

export default connect(({ currentUser }) => ({ currentUser }))(UserOnly)