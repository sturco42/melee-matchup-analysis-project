import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'
import { Form, Button, Message, Card } from 'semantic-ui-react'
import * as yup from 'yup'
import { UserContext } from './UserContext'
import Clips from './Clips'

const ClipForm = () => {


    const formSchema = yup.object().shape({
        title: yup
            .string()
            .required('Title Required')
            .min(3, 'Must be at least 3 characters')
            .max(20, 'Cannot exceed 20 characters'),
        link: yup
            .string()
            //   .required('Password Required')
            .min(5, 'Must be at least 5 characters')
            .max(100, 'Cannot exceed 100 characters')
            .test('is-iframe-link', 'Link must start with <iframe', (value) => {
                if (!value) return false // Skip validation if the value is empty or null
        
                return value.trim().startsWith('<iframe')
            }),
        notes: yup
            .string()
            .required('Please enter some amount of notes')
            .min(5, 'Must be at least 5 characters')
            .max(100, 'Cannot exceed 100 characters'),
      })

      
}