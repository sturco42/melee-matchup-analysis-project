import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Form, Button, Message, Card } from 'semantic-ui-react'
import * as yup from 'yup'
import { UserContext } from './UserContext'
// import Clips from './Clips'

//need to pass logic into ClipForm
const ClipForm = ( {notebook_id} ) => {
    const user = useContext(UserContext)
    const history = useHistory()

    const formSchema = yup.object().shape({
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
            title: '',
            link: '',
            notes: '',
          },
          validationSchema: formSchema,

          onSubmit: async (values, {setErrors}) => {
            
            fetch(`/notebooks/${notebook_id}/clips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then((res) => {
                // something?
                if (res.ok) {
                    res.json()
                    //logic for clip
                    // .then()
                    alert('Successfully added clip')
                } else {
                    res.json().then((errors) => setErrors(errors.errors))
                }
            })
            .catch((error) => {
                //other thing i want to do?
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
                        placeholder='Title'
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
                            placeholder='Link'
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
                        placeholder='Notes'
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
                <Button type='submit'>Add Clip</Button>
            </Form>
        </div>
    )
}

export default ClipForm