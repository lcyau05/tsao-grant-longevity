import HeroSection from "../sections/Home/Hero.tsx";
import {Box, BoxProps, Container, Text, TextProps, Title, TitleProps} from "@mantine/core";
// import {TitleBadge} from "../components";
// import FeaturesSection from "../sections/Home/Features.tsx";
// import StatsSection from "../sections/Home/Stats";
// import JoinUsSection from "../sections/Home/JoinUs";
// import WaysToFundSection from "../sections/Home/WaysToFund";
// import CampaignsSection from "../sections/Home/Campaigns";
// import GetStartedSection from "../sections/Home/GetStarted";
// import TestimonialsSection from "../sections/Home/Testimonials";
import {Helmet} from "react-helmet";

const HomePage = (): JSX.Element => {

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Box>
                <HeroSection/>
            </Box>
        </>
    );
};

export default HomePage;
