import { Helmet } from "react-helmet";
import {
    ActionIcon,
    Alert,
    Anchor,
    Box,
    Button,
    Checkbox,
    Container,
    Flex,
    Group,
    NumberInput,
    Paper,
    PaperProps,
    Radio,
    SegmentedControl,
    Select,
    SimpleGrid,
    Stack,
    Stepper,
    Text,
    TextInput,
    Title,
    TitleProps,
    useMantineTheme, MultiSelect, Slider
} from "@mantine/core";
import { Link, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import React, { forwardRef, useState } from "react";
import { DateInput } from "@mantine/dates";
import {
    IconBrandApple,
    IconBrandFacebook,
    IconBrandGoogle,
    IconBrandLinkedin,
    IconBrandPaypal,
    IconBrandTwitter,
    IconBrandWhatsapp,
    IconBrandYoutube,
    IconCalendar,
    IconCheck,
    IconChevronLeft,
    IconChevronRight,
    IconCurrency,
    IconCurrencyDollar,
    IconInfoCircleFilled,
    IconLink,
    IconMail,
    IconPlus,
    IconTrash
} from "@tabler/icons-react";
import { CategorySelect, CountrySelect, CurrencySelect, FileDropzone } from "../components";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { GrantPreference } from "../types";
import { useNavigate } from "react-router-dom";

interface ISocialProps {
    icon: React.FC<any>;
    title: React.ReactNode;
}

const SocialSelectItem = forwardRef<HTMLDivElement, ISocialProps>(
    ({ title, icon: Icon, ...others }: ISocialProps, ref) => (
        <div ref={ref} {...others}>
            <Group noWrap>
                <Icon size={18} stroke={1.5} />
                <Text size="sm" transform="capitalize">{title}</Text>
            </Group>
        </div>
    )
);

const CreateCampaignPage = () => {
    const navigate = useNavigate();
    const theme = useMantineTheme()
    const [active, setActive] = useState(0);
    // const [target, setTarget] = useState('deadline');
    // const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
    // const [donationType, setDonationType] = useState('any');
    // const [minimumCheck, setMinimumCheck] = useState(false);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: '',
    });
    const [orgType, setOrgType] = useState<"individual" | "organisation">("organisation");
    const [primaryIssueAreas, setPrimaryIssueAreas] = useState<string[]>([]);
    const [workIssueAreas, setWorkIssueAreas] = useState<string[]>([]);
    const [kpis, setKpis] = useState<string[]>([]);
    const [minFunding, setMinFunding] = useState<number | undefined>(undefined);
    const [urgency, setUrgency] = useState<"urgent" | "flexible">("flexible");
    const [adminTolerance, setAdminTolerance] =
        useState<"low" | "medium" | "high">("medium");
    const [fundingType, setFundingType] =
        useState<"one_off" | "recurring" | "either">("either");

    const [followUpWillingness, setFollowUpWillingness] =
        useState<boolean>(true);
    const [beneficiaries, setBeneficiaries] = useState<string[]>([]);



    const buildPreference = (): GrantPreference => {
        return {
            issueAreas: primaryIssueAreas, // 🔁 mapping
            workIssueAreas,
            minFunding,
            urgency,
            kpis,
            adminTolerance,
            followUpWillingness,
            fundingType,
        };
    };



    const socialForm = useForm({
        initialValues: {
            employees: [{ name: '', active: false, key: randomId() }],
        },
    });

    const nextStep = () => setActive((current: number) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current: number) => (current > 0 ? current - 1 : current));

    const socialFields = socialForm.values.employees.map((item, index) => (
        <Group key={item.key} mt="xs">
            <Select
                aria-label="social"
                data={
                    [
                        { title: 'Facebook', icon: IconBrandFacebook },
                        { title: 'Whatsapp', icon: IconBrandWhatsapp },
                        { title: 'LinkedIn', icon: IconBrandLinkedin },
                        { title: 'Twitter', icon: IconBrandTwitter },
                        { title: 'Youtube', icon: IconBrandYoutube },
                        { title: 'Other links', icon: IconLink },
                    ].map(c => ({ value: c.title, label: c.title, ...c }))}
                itemComponent={SocialSelectItem}
            />
            <TextInput
                placeholder="https://"
                sx={{ flex: 1 }}
                {...socialForm.getInputProps(`employees.${index}.name`)}
            />
            <ActionIcon color="red" onClick={() => socialForm.removeListItem('employees', index)}>
                <IconTrash size="1rem" />
            </ActionIcon>
        </Group>
    ));

    const titleProps: TitleProps = {
        size: 24,
        mb: "md"
    }

    const subTitleProps: TitleProps = {
        size: 18,
        mb: "sm"
    }

    const paperProps: PaperProps = {
        p: "md",
        withBorder: false,
        shadow: 'sm',
        mb: "md",
        sx: { backgroundColor: theme.white }
    }

    return (
        <>
            <Helmet>
                <title>Create campaign</title>
            </Helmet>
            <Box>
                <Container my={36}>
                    <Title mb="xl" align="center">Grant matching preferences</Title>
                    <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                        <Stepper.Step
                            label="Grant preferences"
                            description="Tell us what kind of grants you are looking for"
                        >
                            {/* <Title {...titleProps}>Grant matching preferences</Title> */}

                            <Paper {...paperProps}>
                                <Stack spacing="md">

                                    {/* Organisation type */}
                                    <Radio.Group
                                        label="I am applying as"
                                        value={orgType}
                                        onChange={(value) =>
                                            setOrgType(value as "individual" | "organisation")}
                                    >
                                        <Group>
                                            <Radio value="individual" label="Individual" />
                                            <Radio value="organisation" label="Organisation / Non-profit" />
                                        </Group>
                                    </Radio.Group>

                                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                                        <MultiSelect
                                            label="Primary Issue Areas"
                                            placeholder="Select areas"
                                            data={["Community development",
                                                "Youth development",
                                                "Education & learning",
                                                "Health & wellbeing",
                                                "Care & support services"]}
                                            value={primaryIssueAreas}
                                            onChange={setPrimaryIssueAreas}
                                            searchable
                                        />
                                        <MultiSelect
                                            label="Beneficiary Groups"
                                            placeholder="Select groups"
                                            data={["Youth",
                                                "Families",
                                                "Elderly",
                                                "Caregivers",
                                                "General community",]}
                                            value={beneficiaries}
                                            onChange={setBeneficiaries}
                                            searchable
                                        />
                                    </SimpleGrid>

                                    {/* Issue areas */}
                                    <CategorySelect
                                        label="Issue areas you work in"
                                        value={workIssueAreas}
                                        onChange={setWorkIssueAreas}
                                    />

                                    {/* KPIs / outcomes */}
                                    <Checkbox.Group
                                        label="Primary outcomes you aim to achieve"
                                        value={kpis}
                                        onChange={setKpis}
                                    >
                                        <Stack>
                                            <Checkbox value="youth_outreach" label="Youth outreach" />
                                            <Checkbox value="community_engagement" label="Community engagement" />
                                            <Checkbox value="health_outcomes" label="Health & wellbeing" />
                                            <Checkbox value="education_outcomes" label="Education & learning" />
                                            <Checkbox value="volunteer_engagement" label="Volunteer engagement" />
                                        </Stack>
                                    </Checkbox.Group>

                                    {/* Funding */}
                                    <NumberInput
                                        label="Minimum funding required (SGD)"
                                        value={minFunding ?? ""}
                                        onChange={(value) =>
                                            setMinFunding(value === "" ? undefined : value)
                                        }
                                        icon={<IconCurrencyDollar size={18} />}
                                        min={0}
                                    />

                                    <Radio.Group
                                        label="What type of funding best supports your work?"
                                        value={fundingType}
                                        onChange={(v) =>
                                            setFundingType(v as "one_off" | "recurring" | "either")
                                        }
                                    >
                                        <Stack>
                                            <Radio value="one_off" label="One-off project funding" />
                                            <Radio value="recurring" label="Recurring / long-term funding" />
                                            <Radio value="either" label="Either is fine" />
                                        </Stack>
                                    </Radio.Group>

                                    {/* Urgency */}
                                    <Radio.Group
                                        label="How urgent is the funding?"
                                        value={urgency}
                                        onChange={(value) =>
                                            setUrgency(value as "urgent" | "flexible")}
                                    >
                                        <Stack>
                                            <Radio value="urgent" label="Urgent (rolling / open grants preferred)" />
                                            <Radio value="flexible" label="Flexible timeline" />
                                        </Stack>
                                    </Radio.Group>

                                    <Radio.Group
                                        label="How much administrative work can you realistically handle?"
                                        value={adminTolerance}
                                        onChange={(v) => setAdminTolerance(v as any)}
                                    >
                                        <Stack>
                                            <Radio value="low" label="Low – short forms, minimal reporting" />
                                            <Radio value="medium" label="Moderate – some reporting is fine" />
                                            <Radio value="high" label="High – audits, KPIs, detailed proposals are okay" />
                                        </Stack>
                                    </Radio.Group>
                                    <Checkbox
                                        checked={followUpWillingness}
                                        onChange={(e) =>
                                            setFollowUpWillingness(e.currentTarget.checked)
                                        }
                                        label="I am willing to submit reports or follow-up documents after the project"
                                    />

                                </Stack>
                            </Paper>
                        </Stepper.Step>
                        <Stepper.Completed>
                            <Title {...titleProps} align="center" my="xl">Completed, take a seat while we finish setting
                                up things for you</Title>
                        </Stepper.Completed>
                    </Stepper>

                    <Group position="center" mt="xl">
                        <Button
                            onClick={() => {
                                const pref = buildPreference();
                                navigate("/recommendations", { state: pref });
                            }}
                        >
                            Find matching grants
                        </Button>

                    </Group>
                </Container>
            </Box>
        </>
    );
};

export default CreateCampaignPage;
