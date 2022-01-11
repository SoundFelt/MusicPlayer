import React, {useState, useContext} from 'react'
import { Form, Modal, Button, Notification} from 'react-bulma-components';
import {AuthContext} from './contexts/AuthContext'
import ForgotPassword from './ForgotPassword'
import {useStyles} from './styles/authStyles'

const { Input, Field, Control, Label } = Form;

export default function LogIn(props) {
    const classes = useStyles()

    const {logIn} = useContext(AuthContext)

    const [logInEmail, setLogInEmail] = useState()
    const [logInPassword, setLogInPassword] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOpenForgotPassword = () => {
        props.toggleForgotPasswordModal()
        setError('')
    }

    const handleOpenSignUp = () => {
        props.setSignUpModal(true)
        props.setLogInModal(false)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
        setError('')
        setLoading(true)
        await logIn(logInEmail, logInPassword)
        } catch {
            setLoading(false)
            return setError('Username or password incorrect. Please try again.')
        }
        setLoading(false)
        props.toggleAllModalsClose()
    }

    return (
        <div>
            <Modal show={props.openLogInModal} onClose={props.toggleAllModalsClose}>
                <Modal.Card className={classes.modal}>
                    <Modal.Card.Header className={classes.header} onClick={props.preventModalsClose} showClose={false}>
                        <p>Log In</p>
                        {error && <Notification className={classes.error} color='danger'>{error}<Button remove onClick={() => setError('')}/></Notification>}
                    </Modal.Card.Header>
                    <Modal.Card.Body className={classes.body} onClick={props.preventModalsClose}>
                    <form onSubmit={handleSubmit}>
                        <Field>
                            <Label>Email:</Label>
                            <Control>
                            <Input type="email" onChange={(e) => setLogInEmail(e.target.value)} placeholder="Email"></Input>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Password:</Label>
                            <Control>
                            <Input type="password" onChange={(e) => setLogInPassword(e.target.value)} placeholder="Password"></Input>
                            </Control>
                        </Field>
                        <Button className={classes.loginButton} disabled={loading} fullwidth>Log In</Button>
                        </form>
                        <p className={classes.forgotPasswordLink} onClick={handleOpenForgotPassword}>Forgot Password?</p>

                        <ForgotPassword setLogInModal={props.setLogInModal} forgotPasswordModal={props.forgotPasswordModal} setForgotPasswordModal={props.setForgotPasswordModal} />
                    </Modal.Card.Body>
                    <Modal.Card.Footer className={classes.footer} onClick={props.preventModalsClose}>
                        <span>Don't have an account yet?<p onClick={handleOpenSignUp}>Sign Up</p></span>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
        </div>
    )
}
