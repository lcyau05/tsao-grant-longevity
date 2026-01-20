import {
  Box,
  Burger,
  Button,
  Container,
  createStyles,
  Drawer,
  Group,
  Header,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { BrandName } from "./index";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.primary[6],
  },

  hiddenDesktop: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },

  hiddenMobile: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  drawerHeader: {
    backgroundColor: theme.colors.primary[6],
    color: theme.white,
  },

  close: {
    color: theme.white,
  },
}));

const AppNavbar = () => {
  const { classes } = useStyles();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <Header height={64} className={classes.header}>
        <Container fluid h="100%">
          <Group h="100%" position="apart">
            {/* LEFT */}
            <Group>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                className={classes.hiddenDesktop}
                color="white"
              />
              <BrandName asLink size={24} variant="grayscale" />
            </Group>

            {/* RIGHT (desktop only) */}
            <Group className={classes.hiddenMobile}>
              <Button
                component={Link}
                to="/campaigns"
                radius="xl"
                variant="white"
                color="dark"
              >
                Explore Grants
              </Button>
            </Group>
          </Group>
        </Container>
      </Header>

      {/* MOBILE DRAWER */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        title="Navigation"
        className={classes.hiddenDesktop}
        classNames={{ header: classes.drawerHeader, close: classes.close }}
      >
        <Button
          component={Link}
          to="/campaigns"
          fullWidth
          size="md"
          mt="md"
        >
          Explore Grants
        </Button>
      </Drawer>
    </Box>
  );
};

export default AppNavbar;
