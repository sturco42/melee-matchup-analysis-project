import { useFormik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { Form, Button, Message } from 'semantic-ui-react';

const UpdateUserForm = ({ updateUser, user }) => {
  const history = useHistory();

  const updateSchema = yup.object().shape({
    username: yup
      .string()
      .required()
      .min(8, 'Too Short!')
      .max(18, 'Too Long!'),
    password: yup
      .string()
      .required()
      .min(8)
      .max(20),
  });

  const formik = useFormik({
    initialValues: {
      username: user.username,
      password: user.password,
    },
    validationSchema: updateSchema,
    onSubmit: (values, { setErrors, setSubmitting, resetForm }) => {
      setSubmitting(true);
      fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          setSubmitting(false);
          if (res.ok) {
            res.json().then((user) => {
              updateUser(user)
              alert('Successfully updated your account!')
              resetForm({})
              history.push('/users/:id')
            });
          } else {
            res.json().then((err) => setErrors(err.errors))
          }
        })
        .catch((error) => {
          setSubmitting(false)
          console.error(error)
        })
    },
  })

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            type='text'
            name='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            className={formik.errors.username && formik.touched.username ? 'error' : ''}
            placeholder='Enter your new username'
          />
          {formik.errors.username && formik.touched.username && (
            <Message negative content={formik.errors.username} />
          )}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            className={formik.errors.password && formik.touched.password ? 'error' : ''}
            placeholder='Enter your new password'
          />
          {formik.errors.password && formik.touched.password && (
            <Message negative content={formik.errors.password} />
          )}
        </Form.Field>
        <Button type='submit'>Update Profile</Button>
      </Form>
    </div>
  );
};

export default UpdateUserForm;