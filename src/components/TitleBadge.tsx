import {createStyles, Text, TextProps} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    badge: {
        width: "fit-content",
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.xl,
        background: `linear-gradient(135deg, ${theme.colors.secondary[1]} 0%, ${theme.colors.secondary[2]} 100%)`,
        color: theme.colors.secondary[9],
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: 11,
        letterSpacing: '0.5px',
        lineHeight: '14px',
        boxShadow: `0 2px 8px rgba(202, 150, 78, 0.15)`,
        transition: 'all 200ms ease',
        
        '&:hover': {
            boxShadow: `0 4px 12px rgba(202, 150, 78, 0.25)`,
            transform: 'translateY(-1px)',
        }
    }
}));

interface IProps extends TextProps {
    title: string
}

const TitleBadge = ({title}: IProps) => {
    const {classes} = useStyles();

    return (
        <Text className={classes.badge} mb="lg">{title}</Text>
    );
};

export default TitleBadge;
