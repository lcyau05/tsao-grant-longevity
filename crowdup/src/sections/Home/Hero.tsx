import {Button, Center, Container, createStyles, Group, Overlay, rem, Stack, Text, Title} from '@mantine/core';
import {IconRocket} from "@tabler/icons-react";
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: rem(180),
        paddingBottom: rem(130),
        backgroundImage:
            'url(https://isomer-user-content.by.gov.sg/123/3541ba51-4218-4c9d-95df-be9330a0730f/OurSG%20Grants_900x600.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: rem(640),

        [theme.fn.smallerThan('md')]: {
            height: rem(560),
        },

        [theme.fn.smallerThan('sm')]: {
            paddingTop: rem(80),
            paddingBottom: rem(50),
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
        height: rem(640),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        [theme.fn.smallerThan('md')]: {
            height: rem(560),
        }
    },

    title: {
        fontWeight: 900,
        fontSize: rem(64),
        letterSpacing: rem(-1),
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        textAlign: 'center',

        [theme.fn.smallerThan('md')]: {
            fontSize: rem(48),
        },

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(28),
            textAlign: 'left',
            fontWeight: 700,
            padding: 0
        },
    },

    highlight: {
        color: theme.colors.gray[4],
    },

    description: {
        color: theme.white,
        fontSize: rem(24),
        textAlign: 'center',

        [theme.fn.smallerThan('sm')]: {
            fontSize: theme.fontSizes.md,
            textAlign: 'left',
        },
    },

    controls: {
        marginTop: `calc(${theme.spacing.xl} * 1.5)`,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    control: {
        fontSize: theme.fontSizes.md,

        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        [theme.fn.smallerThan('xs')]: {
            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },

    secondaryControl: {
        color: theme.white,
        backgroundColor: 'rgba(255, 255, 255, .4)',

        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .45) !important',
        },
    },

    badge: {
        width: "fit-content",
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        backgroundImage: theme.fn.gradient({from: theme.colors.green[2], to: theme.colors.lime[6], deg: 20}),
        fontWeight: 500
    }
}));

const HeroSection = () => {
    const {classes, theme} = useStyles();

    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1}/>

            <div className={classes.inner}>
                <Container>
                    <Stack spacing="xl">
                        <Center>
                            <Group spacing={4} className={classes.badge}>
                                <IconRocket stroke={1.5}/>
                                <Text transform="uppercase">OurSG Grants</Text>
                            </Group>
                        </Center>
                        <Title className={classes.title}>
                            Supporting social good for citizens, <Text
                            component="span"
                            inherit
                            variant="gradient"
                            gradient={{from: theme.colors.lime[5], to: theme.colors.green[4]}}
                        >by citizens with a stress-free, </Text>  seamless grant experience on a one-stop,  <Text
                            component="span"
                            inherit
                            variant="gradient"
                            gradient={{from: theme.colors.green[4], to: theme.colors.lime[5]}}
                        >integrated portal.</Text>
                        </Title>
                        <Text size="lg" className={classes.description}>
                            OurSG Grants portal brings government grants for the arts, community, heritage, social good, sports and youth into one place.
                        </Text>
                    </Stack>
                </Container>

                <div className={classes.controls}>
                    <Button className={classes.control} variant="white" size="lg" component={Link} to="/create-campaign">
                        Find My Grant
                    </Button>
                    <Button className={classes.control} variant="white" size="lg" component={Link} to="/campaigns">
                        Explore Grants
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
