import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  selectAssignment,
  disselectAssignment,
} from '../../actions/assignments'
import PopupBox from '../atoms/popup-box'
import Planet from '../atoms/planet'

class CircleOrbit extends Component {
  onMouseOver(e) {
    const target_planet = e.target.parentNode.parentNode //e.g. div.planet-secundus-small

    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'inline-block'
    }
  }
  onMouseOut(e) {
    const target_planet = e.target.parentNode.parentNode

    if (target_planet.firstChild.classList[0] === 'detail-balloon') {
      target_planet.firstChild.style.display = 'none'
    }
  }

  onSelected(e) {
    const target = e.target.parentNode.children[1] //e.target = .planet-img-container -> div.mark-container
    const targetPlanet = e.target.parentNode.parentNode.children[2] //canvas #2-Earth
    const selectedPlanetId = targetPlanet.id.split('-')[0]
    try {
      Number(selectedPlanetId)
      target.style
    } catch (e) {
      return
    }

    if (target.style.display === 'block') {
      target.style.display = 'none'
      this.props.disselectAssignment(selectedPlanetId)
    } else if (target.style.display === '' || target.style.display === 'none') {
      target.style.display = 'block'
      this.props.selectAssignment(selectedPlanetId)
    }
  }

  render() {
    const { revolvingAssignments, orbit } = this.props
    if (!revolvingAssignments) return <div>Loading...</div>

    const pos = ['top', 'right', 'left', 'bottom']

    if (revolvingAssignments[orbit].length === 0) {
      return <div className={`circle-${this.props.orbit} common-circle`} />
    }

    return (
      <div className={`circle-${this.props.orbit} common-circle`}>
        {revolvingAssignments[orbit].map((assignmentInfo, index) => {
          return (
            <div
              className={`common ${pos[index % 4]} ${
                assignmentInfo.orbit_pos
              }-orbit-motion start-animation`}
              key={assignmentInfo.id}
            >
              <div
                className={`planet-${assignmentInfo.planet_size}-${
                  assignmentInfo.orbit_pos
                }`}
              >
                <PopupBox assignmentInfo={assignmentInfo} />
                <Planet
                  className="planet-img-container"
                  planetType={assignmentInfo.planet_type}
                  onClick={this.onSelected.bind(this)}
                  onMouseOver={this.onMouseOver.bind(this)}
                  onMouseOut={this.onMouseOut.bind(this)}
                />
                <canvas
                  id={`${assignmentInfo.id}-${assignmentInfo.planet_type}`}
                  className="canvas"
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(
  ({ revolvingAssignments }) => ({ revolvingAssignments }),
  { selectAssignment, disselectAssignment }
)(CircleOrbit)
