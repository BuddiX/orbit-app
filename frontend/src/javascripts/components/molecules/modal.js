import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import ConfirmBtn from '../atoms/confirm-btn'

import { nullifySelectedAssignment } from '../../actions/assignments'
import { setModalStatus, resetModalStatus } from '../../actions/common'

import '../../../stylesheets/modal.scss'

const customStyles = {
  overlay : {
    zIndex                : '1000',
    backgroundColor       : 'rgba(13, 25, 36, 0)'
  },
  content : {
    display               : 'flex',
    justifyContent        : 'center',
    flexWrap              : 'wrap',
    width                 : '400px',
    height                : '100px',
    backgroundColor       : 'rgba(13, 25, 36, 0.7)',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    padding               : '10px',
    marginRight           : '-50%',
    color                 : '#fff',
    transform             : 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#app')

class ConfirmModal extends Component {
  constructor(props) {
    super(props)

    this.state ={
      destroy: "本当に選択タスクを破壊しますか？",
      restore: "本当に選択したタスクを元の場所に戻しますか？"
    }
  }

  closeModal(isDestroy) {
    this.props.resetModalStatus(false)
    if(isDestroy) {
      this.props.parentMethod(this.props.selectedAssignments)
      this.props.nullifySelectedAssignment()
    }
  }

  render(){
    return(
      <Modal
        isOpen={this.props.modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
        >
        <div className="modal-warning">{this.state.destroy}</div>
        <div className="modal-confirm-buttons">
          <div onClick={this.closeModal.bind(this, false)}><ConfirmBtn message="いいえ" /></div>
          <div onClick={this.closeModal.bind(this, true)}><ConfirmBtn message="はい" /></div>
        </div>
      </Modal>
    )
  }
}

export default connect(
  ({modalIsOpen, selectedAssignments}) => ({modalIsOpen, selectedAssignments}),
  { nullifySelectedAssignment, setModalStatus, resetModalStatus }
)(ConfirmModal)