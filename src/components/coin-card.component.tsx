import React from "react";
import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';

interface Props {
    logo: string;
    name: string;
    date: string;
}
const CoinCardComponent: React.FC<Props> = (props): React.ReactElement => {

    const {classes} = useStyles();


    return (
        <Card withBorder shadow="sm" radius="md" p={0} className={classes.card}>
            <Group noWrap spacing={0}>
                <Image src={props.logo} height={140} width={140} />
                <div className={classes.body}>
                    <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                        {props.name}
                    </Text>
                    <Text className={classes.title} mt="xs" mb="md">
                        {props.name}
                    </Text>
                    <Group noWrap spacing="xs">
                        <Group spacing="xs" noWrap>
                            <Avatar size={20} src={props.logo} />
                            <Text size="xs">

                                {props.name}
                            </Text>
                        </Group>
                        <Text size="xs" color="dimmed">
                            •
                        </Text>
                        <Text size="xs" color="dimmed">
                            {props.date}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
};

const useStyles = createStyles((theme) => {
    return {
        card: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },

        title: {
            fontWeight: 700,
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            lineHeight: 1.2,
        },

        body: {
            padding: theme.spacing.md,
        },
    }
});

export default CoinCardComponent;