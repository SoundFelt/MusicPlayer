import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    userTracksContainer: {
        height: '100%',
        width: '450px'
    },
    trackInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '15px 0',
        "& span" : {
            fontSize: '0.9rem'
        },
    },
    imageTitleArtist: {
        display: 'flex',
        alignItems: 'center',
        width: '85%',
    },
    trackImg: {
        width: '60px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '100%',
        marginRight: '10px'
        
    },
    trackTitle: {
        color: 'black',
        fontWeight: '500',
        marginRight: '5px',
        cursor: 'pointer',
    },
    trackArtist: {
        whiteSpace: 'nowrap',
  	    overflow: 'hidden',
  	    textOverflow: 'ellipsis',
        margin: '0',
        cursor: 'pointer'
    },
    iconsContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        marginLeft: '5px',
    },
    deleteIcon: {
        marginLeft: '15px',
        color: 'rgb(202, 46, 40)',
        cursor: 'pointer'
    },
    musicIcon: {
        color: 'rgb(10, 146, 31)',
        cursor: 'pointer'
    },
    '@media (max-width: 600px)': {
        userTracksContainer: {
            width: '80%',
            margin: 'auto',
        },
        trackInfo: {
            width: '100%',
            "& span" : {
                fontSize: '0.7rem'
            },
        },
        imageTitleArtist: {
            width: '70%',
            "& img": {
                minWidth: '40px'
            },
        },
        trackImg: {
            maxWidth: '40px',
            maxHeight: '40px'
        },
        iconsContainer: {
            width: '25%',
            fontSize: '18px',
            justifyContent: 'space-between'
        },
    }
})