import { combineReducers } from 'redux'
import currentUser from './current-user'
import { revolvingProjects, currentProject } from './projects'
import {
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
} from './assignments'
import { selectedStar, selectedDestroyAction, modalOpen } from './common'

const rootReducer = combineReducers({
  // commmon
  selectedStar,
  selectedDestroyAction,

  // Users
  currentUser,

  // Projects
  revolvingProjects,
  currentProject,
  // selectedProjects,

  // Assignments
  revolvingAssignments,
  destroyedAssignments,
  selectedAssignments,
  modalOpen,
})

export default rootReducer
