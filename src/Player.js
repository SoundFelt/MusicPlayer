import React, {useContext, useState, useEffect, useRef} from 'react';
import {useStyles} from './styles/playerStyles'
import SignUp from './SignUp'
import LogIn from './LogIn'
import PlayerUserDisplay from './PlayerUserDisplay'
import {AuthContext} from './contexts/AuthContext'

function Player() {
    const classes = useStyles()
    
    const {currentUser, users} = useContext(AuthContext)

    // Modal logic and state //
    const [openSignUpModal, setSignUpModal] = useState(false)
    const [openLogInModal, setLogInModal] = useState(false)
    const [openAddTrackModal, setAddTrackModal] = useState(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)

    const toggleSignUpModal = (e) => {
      e.stopPropagation()
        setSignUpModal(true)
    }
    const toggleLogInModal = (e) => {
      e.stopPropagation()
        setLogInModal(true)
    }
    const toggleAddTrackModal = (e) => {
      e.stopPropagation()
        setAddTrackModal(true)
    }
    const toggleAllModalsClose = () => {
        setSignUpModal(false);
        setLogInModal(false);
        setAddTrackModal(false)
        setForgotPasswordModal(false)
    }
    const toggleForgotPasswordModal = () => {
        toggleAllModalsClose()
        setForgotPasswordModal(true)
    }
    const preventModalsClose = (e) => {
        e.stopPropagation()
    }
    // End of Modal logic and state //

    // Player logic and state //
    const [userTracks, setUserTracks] = useState()
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [nextSongIndex, setNextSongIndex] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const audioElement = useRef(null)
    const progressBarElement = useRef(null)

    const handleNextSong = () => {
        if (currentSongIndex + 1 > userTracks.length - 1) {
            setCurrentSongIndex(0)
            setNextSongIndex(1)
        } else {
            setCurrentSongIndex(currentSongIndex + 1)
            setNextSongIndex(nextSongIndex + 1)
        }
        if (nextSongIndex + 1 > userTracks.length - 1) {
            setNextSongIndex(0)
        }
        if (userTracks.length === 1) {
            return audioElement.current.currentTime = 0
        }
        setIsPlaying(true)
    }
    const handlePreviousSong = () => {
        if (currentSongIndex - 1 < 0) {
            setCurrentSongIndex(userTracks.length - 1)
            setNextSongIndex(0)
        } else {
            setCurrentSongIndex(currentSongIndex - 1)
            setNextSongIndex(nextSongIndex - 1)
        }
        if (nextSongIndex - 1 < 0) { 
            setNextSongIndex(userTracks.length - 1)
        }
        if (userTracks.length === 1) {
            return audioElement.current.currentTime = 0 
        }
        setIsPlaying(true)
    }
    const clickedTrack = (clickedTrackIdx) => {
        setCurrentSongIndex(clickedTrackIdx)

        if (clickedTrackIdx === userTracks.length - 1){
        setNextSongIndex(0) 
        } else {
            setNextSongIndex(clickedTrackIdx + 1)
        }
        if (clickedTrackIdx === currentSongIndex) {
        setIsPlaying(!isPlaying)
        } else { 
            setIsPlaying(true)
        }
    }
    // End of player logic and state //

    const handleProgress = () => {
        const {duration, currentTime} = audioElement.current
        const progressPercent = (currentTime / duration) * 100
        setProgress(progressPercent)
    }

    const clickProgress = (e) => {
        const progressBarTotalWidth = progressBarElement.current.clientWidth
        const clickLocation = e.nativeEvent.offsetX
        console.log(audioElement.current.duration)
        audioElement.current.currentTime = (clickLocation / progressBarTotalWidth) * audioElement.current.duration
    }

    useEffect(() => {
            isPlaying ? audioElement.current.play() : audioElement.current.pause()
    }, [isPlaying, currentSongIndex])

    return (
    <div className={classes.container} onClick={toggleAllModalsClose}>
        <div className={classes.playerContainer}>
            <div className={classes.player}>

                <div className={`${classes.progressBarContainer} ${isPlaying && classes.isPlayingProgressBar}`}>
                    <div onClick={(e) => clickProgress(e)} ref={progressBarElement} className={classes.progressBar}> 
                        <div style={{width: `${progress}%`}} className={classes.progress}></div>
                    </div>
                </div>
            
            
                <div style={{animationPlayState: `${isPlaying ? 'running' : 'paused'}`}} className={classes.imageWheel}>
                    <img style={{animationPlayState: `${isPlaying ? 'running' : 'paused'}`}} className={classes.image} 
                        alt="trackImage" src={userTracks?.length && currentUser ? userTracks[currentSongIndex].imageUrl : 'https://c1.alamy.com/thumbs/2c2rpyy/music-logo-with-neon-sign-effect-for-world-music-day-vector-illustration-2c2rpyy.jpg' }/>
                </div> 

                <audio ref={audioElement} onEnded={handleNextSong} onTimeUpdate={handleProgress} 
                    src={userTracks?.length ? userTracks[currentSongIndex].audioUrl : ""}></audio>

                {!currentUser && 
                    <div className={classes.notLoggedInContainer}>
                        <h4 className={classes.notLoggedInTitle}>MusicPlayer</h4>
                        <p className={classes.notLoggedInSubTitle}>Create an account or login to start adding tracks</p>
                    </div>}

                {currentUser && userTracks?.length === 0 && <h4>No tracks added yet!</h4>}
                            
                {currentUser && userTracks?.length ?
                <div className={classes.contentContainer}>
                    <h2 className={classes.mainTitle}><span>Now Playing:</span> {userTracks && currentUser && userTracks[currentSongIndex].trackTitle}</h2>
                        <h3 className={classes.artistTitle}><span>Artist:</span> {userTracks && currentUser && userTracks[currentSongIndex].trackArtist}</h3>
                            <div className={classes.controlsContainer}>
                                <i className="fas fa-backward" onClick={handlePreviousSong}></i>
                                {isPlaying ? <i className="fas fa-pause" onClick={() => setIsPlaying(!isPlaying)}></i>
                                : <i className="fas fa-play" onClick={() => setIsPlaying(!isPlaying)}></i>}
                                <i className="fas fa-forward" onClick={handleNextSong}></i>
                            </div>
                        <h3 className={classes.nextTitle}>Next Up: {userTracks.length > 1 && currentUser 
                            ? userTracks[nextSongIndex].trackTitle : userTracks[currentSongIndex].trackTitle}</h3>
                </div> 
                : "" }      
            </div> 

            {currentUser && users 
            ? <PlayerUserDisplay setIsPlaying={setIsPlaying} clickedTrack={clickedTrack} userTracks={userTracks} setUserTracks={setUserTracks} 
                openAddTrackModal={openAddTrackModal} preventModalsClose={preventModalsClose} 
                toggleAddTrackModal={toggleAddTrackModal} toggleAllModalsClose={toggleAllModalsClose} /> 
            : <div className={classes.loginSignUpContainer}>
                <p onClick={toggleLogInModal} className={classes.loginTitle}>Login</p>
                <p onClick={toggleSignUpModal} className={classes.signUpTitle}>Sign Up</p> 
             </div>
            }

            <SignUp preventModalsClose={preventModalsClose} toggleAllModalsClose={toggleAllModalsClose} 
                openSignUpModal={openSignUpModal} setSignUpModal={setSignUpModal} setLogInModal={setLogInModal}/> 
            <LogIn preventModalsClose={preventModalsClose} toggleAllModalsClose={toggleAllModalsClose} 
                openLogInModal={openLogInModal} setSignUpModal={setSignUpModal} setLogInModal={setLogInModal}
                toggleForgotPasswordModal={toggleForgotPasswordModal} forgotPasswordModal={forgotPasswordModal} 
                setForgotPasswordModal={setForgotPasswordModal}/> 
            
        </div>
    </div>
    );
}

export default Player;