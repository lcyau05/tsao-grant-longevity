import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Stack, Title, Text } from "@mantine/core";
import { IGrant } from "../types";
import { GrantPreference } from "../types";
import { recommendGrants } from "../utils/recommendGrants";
import CampaignCard from "../components/CampaignCard";

const GrantRecommendationsPage = () => {
  const location = useLocation();
  const preference = location.state as GrantPreference;

  const [grants, setGrants] = useState<IGrant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8081/grants")
      .then(res => res.json())
      .then(data => {
        setGrants(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text align="center">Loading recommendations…</Text>;
  }

  const recommendations = recommendGrants(grants, preference);

  return (
    <Container>
      <Title mb="md">Recommended grants for you</Title>

      {recommendations.length === 0 && (
        <Text>No suitable grants found. Try adjusting your preferences.</Text>
      )}

      <Stack>
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
                rec.grant.info.whenToApply.applicationType === "open_all_year"
                  ? "Open all year"
                  : "Deadline-based",
              link: rec.grant.url,
            }}
          />
        ))}
      </Stack>
    </Container>
  );
};

export default GrantRecommendationsPage;
