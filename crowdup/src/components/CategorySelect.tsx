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

const categories = [
    { value: "medical", label: "Medical" },
    { value: "emergency", label: "Emergency" },
    { value: "environment", label: "Environment" },
    { value: "nonprofit", label: "Non-profit" },
    { value: "financial", label: "Financial emergency" },
    { value: "animals", label: "Animals" },
    { value: "crisis", label: "Crisis relief" },
    { value: "technology", label: "Technology" },
    { value: "media", label: "Film & videos" },
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
