import React, {useState, useContext} from 'react'
import { Form, Modal, Button, Notification } from 'react-bulma-components';
import {useStyles} from './styles/authStyles'
import {AuthContext} from './contexts/AuthContext'

const { Input, Field, Control, Label } = Form;

export default function SignUp(props) {
    const classes = useStyles()

    const {signUp} = useContext(AuthContext)

    const [signUpUsername, setSignUpUsername] = useState()
    const [signUpEmail, setSignUpEmail] = useState()
    const [signUpPassword, setSignUpPassword] = useState()
    const [signUpConfirmPassword, setSignUpConfirmPassword] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleOpenLogIn = () => {
        props.setSignUpModal(false)
        props.setLogInModal(true)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(signUpPassword !== signUpConfirmPassword) {
            return setError('Passwords do not match.')
        }

        if(signUpUsername.length < 6 || signUpPassword.length < 6) {
            return setError('Username and/or password should be a minimum of 6 characters in length.')
        }

        try {
        setError('')
        setLoading(true)
        await signUp(signUpUsername, signUpEmail, signUpPassword)
        } catch (error) {
            console.log(error)
            return setError('Account not created')
        }
        setLoading(false)
        props.toggleAllModalsClose() 
    }
   
    return (
        <div>
            <Modal show={props.openSignUpModal} onClose={props.toggleAllModalsClose}>
                <Modal.Card className={classes.modal}>
                    <Modal.Card.Header className={classes.header} onClick={props.preventModalsClose} showClose={false}>
                        <p>Sign Up</p>
                        {error && <Notification className={classes.error} color='danger'>{error} <Button remove onClick={() => setError('')}/></Notification>}
                    </Modal.Card.Header>
                    <Modal.Card.Body className={classes.body} onClick={props.preventModalsClose}>
                    <form onSubmit={handleSubmit}>
                    <Field>
                            <Label>Username:</Label>
                            <Control>
                            <Input type="text" onChange={(e) => setSignUpUsername(e.target.value)} placeholder="Username"></Input>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Email:</Label>
                            <Control>
                            <Input type="email" onChange={(e) => setSignUpEmail(e.target.value)} placeholder="Email"></Input>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Password:</Label>
                            <Control>
                            <Input type="password" onChange={(e) => setSignUpPassword(e.target.value)} placeholder="Password"></Input>
                            </Control>
                        </Field>
                        <Field>
                            <Label>Confirm Password:</Label>
                            <Control>
                            <Input type="password" onChange={(e) => setSignUpConfirmPassword(e.target.value)} placeholder="Confirm Password"></Input>
                            </Control>
                        </Field>
                        <Button disabled={loading} fullwidth>Sign Up</Button>
                        </form>
                    </Modal.Card.Body>
                    <Modal.Card.Footer className={classes.footer} onClick={props.preventModalsClose}>
                        <span>Already have an account?<p onClick={handleOpenLogIn}>Login</p></span>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
        </div>
    )
}
