import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    container: {
        position: 'relative'
    },
    playerContainer: {
        maxWidth: '450px',
        height: '100%',
        margin: 'auto',
        textAlign: 'center',
        marginTop: '150px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
    }, 
    
    player: {
        width: '100%',
        height: '100px',
        backgroundColor: 'rgb(255, 240, 240)',
        borderRadius: '10px',
        margin: 'auto',
        display: 'flex',
        color: 'black',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        boxShadow: '10px 10px 10px grey',
        position: 'relative',
    },
    imageWheel: {
        position: 'relative',
        padding: '5px',
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        border: '1.8px dashed rgba(0,0,0,0.5)',
        boxShadow: '0px 0px 10px 0px white',
        animation: '$rotate 100s linear infinite',
        animationPlayState: 'paused',
        "&:after": {
            content: '""',
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            left: '43%',
            bottom: '43%',
            zIndex: '100',
            position: 'absolute'
        }
    }, 
    imageWheelPlaying: {
        animation: '$rotate 100s linear infinite',
       
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        boxShadow: '0px 0px 5px 5px white',
        zIndex: '-2',
        animation: '$rotate 20s linear infinite',
        animationPlayState: 'paused',
    },
    imagePlaying: {
        animation: '$rotate 20s linear infinite',
 
    },
    "@keyframes rotate": {
        from: { transform: 'rotate(0)' },
        to: { transform: 'rotate(360deg)'}
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '60%'
    },
    mainTitle: {
        margin: '0',
        fontWeight: 'bold',
        "& span": {
            fontWeight: '400',
            fontStyle: 'italic'
        }
    },
    artistTitle: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        "& span": {
            fontWeight: '400',
            fontStyle: 'italic'
        }
    },
    nextTitle: {
        margin: '0',
        fontSize: '0.7rem'
    },
    notLoggedInContainer: {
        width: '45%'
    },
    notLoggedInTitle: {
        fontWeight: 'bold',
        fontSize: '1.3rem',
    },
    notLoggedInSubTitle: {
        fontStyle: 'italic',
        fontSize: '0.9rem'
    },
    controlsContainer: {
        fontSize: '1.5rem',
        position: 'relative',
        "& i:first-child": {
            fontSize: '1rem',
            cursor: 'pointer',
            "&:hover": {
                color: 'grey',
            },
        },
        "& i:nth-child(2)": {
            margin: '0 30px',
            cursor: 'pointer',
            "&:hover": {
                color: 'grey',
            },
        },
        "& i:last-child": {
            fontSize: '1rem',
            cursor: 'pointer',
            "&:hover": {
                color: 'grey',
            },
        }
    },
    loginSignUpContainer: {
        display: 'flex',
        marginTop: '20px',
        justifyContent: 'flex-end',
        fontSize: '0.8rem',
        width: '100%',
    },
    loginTitle: {
        marginRight: '10px',
        cursor: 'pointer',
        color: 'rgb(124, 124, 124)',
        fontWeight: '600',
        "&:hover" : {
            color: 'rgb(197, 201, 206)'
        },
    },
    signUpTitle: {
        cursor: 'pointer',
        color: 'rgb(124, 124, 124)',
        fontWeight: '600',
        "&:hover" : {
            color: 'rgb(197, 201, 206)'
        },
    },
    displayUserContainer: {
        display: 'flex',
        margin: '15px auto',
        fontSize: '0.8rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '400px',
        padding: '0 2px',
        
    },
    logOut: {
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '0.8rem',
        color: 'rgb(73, 109, 155)',
        padding: '0',
        
    },
    addTrack: {
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '0.8rem',
        color: 'rgb(73, 109, 155)',
        padding: '0'
    },
    
    progressBarContainer: {
        position: 'absolute',
        width: "50%",
        height: "25px",
        backgroundColor: 'rgba(100, 240, 240, 0.2)',
        margin: 'auto',
        top: '0%',
        left: '42%',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: '0',
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
        
    },
    isPlayingProgressBar: {
        transform: 'translateY(-100%)',
        opacity: '1',
    },
    progressBar: {
        height: '30%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '20px',
        cursor: 'pointer',
        position: 'relative',
    },
    progress: { 
        height: '100%',
        backgroundColor: 'rgba(30, 30, 30, 1)',
        borderRadius: '20px',
        "&:hover" : {
            backgroundColor: 'rgba(30, 30, 30, 0.9)',
        },
        
    },
    '@media (max-width: 600px)': {
        playerContainer: {
          width: '300px',
        },
        player: {
            justifyContent: 'space-between'
        },
        imageWheel: {
            width: '100px',
            height: '100px'
        },
        notLoggedInContainer: {
            marginRight: '20px',
            width: '60%'
        },
        contentContainer: {
            width: '65%'
        },
        mainTitle: {
            fontSize: '0.8rem',
            marginTop: '8px',
            "& span": {
                fontWeight: '400',
                fontStyle: 'italic'
            }
        },
        artistTitle: {
            fontSize: '0.7rem',
            fontWeight: 'bold',
            "& span": {
                fontWeight: '400',
                fontStyle: 'italic'
            }
        },
        nextTitle: {
            marginBottom: '10px',
            fontSize: '0.6rem'
        },
        displayUserContainer: {
            "& button" : {
                fontSize: '12px'
            },
            "& p": {
                maxWidth: '50%'
            },
            width: '80%',
            fontSize: '12px'
        },
        
    },
})