
import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Form, Button, Message, Card } from 'semantic-ui-react'
import * as yup from 'yup'
import { UserContext } from './UserContext'
// import Clips from './Clips'

//need to pass logic into ClipForm
const UpdateClipForm = ( {notebook_id, clip, handleUpdate} ) => {
    const user = useContext(UserContext)
    const history = useHistory()

    const updateSchema = yup.object().shape({
        title: yup
            .string()
            .required('Title Required')
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Cannot exceed 20 characters'),
        link: yup
            .string()
            .required('Link Required')
            .min(5, 'Must be at least 5 characters')
            .max(500, 'Cannot exceed 500 characters')
            .test('is-iframe-link', 'Link must start with <iframe', (value) => {
                if (!value) return false // Skip validation if the value is empty or null
                return value.trim().startsWith('<iframe')
            })
           ,
        notes: yup
            .string()
            .required('Please enter some amount of notes')
            .min(5, 'Must be at least 5 characters')
            .max(100, 'Cannot exceed 100 characters'),
      })
      
      const formik = useFormik({
    
        initialValues: {
            //! ISSUE WITH CLIP NOT BEING READ / HAVING DATA?
            title: clip.title,
            link: clip.link,
            notes: clip.notes,
          },
          validationSchema: updateSchema,

          onSubmit: async (values, {setErrors, resetForm, setSubmitting}) => {
            setSubmitting(true);
            fetch(`/notebooks/${notebook_id}/clips/${clip.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then((res) => {
                setSubmitting(false)
                if (res.ok) {
                    res.json()
                    handleUpdate(clip.id)
                    alert('Successfully updated clip')
                } else {
                    res.json().then((errors) => setErrors(errors.errors))
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
                    <label>Title</label>
                    <input                    
                        label='Title'
                        type='text'
                        placeholder='Enter your new title'
                        name='title'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        className={
                            formik.errors.title && formik.touched.title
                            ? 'error'
                            : null
                        }
                    />
                </Form.Field>
                <Form.Field>
                    <label>Link</label>
                        <input
                            label='Link'
                            type='text'
                            placeholder='Enter your new link'
                            name='link'
                            value={formik.values.link}
                            onChange={formik.handleChange}
                            className={
                                formik.errors.link && formik.touched.link
                                ? 'error'
                                : null
                            }
                            />
                </Form.Field>
                <Form.Field>
                    <label>Notes</label>
                      <input
                        label='Notes'
                        type='text'
                        placeholder='Update your notes'
                        name='notes'
                        value={formik.values.notes}
                        onChange={formik.handleChange}
                        className={
                            formik.errors.notes && formik.touched.notes
                            ? 'error'
                            : null
                        }
                        />
                </Form.Field>
                <Button type='submit'>Edit Clip</Button>
            </Form>
        </div>
    )
}

export default UpdateClipForm