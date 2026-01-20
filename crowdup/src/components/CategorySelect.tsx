import { forwardRef } from 'react';
import { Group, Select, Text, MultiSelect } from "@mantine/core";
import {
    IconAugmentedReality,
    IconCat,
    IconClipboardHeart,
    IconDeviceTv,
    IconFireHydrant,
    IconHeartHandshake,
    IconLeaf,
    IconReportMoney,
    IconSos
} from "@tabler/icons-react";

interface CategorySelectProps {
    label?: string;
    value: string[];
    onChange: (value: string[]) => void;
}

export const categories = [
    { value: "healthcare", label: "Healthcare & Wellbeing" },
    { value: "mental_health", label: "Mental Health" },
    { value: "ageing", label: "Ageing & Elderly Care" },
    { value: "disability", label: "Disability & Special Needs" },
    { value: "caregivers", label: "Caregivers Support" },

    { value: "community", label: "Community Development" },
    { value: "family", label: "Family & Children Services" },
    { value: "youth", label: "Youth Development" },
    { value: "low_income", label: "Low-Income & Financial Assistance" },

    { value: "education", label: "Education & Lifelong Learning" },
    { value: "employment", label: "Employment & Workforce Support" },

    { value: "social_innovation", label: "Social Innovation & Pilots" },
    { value: "digitalisation", label: "Digitalisation & Technology Adoption" },
    { value: "capacity_building", label: "Organisational Capacity Building" },
];

const CategorySelect = ({
    label = "Issue areas",
    value,
    onChange,
}: CategorySelectProps) => {
    return (
        <MultiSelect
            label={label}
            data={categories}
            value={value}
            onChange={onChange}
            searchable
            clearable
            placeholder="Select issue areas"
        />
    );
};

// const mockdata = [
//     {
//         icon: IconClipboardHeart,
//         title: 'Medical',
//     },
//     {
//         icon: IconSos,
//         title: 'Emergency',
//     },
//     {
//         icon: IconLeaf,
//         title: 'Environment',
//     },
//     {
//         icon: IconHeartHandshake,
//         title: 'Nonprofit',
//     },
//     {
//         icon: IconReportMoney,
//         title: 'Financial emergency',
//     },
//     {
//         icon: IconCat,
//         title: 'Animals',
//     },
//     {
//         icon: IconFireHydrant,
//         title: 'Crisis Relief',
//     },
//     {
//         icon: IconAugmentedReality,
//         title: 'Technology',
//     },
//     {
//         icon: IconDeviceTv,
//         title: 'Film & Videos',
//     },
// ];

// const CategorySelectItem = forwardRef<HTMLDivElement, any>(
//     ({title, ...others}: any, ref) => (
//         <div ref={ref} {...others}>
//             <Group noWrap>
//                 <others.icon size={18}/>

//                 <div>
//                     <Text size="sm">{title}</Text>
//                 </div>
//             </Group>
//         </div>
//     )
// );


// const CategorySelect = () => {
//     return (
//         <Select
//             label="Category"
//             itemComponent={CategorySelectItem}
//             data={mockdata.map(c => ({value: c.title, label: c.title, ...c}))}
//             searchable
//             clearable
//             maxDropdownHeight={300}
//             nothingFound="Nothing found"
//             filter={(value, item) =>
//                 item?.title?.toLowerCase().includes(value?.toLowerCase().trim())
//             }
//         />
//     );
// };

export default CategorySelect;
