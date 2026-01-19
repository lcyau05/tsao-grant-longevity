import {
    Box,
    Button,
    Card,
    Container,
    createStyles,
    Flex,
    Group,
    Paper,
    PaperProps,
    rem,
    SimpleGrid,
    Stack,
    Text,
    Title,
    TitleProps
} from "@mantine/core";
import {
    IconArrowDownRight,
    IconArrowUpRight,
    IconFunction,
    IconPlus,
    IconReceipt2,
    IconTrophy
} from "@tabler/icons-react";
import {CampaignsTable, DonatorsTable, YearlyDonationChart} from "../components";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    root: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
    },

    statCard: {
        padding: theme.spacing.lg,
        background: 'linear-gradient(135deg, rgba(227, 252, 237, 0.4) 0%, rgba(255, 255, 255, 0.6) 100%)',
        border: `1px solid ${theme.colors.gray[2]}`,
        borderRadius: theme.radius.md,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        
        '&:hover': {
            boxShadow: theme.shadows.md,
            borderColor: theme.colors.primary[5],
            transform: 'translateY(-2px)',
        }
    },

    value: {
        fontSize: rem(28),
        fontWeight: 800,
        lineHeight: 1,
        color: theme.colors.primary[7],
    },

    diff: {
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
    },

    icon: {
        color: theme.colors.primary[5],
    },

    title: {
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: rem(11),
        letterSpacing: '0.5px',
    },

    sectionTitle: {
        fontSize: rem(24),
        fontWeight: 800,
        marginBottom: theme.spacing.lg,
    }
}));

const DashboardPage = () => {
    const {classes} = useStyles();

    const paperProps: PaperProps = {
        p: "md",
        shadow: "sm"
    }

    const subTitleProps: TitleProps = {
        size: 18,
        mb: "sm"
    }

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Box bg="rgba(227, 252, 237, 0.3)">
                <Container fluid py="xl">
                    <Stack spacing="xl">
                        <Flex justify="space-between" align="center">
                            <div>
                                <Title className={classes.sectionTitle}>Dashboard</Title>
                                <Text color="dimmed">Welcome back! Here's your campaign overview</Text>
                            </div>
                            <Button component={Link} to="/campaigns/create" leftIcon={<IconPlus size={18}/>}>
                                New Campaign
                            </Button>
                        </Flex>
                        <SimpleGrid
                            cols={4}
                            breakpoints={[
                                {maxWidth: 'md', cols: 2, spacing: 'md'}, 
                                {maxWidth: 'sm', cols: 1, spacing: 'sm'}
                            ]}
                        >
                            <Paper className={classes.statCard}>
                                <Group position="apart" mb="md">
                                    <Text className={classes.title}>
                                        Total Donations
                                    </Text>
                                    <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5}/>
                                </Group>

                                <Group align="flex-end" spacing="xs">
                                    <Text className={classes.value}>$100,202</Text>
                                    <Text color={10 > 0 ? 'teal' : 'red'} fz="sm" fw={600} className={classes.diff}>
                                        <IconArrowUpRight size="1rem" stroke={2}/>
                                        <span>10%</span>
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt="sm">
                                    vs previous month
                                </Text>
                            </Paper>
                            <Paper className={classes.statCard}>
                                <Group position="apart" mb="md">
                                    <Text className={classes.title}>
                                        Today's Donations
                                    </Text>
                                    <IconReceipt2 className={classes.icon} size="1.4rem" stroke={1.5}/>
                                </Group>

                                <Group align="flex-end" spacing="xs">
                                    <Text className={classes.value}>$1,202</Text>
                                    <Text color={-3 > 0 ? 'teal' : 'red'} fz="sm" fw={600} className={classes.diff}>
                                        <IconArrowDownRight size="1rem" stroke={2}/>
                                        <span>30.1%</span>
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt="sm">
                                    vs yesterday
                                </Text>
                            </Paper>
                            <Paper className={classes.statCard}>
                                <Group position="apart" mb="md">
                                    <Text className={classes.title}>
                                        Active Campaigns
                                    </Text>
                                    <IconFunction className={classes.icon} size="1.4rem" stroke={1.5}/>
                                </Group>

                                <Group align="flex-end" spacing="xs">
                                    <Text className={classes.value}>12</Text>
                                    <Text color={10 > 0 ? 'teal' : 'red'} fz="sm" fw={600} className={classes.diff}>
                                        <IconArrowUpRight size="1rem" stroke={2}/>
                                        <span>5%</span>
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt="sm">
                                    in progress
                                </Text>
                            </Paper>
                            <Paper className={classes.statCard}>
                                <Group position="apart" mb="md">
                                    <Text className={classes.title}>
                                        Total Donors
                                    </Text>
                                    <IconTrophy className={classes.icon} size="1.4rem" stroke={1.5}/>
                                </Group>

                                <Group align="flex-end" spacing="xs">
                                    <Text className={classes.value}>1,245</Text>
                                    <Text color={8 > 0 ? 'teal' : 'red'} fz="sm" fw={600} className={classes.diff}>
                                        <IconArrowUpRight size="1rem" stroke={2}/>
                                        <span>8%</span>
                                    </Text>
                                </Group>

                                <Text fz="xs" c="dimmed" mt="sm">
                                    this month
                                </Text>
                            </Paper>
                        </SimpleGrid>

                        <SimpleGrid cols={2} spacing="lg" breakpoints={[{maxWidth: 'md', cols: 1}]}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section withBorder inheritPadding py="md">
                                    <Title order={4}>Campaign Performance</Title>
                                </Card.Section>
                                <Card.Section inheritPadding py="md">
                                    <YearlyDonationChart/>
                                </Card.Section>
                            </Card>

                            <Stack>
                                <Card shadow="sm" padding="lg" radius="md" withBorder>
                                    <Card.Section withBorder inheritPadding py="md">
                                        <Flex justify="space-between" align="center">
                                            <Title order={4}>Recent Campaigns</Title>
                                            <Text component={Link} to="/campaigns" size="sm" color="primary">View all</Text>
                                        </Flex>
                                    </Card.Section>
                                    <Card.Section inheritPadding py="md">
                                        <CampaignsTable/>
                                    </Card.Section>
                                </Card>
                            </Stack>
                        </SimpleGrid>

                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Card.Section withBorder inheritPadding py="md">
                                <Flex justify="space-between" align="center">
                                    <Title order={4}>Recent Donors</Title>
                                    <Text component={Link} to="#" size="sm" color="primary">View all</Text>
                                </Flex>
                            </Card.Section>
                            <Card.Section inheritPadding py="md">
                                <DonatorsTable/>
                            </Card.Section>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default DashboardPage;
