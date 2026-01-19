import {
    Badge,
    Box,
    Card,
    createStyles,
    Flex,
    getStylesRef,
    Group,
    Image,
    PaperProps,
    Progress,
    Stack,
    Text,
} from '@mantine/core';
import {ICampaign} from "../types";
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        padding: 0,
        overflow: 'hidden',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        border: `1px solid ${theme.colors.gray[2]}`,
        cursor: 'pointer',

        [`&:hover .${getStylesRef('image')}`]: {
            transform: 'scale(1.05)',
        },

        '&:hover': {
            boxShadow: theme.shadows.lg,
            borderColor: theme.colors.primary[5],
            transform: 'translateY(-4px)',
        }
    },

    imageWrapper: {
        position: 'relative',
        overflow: 'hidden',
        height: 240,
    },

    title: {
        marginTop: theme.spacing.sm,
        fontWeight: 700,
        fontSize: 16,
    },

    image: {
        ref: getStylesRef('image'),
        transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    content: {
        padding: theme.spacing.lg,
    },

    badge: {
        fontWeight: 600,
        fontSize: 11,
    },

    meta: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.md,
        paddingTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
    },

    stat: {
        textAlign: 'center',
        fontSize: 12,
        
        '& b': {
            display: 'block',
            fontSize: 18,
            fontWeight: 700,
            color: theme.colors.primary[6],
        }
    }
}));

interface IProps extends PaperProps {
    data: ICampaign
    showActions?: boolean
}

const CampaignCard = ({data, showActions}: IProps) => {
    const {classes} = useStyles();
    const {
        mainImage,
        id,
        title,
        amountRaised,
        daysLeft,
        contributors,
        description,
        category,
        country
    } = data;
    const linkProps = {to: `/campaigns/${id}`, rel: 'noopener noreferrer'};

    return (
        <Card radius="md" shadow="sm" className={classes.card} component={Link} {...linkProps}>
            <Card.Section className={classes.imageWrapper}>
                <Image src={mainImage} className={classes.image}/>
            </Card.Section>

            <Stack p={0} className={classes.content}>
                <Text className={classes.title} lineClamp={2} fw={700} size="md">
                    {title}
                </Text>

                <Group position="apart" spacing="xs">
                    <Text size="xs" transform="uppercase" color="dimmed" fw={700}>{country}</Text>
                    <Badge size="xs" variant="light" color="secondary" className={classes.badge}>{category}</Badge>
                </Group>

                {showActions && <Text lineClamp={2} size="sm" color="dimmed">{description}</Text>}

                <Box mt="sm">
                    <Progress value={daysLeft} radius="sm" size="md" color="primary"/>
                    <Text size="xs" color="dimmed" mt="xs">{daysLeft} days left</Text>
                </Box>

                <Flex justify="space-between" className={classes.meta}>
                    <Flex direction="column" align="center" className={classes.stat}>
                        <Text size="xs" color="dimmed">Raised</Text>
                        <Text fw={700}>{amountRaised}</Text>
                    </Flex>
                    <Flex direction="column" align="center" className={classes.stat}>
                        <Text size="xs" color="dimmed">Donors</Text>
                        <Text fw={700}>{contributors}</Text>
                    </Flex>
                </Flex>
            </Stack>
        </Card>
    );
};

export default CampaignCard;
