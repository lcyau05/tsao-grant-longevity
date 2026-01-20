import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppShell,
  Header,
  Container,
  Stack,
  Title,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { IconHome, IconAdjustments } from "@tabler/icons-react";

import { IGrant, GrantPreference } from "../types";
import { recommendGrants } from "../utils/recommendGrants";
import CampaignCard from "../components/CampaignCard";

const GrantRecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const preference = location.state as GrantPreference;

  const [grants, setGrants] = useState<IGrant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/grants")
      .then((res) => res.json())
      .then((data) => {
        setGrants(data);
        setLoading(false);
      });
  }, []);

  const recommendations = !loading
    ? recommendGrants(grants, preference)
    : [];

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: "100%" }}>
            {/* Left: Brand */}
            <Title order={4}>
              <Text component="span" color="rgb(39, 138, 65)" inherit>
                Find
              </Text>
              <Text component="span" color="black" inherit>
                Grant
              </Text>
            </Title>
            {/* Right: Actions */}
            <Group>
              <Button
                variant="subtle"
                leftIcon={<IconHome size={16} />}
                onClick={() => navigate("/")}
              >
                Home
              </Button>

              <Button
                variant="light"
                leftIcon={<IconAdjustments size={16} />}
                onClick={() => navigate("/create-campaign")}
              >
                Refine preferences
              </Button>
            </Group>
          </Group>
        </Header>
      }
    >
      <Container size="md">
        {loading ? (
          <Text align="center">Loading recommendations…</Text>
        ) : (
          <>
            <Title mb="xs">Recommended grants for you</Title>
            <Text color="dimmed" mb="lg">
              Based on your organisation’s focus, capacity, and funding needs
            </Text>

            {recommendations.length === 0 ? (
              <Text>
                No suitable grants found. Try adjusting your preferences.
              </Text>
            ) : (
              <Stack spacing="md">
                {recommendations.slice(0, 10).map((rec, idx) => (
                  <CampaignCard
                    key={idx}
                    data={{
                      title: rec.grant.title,
                      organisation: rec.grant.agency,
                      description: rec.grant.info.about,
                      categories: rec.grant.categories,
                      amount: rec.grant.fundingCap ?? 0,
                      deadline:
                        rec.grant.info.whenToApply.applicationType ===
                          "open_all_year"
                          ? "Open all year"
                          : "Deadline-based",
                      link: rec.grant.url,
                    }}
                  />
                ))}
              </Stack>
            )}
          </>
        )}
      </Container>
    </AppShell>
  );
};

export default GrantRecommendationsPage;
