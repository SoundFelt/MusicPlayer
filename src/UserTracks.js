import React, {useEffect, useContext, useState} from 'react'
import {AuthContext} from './contexts/AuthContext'
import {useStyles} from './styles/userTracksStyles'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function UserTracks(props) {
    const classes = useStyles()
    
    const {deleteTrackInDB, currentUser} = useContext(AuthContext)
    
    const [trackDeleting, setTrackDeleting] = useState(false)

    const deletingTrack = async (idx, track) => {
        setTrackDeleting(true)
        await deleteTrackInDB(idx, props.currentUserDB[0], track.imageName, track.audioName)
        setTrackDeleting(false)
    }
    
    useEffect(() => {
        const populateArray = () => {
            const allSongUrls = []
            props.currentUserDB[0].tracks.map(track => (
                allSongUrls.push(track)
            ))
            props.setUserTracks(allSongUrls)
        }
        populateArray()
    }, [])

    return (
        <div className={classes.userTracksContainer}>
            {currentUser && props.currentUserDB[0].tracks.map((track, idx) => (
                <div className={classes.trackInfo} key={idx}>
                    <div className={classes.imageTitleArtist}>
                        <img key={track.imageUrl} className={classes.trackImg} src={track.imageUrl} alt={idx}/>
                            <span onClick={() => props.clickedTrack(idx)} className={classes.trackTitle}>
                                {track.trackTitle}
                            </span>
                            <span onClick={() => props.clickedTrack(idx)} className={classes.trackArtist}>
                            - {track.trackArtist}
                            </span>
                    </div>
                    <div className={classes.iconsContainer}>                    
                        {!trackDeleting ? <><FontAwesomeIcon className={classes.musicIcon} icon={faMusic} onClick={() => props.clickedTrack(idx)}/>
                        <FontAwesomeIcon className={classes.deleteIcon} icon={faTrashAlt} onClick={() => deletingTrack(idx, track)}/> </>
                        : ""}
                    </div>
                </div>
            ))}
        </div> 
    )
}

export default UserTracks
