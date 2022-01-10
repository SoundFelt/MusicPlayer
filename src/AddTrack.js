import React, {useState, useContext} from 'react'
import {AuthContext} from './contexts/AuthContext'
import { Form, Modal, Button } from 'react-bulma-components';
import {useStyles} from './styles/authStyles'
const { Input, Field, Control, Label } = Form;

export default function AddTrack(props) {

    const [audioFile, setAudioFile] = useState()
    const [imageFile, setImageFile] = useState()
    const [trackTitle, setTrackTitle] = useState()
    const [trackArtist, setTrackArtist] = useState()
    const [loading, setLoading] = useState(false)

    const classes = useStyles()

    const {uploadTrackInStorage} = useContext(AuthContext)

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0])
    }
    
    const handleAudioChange = (e) => {
        setAudioFile(e.target.files[0])
    }

    const handleUploadSubmit = async (e) => {
        e.preventDefault()

        try{
            setLoading(true)
        await uploadTrackInStorage(imageFile, audioFile, trackTitle, trackArtist, props.currentUserDB[0])
        } catch {
            alert('files not uploaded')
        }
        setLoading(false)
        props.toggleAllModalsClose()
    }

    return (
        <div>
        <div>
        <Modal show={props.openAddTrackModal} onClose={props.toggleAllModalsClose}>
            <Modal.Card className={classes.modal}>
                <Modal.Card.Header className={classes.header} onClick={props.preventModalsClose} showClose={false}>
                    Add Track 
                    
                </Modal.Card.Header>
                <Modal.Card.Body className={classes.body} onClick={props.preventModalsClose}>
                <form onSubmit={handleUploadSubmit} encType="multipart/form-data" >
                    <Field>
                        <Label>Track Title:</Label>
                        <Control>
                        <Input type="text" onChange={(e) => setTrackTitle(e.target.value)} placeholder="Track Title"></Input>
                        </Control>
                    </Field>
                    <Field>
                        <Label>Track Artist:</Label>
                        <Control>
                        <Input type="text" onChange={(e) => setTrackArtist(e.target.value)} placeholder="Track Artist"></Input>
                        </Control>
                    </Field>
                    <Field>
                        <Label>Track Image: (JPEG or PNG)</Label>
                        <Control>
                        <Input type="file" onChange={handleImageChange} placeholder="Email" accept=".jpeg,.png"></Input>
                        </Control>
                    </Field>
                    <Field>
                        <Label>Track Audio: (MP3 or WAV)</Label>
                        <Control>
                        <Input type="file" onChange={handleAudioChange} placeholder="Password" accept=".mp3,.wav"></Input>
                        </Control>
                    </Field>
                    <Button disabled={loading} className={classes.loginButton}  fullwidth>Add Track</Button>
                    </form>
                </Modal.Card.Body>
                <Modal.Card.Footer className={classes.footer} onClick={props.preventModalsClose}>
                    {loading && <h5>Your track is now uploading. This may take a moment depending on file sizes.</h5>}
                </Modal.Card.Footer>
            </Modal.Card>
        </Modal>
    </div>
        </div>
    )
}
