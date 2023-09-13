import React from 'react';
import {createStyles} from "@mantine/core";

const LogoComponent: React.FC = (): React.ReactElement => {

    const {classes} = useStyles();

    return (
        <span className={classes.container}>ChainBlade</span>
    );
};

const useStyles = createStyles({
    container: {
        fontWeight: 'bold',
        fontSize: '24px',
        color: '#9254DE',
        fontFamily: 'Roboto'
    }
});

export default LogoComponent;