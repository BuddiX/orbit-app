import * as React from from 'react'
import { connect } from 'react-redux'
import { fetchDestroyedAssignments, restoreAssignment } from '../../actions/assignments'
import { PlanetImgs } from '../../constants/images'

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.fetchDestroyedAssignments()
  }

  renderDestroyedAssignments(eachAssignment) {
    return <li key={eachAssignment.id}>{eachAssignment.title}</li>
  }

  onRestoreAssignment(assignmentId) {
    this.props.restoreAssignment(assignmentId)
  }
  renderTest() {
    return ({

    })
  }
  renderStoredPlanetList() {
    return (
      PlanetImgs.map((key, planetImg) => {
        return (
          <li key={planetImg} className="planet"><img src={planetImg} className="stored-planet" /></li>
        )
      })
    )
  }

  render() {
    const { destroyedAssignments } = this.props
    if (!destroyedAssignments) return <div>Loading...</div>

    return(
      <div id="history-container">
        {/*<a onClick={this.onRestoreAssignment.bind(this, 7)}>RESTORE</a>*/}
        {/*<div>{destroyedAssignments.map(this.renderDestroyedAssignments)}</div>*/}
        <ul id="stored-planet-list">

        </ul>
      </div>
    )
  }
}

export default connect(
  ({ destroyedAssignments }) => ({ destroyedAssignments }),
  { fetchDestroyedAssignments, restoreAssignment }
)(HistoryPage)
