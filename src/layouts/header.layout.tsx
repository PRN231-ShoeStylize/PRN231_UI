import React from 'react';
import { createStyles, Header, Autocomplete, Group, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import LogoComponent from "../components/logo.component";

const HeaderLayout: React.FC = (): React.ReactElement => {

    const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();

    const links = [
        {
            link: '/',
            label: 'SSC'
        },
        {
            link: '/',
            label: 'Test'
        }
    ]

    const items = links.map((link) => (
        <a
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </a>
    ));

    return (
        <Header height={56} className={classes.header} mb={120}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm" />
                    <LogoComponent/>

                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <Autocomplete
                        className={classes.search}
                        placeholder="Search"
                        icon={<MagnifyingGlassIcon className={classes.searchIcon}/>}
                        data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                    />
                </Group>
            </div>
        </Header>
    );
};

const useStyles = createStyles((theme) => ({
    userIcon: {
        blockSize: '40px'
    },
    searchIcon: {
     blockSize: '18px'
    },
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));

export default HeaderLayout;
