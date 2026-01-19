import {
  Badge,
  Card,
  createStyles,
  Flex,
  Group,
  PaperProps,
  Stack,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { IGrantCard } from "../types";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    padding: theme.spacing.lg,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.white,
    border: `1px solid ${theme.colors.gray[3]}`,

    "&:hover": {
      boxShadow: theme.shadows.md,
      borderColor: theme.colors.primary[6],
      transition: "all 150ms ease",
    },
  },

  title: {
    marginTop: theme.spacing.xs,
  },
}));

interface IProps extends PaperProps {
  data: IGrantCard;
}

const CampaignCard = ({ data }: IProps) => {
  const { classes } = useStyles();

  const {
    title,
    organisation,
    description,
    categories,
    amount,
    deadline,
    link,
  } = data;

  return (
    <Card
      radius="sm"
      component={Link}
      to={link}
      className={classes.card}
    >
      <Stack spacing="sm">
        {/* TITLE */}
        <Text className={classes.title} fw={600} size="lg" lineClamp={2}>
          {title}
        </Text>

        {/* AGENCY */}
        <Text size="sm" color="dimmed" fw={500}>
          {organisation}
        </Text>

        {/* CATEGORIES */}
        <Group spacing="xs">
          {categories.map((cat) => (
            <Badge key={cat} variant="light">
              {cat}
            </Badge>
          ))}
        </Group>

        {/* DESCRIPTION */}
        <Text size="sm" lineClamp={3}>
          {description}
        </Text>

        {/* FOOTER */}
        <Flex justify="space-between" mt="sm">
          <Text size="sm">
            <b>Funding:</b>{" "}
            {amount > 0 ? `$${amount.toLocaleString()}` : "Varies"}
          </Text>

          <Text size="sm" color="dimmed">
            {deadline}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
};

export default CampaignCard;
