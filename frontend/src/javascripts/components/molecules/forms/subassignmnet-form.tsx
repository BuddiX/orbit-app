import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import SelectField from '../../atoms/select-field'

import { setSelectedStar, resetSelectedStar } from '../../../actions/common'
import { createSubAssignment } from '../../../actions/subassignmnets'

import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

interface AssignmentFormProps {
  assignmentId: string

  selectedStar: any
  currentProject: any

  setSelectedStar: any
  resetSelectedStar: any
  createSubAssignment: any
}

interface CreateSubAssignmentProps {
  title: string
  description: string
  deadline: string
  planet_size: number
}

class SubAssignmentForm extends React.Component<AssignmentFormProps> {
  render() {
    const satelite_type: any = this.props.selectedStar // reducerでの型付けと対応
    const { assignmentId } = this.props

    return (
      <div id="form-on-modal">
        <div className="form-title">New SubAssignment</div>
        <Formik
          initialValues={{
            title: '',
            description: '',
            deadline: '',
            planet_size: 0,
          }}
          onSubmit={(values: CreateSubAssignmentProps, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              this.props.createSubAssignment(
                values.title,
                values.description,
                values.deadline,
                satelite_type,
                values.planet_size,
                assignmentId
              )
              this.props.resetSelectedStar()
              setSubmitting(false)
            }, 400)
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-line-1">
                <InputField
                  type="title"
                  name="title"
                  placeholder="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title && errors.title}
                <InputField
                  type="date"
                  name="deadline"
                  placeholder="deadline"
                  value={values.deadline}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.deadline && touched.deadline && errors.deadline}
              </div>
              <div className="form-line-2">
                <InputField
                  type="textarea"
                  name="description"
                  placeholder="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="form-line-3">
                <SelectField
                  name={name}
                  value={values.planet_size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormSubmitBtn label="決定" disabled={isSubmitting} />
              </div>
            </form>
          )}
        </Formik>
      </div>
    )
  }
}

const mapStateToProps = ({ selectedStar, currentProject }: any) => {
  return { selectedStar, currentProject }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    { setSelectedStar, resetSelectedStar, createSubAssignment },
    dispatch
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubAssignmentForm)
