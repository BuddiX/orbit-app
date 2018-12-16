import * as React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import Meteorite from './meteorite'
import Missle from './missle'
import BlackHole from './blackhole'

import { setModalStatus, setDestroyAction } from '../../actions/common'

import { DeleteIcons } from '../../constants/images'

import '../../../stylesheets/destroy_animate.scss'

interface DeleteButtonsListProps {
  pathname: any
  rootPath: any

  setModalStatus: any
  setDestroyAction: any
}

class DeleteButtonsList extends React.Component<DeleteButtonsListProps, {}> {
  onClickOpenModal(actionType: string) {
    // this.props.setModalStatus('destroy')
    this.props.setDestroyAction(actionType)
    this.motionControll()
  }

  motionControll() {
    const target_classes: any = [
      document.getElementsByClassName('primo-orbit-motion'),
      document.getElementsByClassName('secundus-orbit-motion'),
      document.getElementsByClassName('tertius-orbit-motion'),
      document.getElementsByClassName('satelite-orbit-motion'),
    ]

    for (const target of target_classes) {
      for (let i = 0; i < target.length; i++) {
        target[i].classList.toggle('pause-animation')
        target[i].classList.toggle('start-animation')
      }
    }
  }

  render() {
    const { pathname, rootPath } = this.props
    const actionType = Object.keys(DeleteIcons)
    const deleteButtonsClass = classNames({
      'delete-buttons-show':
        pathname === `${rootPath}` ||
        /^\/users\/[1-9]\d*\/projects$/.test(pathname) ||
        pathname === `${rootPath}/history`,
    })

    return (
      <div>
        <Meteorite
          icon={DeleteIcons[actionType[0]]}
          deleteBtnClass={deleteButtonsClass}
          motionControll={() => this.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[0])
          }}
        />
        <Missle
          icon={DeleteIcons[actionType[1]]}
          deleteBtnClass={deleteButtonsClass}
          motionControll={() => this.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[1])
          }}
        />
        <BlackHole
          icon={DeleteIcons[actionType[2]]}
          deleteBtnClass={deleteButtonsClass}
          motionControll={() => this.motionControll()}
          onClick={() => {
            this.onClickOpenModal(actionType[2])
          }}
        />
      </div>
    )
  }
}

export default connect(
  null,
  { setModalStatus, setDestroyAction }
)(DeleteButtonsList)
