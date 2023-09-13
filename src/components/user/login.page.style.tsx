import {createStyles} from "@mantine/core";

export const useStyles = createStyles({
    container: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_wraper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card_box:{
        width: '30%'
    },
    option: {
        fontSize: "20px",
        fontWeight: "bold",
        margin: "0 2.5%",
        paddingBottom: '2%',
        width: '20%',
        textAlign: 'center',
    },
    optionSelected: {
        fontSize: "20px",
        fontWeight: "bold",
        margin: "0 2.5%",
        paddingBottom: '2%',
        width: '20%',
        textAlign: 'center',
        borderColor: '#B37FEB',
        borderBottom: '3px solid',

    },
    form_wrapper: {
        padding: '1em 2em'
    },
    button_box: {
        padding: '1em 2em',
        margin: '0',
        width: '100%'
    }
})
