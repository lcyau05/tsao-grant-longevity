import {createStyles, Divider, Grid, Group, Image, Paper, PaperProps, rem, Stack, Text,} from '@mantine/core';
import {ITestimonial} from "../types";
import {useMediaQuery} from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    card: {
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(227, 252, 237, 0.2) 0%, rgba(255, 255, 255, 0.8) 100%)',
        border: `1px solid ${theme.colors.gray[2]}`,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        
        '&:hover': {
            boxShadow: theme.shadows.md,
            borderColor: theme.colors.primary[5],
        }
    },

    rating: {
        position: 'absolute',
        top: theme.spacing.xs,
        right: rem(12),
        pointerEvents: 'none',
    },

    title: {
        marginTop: theme.spacing.md,
        marginBottom: rem(5),
    },

    action: {
        backgroundColor: theme.colors.primary[0],
        transition: 'all 200ms ease',
        ...theme.fn.hover({
            backgroundColor: theme.colors.primary[1],
        }),
    },

    footer: {
        marginTop: theme.spacing.md,
    },
}));

interface IProps extends PaperProps {
    data: ITestimonial
}

const CampaignCard = ({data, ...others}: IProps) => {
    const {classes} = useStyles();
    const {
        company, createdByImage, createdBy, testimonial, jobPosition
    } = data;
    const matchesMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Paper radius="md" className={classes.card} mx={36} {...others}>
            <Grid sx={{alignItems: 'center'}}>
                {matchesMobile && <Grid.Col lg={5}>
                    <Image src={createdByImage} height={360} fit="cover"/>
                </Grid.Col>}
                <Grid.Col lg={7} pl={matchesMobile ? 'xl' : 'xl'} pb="xl">
                    <Stack spacing="md">
                        <Text size="xl" fw={500} fs="italic">"{testimonial}"</Text>
                        <Text fw={700} size="lg">{createdBy}</Text>
                        <Group spacing="sm">
                            <Text size="sm" color="dimmed" fw={500}>{jobPosition}</Text>
                            <Divider orientation="vertical"/>
                            <Text size="sm" color="primary" fw={600}>{company}</Text>
                        </Group>
                    </Stack>
                </Grid.Col>
                {!matchesMobile && <Grid.Col lg={5}>
                    <Image src={createdByImage} height={320} fit="cover"/>
                </Grid.Col>}
            </Grid>
        </Paper>
    );
};

export default CampaignCard;
