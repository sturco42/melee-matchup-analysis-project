import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useFormik } from "formik"
import { Form, Button, Message, Card } from "semantic-ui-react"
import * as yup from "yup"

const Authentication = ({ updateUser }) => {
    const [signUp, setSignUp] = useState(false)

    const [errors, setErros] = useState([])


}