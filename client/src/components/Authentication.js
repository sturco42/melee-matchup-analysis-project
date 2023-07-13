import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Form, Button, Message, Card } from 'semantic-ui-react'
import * as yup from 'yup'

const Authentication = ({ updateUser }) => {
    const [signUp, setSignUp] = useState(false)
    const [errors, setErrors] = useState([])

    const history = useHistory()

    const handleClick = () => setSignUp((signUp) => !signUp)

    const formSchema = yup.object().shape({
        username: yup
          .string()
          .required('Username Required')
          .min(4, 'Must be at least 4 characters')
          .max(30, 'Cannot exceed 30 characters'),
        password: yup
          .string()
          .required('Password Required')
          .min(5, 'Must be at least 5 characters')
          .max(100, 'Cannot exceed 100 characters'),
      })

      const formik = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
          fetch(signUp ? '/signup' : '/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          })
            .then((res) => {
              if (res.ok) {
                res.json().then((res) => {
                  updateUser(res)
                  resetForm()
                  history.push('/')
                })
              } else {
                res.json().then((error) => setErrors([error.message]))
              }
            })
            .catch((error) => console.log(error))
        },
      })

      return (
        <div>
            <Card>
                <Card.Content>
                    <Card.Header>
                        {signUp ? 'Sign Up' : 'Login'} to continue!
                    </Card.Header>
                    <Card.Description>
                        <Form onSubmit={formik.handleClick}>
                            <Form.Field>
                                <label>Username:</label>
                                <input
                                    placeholder='Username'
                                    type='text'
                                    name='username'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    className={
                                      formik.errors.username && formik.touched.username
                                        ? 'error'
                                        : ''
                                    }
                                />
                                {formik.errors.username && formik.touched.username && (<Message negative content={formik.errors.username} />)}
                            </Form.Field>
                            <Form.Field>
                                <label>Password:</label>
                                <input
                                    placeholder='Password'
                                    type='password'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={
                                        formik.errors.password && formik.touched.password
                                        ? 'error'
                                        : ''
                                    }
                                />
                                {formik.errors.password && formik.touched.password && (<Message negative content={formik.errors.password} />)}
                            </Form.Field>
                            <Button type='submit'>
                                {signUp ? 'Sign Up' : 'Login'}
                            </Button>
                        </Form>
                        {errors.length > 0 && (
                            <Message negative>
                            <Message.Header>Error Occurred:</Message.Header>
                            <Message.List>
                                {errors.map((error, index) => (
                                <Message.Item key={index}>{error}</Message.Item>
                                ))}
                            </Message.List>
                            </Message>
                        )}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Button onClick={handleClick} >
                        {signUp ? 'Login' : 'Create an Account'}
                    </Button>
                </Card.Content>
            </Card>
        </div>
      )
}

export default Authentication