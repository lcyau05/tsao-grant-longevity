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


// import { Button, Stack, Paper, Text, Title, MultiSelect, NumberInput, Radio, Slider } from '@mantine/core';

// const NgoForm = () => {
//   return (
//     <form>
//       <Stack spacing="xl">
//         <Paper padding="md" shadow="xs">
//           <Title order={4}>Organisation Profile</Title>
//           <Text size="sm">Tell us about your NGO to match suitable grants</Text>
//           {/* Organisation Size */}
//           <Radio.Group label="Organisation size" name="orgSize" required>
//             <Radio value="1-5" label="1–5 staff" />
//             <Radio value="6-20" label="6–20 staff" />
//             <Radio value="20+" label="20+ staff" />
//           </Radio.Group>
//           {/* MultiSelect for Issue Areas */}
//           <MultiSelect
//             label="Primary Issue Areas"
//             placeholder="Select issue areas"
//             data={['Elderly care','Dementia','Mental health','Caregivers','Active ageing','Low-income seniors']}
//           />
//           <MultiSelect
//             label="Beneficiary Groups"
//             placeholder="Select beneficiaries"
//             data={['Youth','Elderly','Caregivers']}
//           />
//         </Paper>

//         <Paper padding="md" shadow="xs">
//           <Title order={4}>Funding Reality</Title>
//           <Radio.Group label="Can you co-fund projects?" name="coFunding">
//             <Radio value="yes" label="Yes" />
//             <Radio value="no" label="No" />
//           </Radio.Group>
//           <NumberInput label="Preferred Grant Size (SGD)" min={0} />
//           <Slider label="Grants manageable concurrently" min={1} max={5} step={1} />
//         </Paper>

//         <Paper padding="md" shadow="xs">
//           <Title order={4}>Delivery Capacity</Title>
//           <NumberInput label="Typical number of beneficiaries" min={1} />
//           <Radio.Group label="Reporting comfort level">
//             <Radio value="low" label="Low" />
//             <Radio value="medium" label="Medium" />
//             <Radio value="high" label="High" />
//           </Radio.Group>
//         </Paper>

//         <Paper padding="md" shadow="xs">
//           <Title order={4}>Time Sensitivity</Title>
//           <Radio.Group label="Rolling or fixed-deadline grants?">
//             <Radio value="rolling" label="Rolling" />
//             <Radio value="fixed" label="Fixed" />
//           </Radio.Group>
//         </Paper>

//         <Button type="submit" size="lg">Find Matching Grants</Button>
//       </Stack>
//     </form>
//   );
// };

// export default NgoForm;
