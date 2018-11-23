import * as React from from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import MypageOrbit from '../molecules/mypage-orbit'
import { fetchRevolvingProjects, createProject } from '../../actions/projects'

class MyPage extends React.Component {
  componentDidMount() {
    // TODO: 最初ログインした時Projectが設定されないバグ修正
    if (sessionStorage.getItem('jwt')) this.props.fetchRevolvingProjects()
  }

  onDropFixedStar(starType, e) {
    //TODO: こいつの設定
    if (e.keyCode === 13) {
      this.props.createProject(e.target.value, starType , projectId => {
        this.props.history.push(`${this.props.match.url}/projects/${projectId}`)
      })
    }
  }

  onDestroyFixedStar(projectId = 1 /* 仮デフォルト引数 */) {
    this.props.destroyProject(projectId)
  }

  render() {
    const { currentUser } = this.props
    if (!currentUser) return <div>Loading....</div>

    if (currentUser.id != this.props.match.params.userId) {
      return <Redirect to={`/users/${currentUser.id}`} />
    }

    //TODO: 歪みが子要素まで反映されているので親要素のみに留められないか
    return(
      <div id="project-list">
        <div className="user-info">
          <div className="user-img-container">
            <img src={`http://localhost:3000${this.props.currentUser.avatar.url}`} className="user-img" />
          </div>
          <div className="user-name">
            <span>WELCOME</span><br />
            {currentUser.name}
          </div>
        </div>
        <MypageOrbit history={this.props.history} match={this.props.match}/>
      </div>
    )
  }
}

export default connect(
  ({ currentUser }) => ({ currentUser }),
  { fetchRevolvingProjects, createProject }
)(MyPage)
