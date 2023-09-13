import { Card} from '@mantine/core'
import React from 'react'
import { useStyles } from './LoginOrSignUp.style'
import LoginBox from './component/LoginBox';


const LoginOrSignUp: React.FC = () => {
    const { classes } = useStyles();
    return (
        <div className={classes.container}>
            <Card shadow="sm" padding="sm" className={classes.card_box} radius="md" withBorder>
                <div className={classes.btn_wraper}>
                    <div className={classes.option}>Login</div>
                    <div className={classes.option}>Sign up</div>
                </div>
                <LoginBox/>
            </Card>
        </div>
    )
}

export default LoginOrSignUp