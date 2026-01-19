import {
  Button,
  Center,
  Container,
  createStyles,
  Group,
  Overlay,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconCash } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: rem(180),
    paddingBottom: rem(130),
    backgroundImage:
      'url(https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1031&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
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
    },
  },

  title: {
    fontWeight: 900,
    fontSize: rem(64),
    letterSpacing: rem(-1),
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    textAlign: 'center',
    textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',

    [theme.fn.smallerThan('md')]: {
      fontSize: rem(48),
    },

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(28),
      textAlign: 'left',
      fontWeight: 700,
      padding: 0,
    },
  },

  description: {
    color: theme.white,
    fontSize: rem(22),
    textAlign: 'center',
    textShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',

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
    gap: theme.spacing.md,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  control: {
    fontSize: theme.fontSizes.md,
    fontWeight: 600,
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },

  badge: {
    width: 'fit-content',
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    backgroundImage: theme.fn.gradient({
      from: theme.colors.green[2],
      to: theme.colors.lime[6],
      deg: 20,
    }),
    fontWeight: 500,
  },
}));

const HeroSection = () => {
  const { classes, theme } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Container>
          <Stack spacing="xl">
            <Center>
              <Group spacing={6} className={classes.badge}>
                <IconCash stroke={1.5} />
                <Text transform="uppercase">Funding Applications Open</Text>
              </Group>
            </Center>

            <Title className={classes.title}>
              Apply for{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: theme.colors.lime[5], to: theme.colors.green[4] }}
              >
                financial support
              </Text>{' '}
              to turn your{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: theme.colors.green[4], to: theme.colors.lime[5] }}
              >
                ideas into impact
              </Text>
            </Title>

            <Text size="lg" className={classes.description}>
              Access funding designed to support meaningful projects, community initiatives,
              and innovative solutions. Submit your application and take the next step forward.
            </Text>
          </Stack>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            variant="white"
            size="lg"
            component={Link}
            to="/apply-funding"
          >
            Apply for Funding
          </Button>

          <Button
            className={classes.control}
            variant="outline"
            color="white"
            size="lg"
            component={Link}
            to="/campaigns"
          >
            View Available Funds
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
