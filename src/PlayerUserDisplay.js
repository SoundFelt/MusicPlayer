import React, {useContext, useEffect, useState} from 'react'
import AddTrack from './AddTrack'
import UserTracks from './UserTracks'
import {AuthContext} from './contexts/AuthContext'
import {useStyles} from './styles/playerStyles'
import {Button} from 'react-bulma-components'

function PlayerUserDisplay(props) {
    const classes = useStyles()
    const {currentUser, users, logOut} = useContext(AuthContext)

    const [currentUserDB, setCurrentUserDB] = useState()

    const logOutAndStopTrack = () => { 
        props.setIsPlaying(false)
        logOut()
    }

    useEffect(() => {
        setCurrentUserDB(users.filter(user => user.uid === currentUser.uid))
   }, [])

    return (
        <div>
            <div className={classes.displayUserContainer}> 
                   { currentUserDB !== undefined && <p>{`Welcome back ${currentUserDB[0].username}`}</p> }
                <Button className={classes.addTrack} onClick={props.toggleAddTrackModal}>Add New Track</Button>
                <Button className={classes.logOut} onClick={logOutAndStopTrack}>Logout</Button>
            </div>

            {props.openAddTrackModal && <AddTrack preventModalsClose={props.preventModalsClose} 
            openAddTrackModal={props.openAddTrackModal} toggleAllModalsClose={props.toggleAllModalsClose}
            currentUserDB={currentUserDB} />}

            {currentUserDB !== undefined && <UserTracks setCurrentUserDB={setCurrentUserDB} 
            clickedTrack={props.clickedTrack} deletingTrack={props.deletingTrack} 
            userTracks={props.userTracks} setUserTracks={props.setUserTracks} currentUserDB={currentUserDB}/>}
        </div>
    )
}

export default PlayerUserDisplay
