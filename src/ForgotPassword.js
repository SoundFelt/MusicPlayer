import React, {useState, useContext} from 'react'
import { Form, Modal, Button, Notification } from 'react-bulma-components';
import {useStyles} from './styles/authStyles'
import {AuthContext} from './contexts/AuthContext'

const { Input, Field, Control, Label } = Form;

export default function LogIn(props) {
    const classes = useStyles()

    const {forgotPassword} = useContext(AuthContext)

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleGoBack = () => {
        props.setLogInModal(true)
        props.setForgotPasswordModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
        setMessage('')
        setError('')
        setLoading(true)
        await forgotPassword(forgotPasswordEmail)
        } catch {
            setLoading(false)
            return setError('Failed to send reset link')
        }
        setMessage('Email sent. Please check your inbox for reset link.')
        setLoading(false)
    }
   
    return (
        <div>
            <Modal show={props.forgotPasswordModal} onClose={() => props.setForgotPasswordModal(false)}>
                <Modal.Card className={classes.modal}>
                    <Modal.Card.Header className={classes.header} showClose={false}>
                        <p>Password Reset</p>
                        {error && <Notification className={classes.error} color='danger'>{error}</Notification>}
                        {message && <Notification className={classes.message} color='success'>{message}</Notification>}       
                    </Modal.Card.Header>
                    <Modal.Card.Body className={classes.body}>
                    <form onSubmit={handleSubmit}>
                        <Field>
                            <Label>Email:</Label>
                            <Control>
                            <Input type="text" onChange={(e) => setForgotPasswordEmail(e.target.value)} placeholder="Email used for account"></Input>
                            </Control>
                        </Field>
                        <Button disabled={loading} fullwidth>Send Password Reset Link</Button>
                        </form>
                    </Modal.Card.Body>
                    <Modal.Card.Footer className={classes.footer} >
                        <p onClick={handleGoBack}>Go Back</p>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
        </div>
    )
}
