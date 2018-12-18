import * as React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'

import InputField from '../../atoms/input-field'
import FormSubmitBtn from '../../atoms/buttons/form-submit-btn'

import { updateProfile } from '../../../actions/users'

type ProfileUpdateFormProps = {
  updateProfile: any
  history: any
}

interface UpdateProfileValues {
  username: any
  email: any
  password: any
  confirmation: any
}

class ProfileUpdateForm extends React.Component<ProfileUpdateFormProps, {}> {
  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmation: '',
        }}
        onSubmit={(values: UpdateProfileValues, actions: any) => {
          // TODO: Flashメッセージの実装
          if (window.confirm('プロフィール情報を更新していいですか？')) {
            Promise.resolve()
              .then(
                this.props.updateProfile(
                  values.username,
                  values.email,
                  values.password,
                  values.confirmation
                )
              )
              .then(this.props.history.push('/'))
            actions.setSubmitting(false)
          }
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
        }) => (
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              name="email"
              placeholder="EMAIL ADRESS"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
            <InputField
              type="password"
              name="password"
              placeholder="PASSWORD"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && errors.password}
            <InputField
              type="password"
              name="confirmation"
              placeholder="CONFIRM PASSWORD"
              value={values.confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmation && touched.confirmation && errors.confirmation}
            <FormSubmitBtn label="SIGN UP" isSubmit={isSubmitting} />
          </form>
        )}
      </Formik>
    )
  }
}
//  参考資料として
// function validate(values: any) {
//   const errors: any= {}

//   if (values.username && values.username.length > 50) {
//     errors.username = 'Too long username'
//   }

//   if (values.email && values.email.length > 255) {
//     errors.email = 'Too long email address'
//   } else if (
//     values.email &&
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//   ) {
//     errors.email = 'Invalid email address'
//   }

//   if (!values.password) {
//     errors.password = 'Password required to update profile'
//   } else if (values.password.length < 6) {
//     errors.password = 'Password must contain at least 6 characters'
//   }

//   if (!values.confirmation) {
//     errors.confirmation = 'Password confirmation required'
//   } else if (values.password !== values.confirmation) {
//     errors.confirmation = 'Not match password'
//   }
//   return errors
// }

export default connect(
  null,
  { updateProfile }
)(ProfileUpdateForm)
