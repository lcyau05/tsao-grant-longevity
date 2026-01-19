import {Box, BoxProps, Container, Flex, Select, SimpleGrid, Stack, Text, TextInput, Title, TitleProps} from "@mantine/core";
import campaignsData from "../data/Campaigns.json";
import {CampaignCard} from "../components";
import {Helmet} from "react-helmet";
import {useMediaQuery} from "@mantine/hooks";

const CampaignsPage = (): JSX.Element => {
    const matchesMobile = useMediaQuery('(max-width: 768px)');

    const boxProps: BoxProps = {
        mt: matchesMobile ? 32 : 48,
        mb: matchesMobile ? 32 : 64,
        py: matchesMobile ? 24 : 32
    }

    const titleProps: TitleProps = {
        size: 40,
        weight: 800,
        mb: "lg",
        transform: 'capitalize',
        sx: {lineHeight: '48px'}
    }

    const items = campaignsData.data.map(c => (<CampaignCard key={c.id} data={c} showActions={true}/>))

    return (
        <>
            <Helmet>
                <title>Discover campaigns to fund</title>
            </Helmet>
            <Box bg="rgba(227, 252, 237, 0.5)">
                <Container size="lg">
                    <Stack spacing="xl" py="xl">
                        <Box {...boxProps}>
                            <Title {...titleProps} align="center">Discover Campaigns to Fund</Title>
                            <Text align="center" size="lg" color="dimmed">
                                Support meaningful projects and make an impact on causes you care about
                            </Text>
                        </Box>
                        <Flex
                            justify="space-between"
                            gap={{base: 'sm', sm: 'lg'}}
                            direction={{base: 'column-reverse', sm: 'row'}}
                            align={{base: 'stretch', sm: 'center'}}
                        >
                            <TextInput 
                                placeholder="Search campaigns..." 
                                icon={<span>🔍</span>}
                                sx={{flex: 1, maxWidth: {sm: 500}}}
                                size="md"
                            />
                            <Flex align="center" gap="md" justify={{base: 'space-between', sm: 'flex-start'}}>
                                <Select
                                    label=""
                                    placeholder="Show"
                                    defaultValue="25"
                                    data={[
                                        {value: '10', label: '10 per page'},
                                        {value: '25', label: '25 per page'},
                                        {value: '50', label: '50 per page'},
                                        {value: '100', label: '100 per page'},
                                    ]}
                                    size="md"
                                />
                                <Select
                                    label=""
                                    placeholder="Sort by"
                                    defaultValue="featured"
                                    data={[
                                        {value: 'featured', label: 'Featured'},
                                        {value: 'popular', label: 'Most Popular'},
                                        {value: 'latest', label: 'Latest'},
                                        {value: 'ending-soon', label: 'Ending Soon'},
                                    ]}
                                    size="md"
                                />
                            </Flex>
                        </Flex>
                        <SimpleGrid
                            cols={3}
                            spacing="lg"
                            breakpoints={[
                                {maxWidth: 'md', cols: 2, spacing: 'md'},
                                {maxWidth: 'sm', cols: 1, spacing: 'sm'},
                            ]}
                        >
                            {items}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default CampaignsPage;



