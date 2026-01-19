import {
    Box,
    BoxProps,
    Container,
    Flex,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
    Title,
    TitleProps,
} from "@mantine/core";
import { CampaignCard } from "../components";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { IGrant } from "../types";

const CampaignsPage = (): JSX.Element => {
    const matchesMobile = useMediaQuery("(max-width: 768px)");

    // ✅ STATE MUST BE INSIDE COMPONENT
    const [grants, setGrants] = useState<IGrant[]>([]);
    const [loading, setLoading] = useState(true);

    // ✅ EFFECT MUST BE INSIDE COMPONENT
    useEffect(() => {
        fetch("http://localhost:8081/grants") // adjust port if needed
            .then((res) => res.json())
            .then((data) => {
                setGrants(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch grants", err);
                setLoading(false);
            });
    }, []);

    const boxProps: BoxProps = {
        mt: matchesMobile ? 4 : 24,
        mb: matchesMobile ? 4 : 48,
        py: matchesMobile ? 16 : 24,
    };

    const titleProps: TitleProps = {
        size: 32,
        weight: 700,
        mb: "lg",
        transform: "capitalize",
        sx: { lineHeight: "40px" },
    };

    // ✅ MAP GRANTS → CARDS
    const items = grants.map((grant, idx) => (
        <CampaignCard
            key={idx}
            data={{
                title: grant.title,
                organisation: grant.agency,
                description: grant.info.about,
                amount: grant.fundingCap ?? 0,
                categories: grant.categories,
                deadline:
                    grant.info.whenToApply.applicationType === "open_all_year"
                        ? "Open all year"
                        : grant.info.whenToApply.applicationType === "relative"
                            ? `Apply ${grant.info.whenToApply.relative?.amount} months before start`
                            : "Check details",
                link: grant.url,
            }}
        />
    ));

    return (
        <>
            <Helmet>
                <title>Discover grants</title>
            </Helmet>

            <Box>
                <Container size="lg">
                    <Stack>
                        <Box {...boxProps}>
                            <Title {...titleProps} align="center">
                                Discover grants relevant to your organisation
                            </Title>
                        </Box>

                        <Flex
                            justify="space-between"
                            gap={{ base: "sm", sm: "lg" }}
                            direction={{ base: "column-reverse", sm: "row" }}
                        >
                            <TextInput placeholder="Search grants..." sx={{ width: 500 }} />

                            <Flex
                                align="center"
                                gap="sm"
                                justify={{ base: "space-between", sm: "flex-start" }}
                            >
                                <Select
                                    placeholder="Show"
                                    data={[
                                        { value: "10", label: "show: 10" },
                                        { value: "25", label: "show: 25" },
                                        { value: "50", label: "show: 50" },
                                        { value: "100", label: "show: 100" },
                                    ]}
                                />

                                <Select
                                    placeholder="Sort"
                                    data={[
                                        { value: "featured", label: "sort by: featured" },
                                        { value: "popular", label: "sort by: popular" },
                                        { value: "latest", label: "sort by: latest" },
                                    ]}
                                />
                            </Flex>
                        </Flex>

                        {/* ✅ STEP 5: LOADING HANDLING */}
                        {loading && (
                            <Title align="center" size="md">
                                Loading grants…
                            </Title>
                        )}

                        {!loading && (
                            <SimpleGrid
                                cols={3}
                                spacing="lg"
                                breakpoints={[
                                    { maxWidth: "md", cols: 2, spacing: "md" },
                                    { maxWidth: "sm", cols: 1, spacing: 0 },
                                ]}
                            >
                                {items}
                            </SimpleGrid>
                        )}
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default CampaignsPage;
