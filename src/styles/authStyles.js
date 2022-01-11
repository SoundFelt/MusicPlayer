import {createUseStyles} from 'react-jss'

export const useStyles = createUseStyles({
    modal: {
        width: '350px'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2rem',
        flexDirection: 'column'
    
    },
    error: {
        fontSize: '1rem',
        padding: '10px 40px',
        marginTop: '10px'
    },
    body: {
        "& Label": {
            textAlign: 'left',
            fontWeight: '400',
            fontSize: '0.9rem'
        },
        "& Input" : {
            marginBottom: '5px',
            fontSize: '0.9rem'
        },
        "& Button": {
            backgroundColor: 'rgb(20, 110, 223)',
            color: 'rgb(240, 240, 240)',
            fontWeight: '400',
            fontSize: '1.1rem',  
        }
    },
    footer: {
        display: 'flex',
        justifyContent: 'center',
        "& p": {
            margin: '0 5px',
            color: 'rgb(73, 109, 155)',
            cursor: 'pointer',
            "&:hover" : {
                color: 'black',
               
            },
        },
    },

    //Individual modal styles//

    loginButton: {
        marginBottom: '10px'
    },
    forgotPasswordLink: { 
        cursor: 'pointer',
        color: 'rgb(73, 109, 155)',
        "&:hover" : {
            color: 'black'
        },
    },

    '@media (max-width: 600px)': {
        modal: {
            width: '300px',
        },
        header: {
            height: '50px',
                "& p": {
                    fontSize: '20px'
                }
        },
        footer: {
            height: '50px',
            "& span": {
                fontSize: '15px'
            },
            "& p": {
                fontSize: '15px'
            },
        },
        body: {
            "& Label": {
                textAlign: 'left',
                fontWeight: '400',
                fontSize: '0.8rem'
            },
            "& Input" : {
                marginBottom: '5px',
                fontSize: '0.7rem'
            },
            "& Button": {
                backgroundColor: 'rgb(20, 110, 223)',
                color: 'rgb(240, 240, 240)',
                fontWeight: '400',
                fontSize: '0.8rem',  
            }
        },
    },
})