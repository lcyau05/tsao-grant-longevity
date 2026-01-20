// export interface ICampaign {
//     id: string
//     title: string
//     description: string
//     createdAt: string
//     mainImage: string
//     createdBy: string
//     daysLeft: number
//     amountRaised: string
//     goal: string
//     contributors: number
//     createdByImage: string
//     category: string
//     country: string
//     type: string | null
// }

export interface ITestimonial {
    id: string
    testimonial: string
    createdBy: string
    createdByImage: string
    company: string
    jobPosition: string
}

export interface ICountry {
    name: string
    code: string
    emoji: string
    unicode: string
    image: string
}

export interface ICurrency {
    cc: string
    symbol: string
    name: string
}

export interface IGrant {
    url: string;
    agency: string;
    title: string;
    status: string;
    funding: string;
    beneficiaries?: string[];           // e.g. ["Youth", "Caregivers"]
    fundingCap?: number;
    categories: string[];
    kpis: string[];
    adminLoad: "low" | "medium" | "high"; // ✅ ADD
    info: {
        about: string;
        whoCanApply: string;
        whenToApply: {
            applicationType: string;
            rawText: string;
            relative?: {
                amount: number;
                unit: string;
                reference: string;
            };
        };
        howToApply?: string;
    };
}

export interface IGrantCard {
    title: string;
    organisation: string;
    description: string;
    categories: string[];
    amount: number;
    deadline: string;
    link: string;
}

export interface GrantPreference {
    issueAreas: string[];              // e.g. ["Youth", "Care"]
    // outcomes: string[];
    workIssueAreas: string[];   
    beneficiaries?: string[];           // e.g. ["Youth", "Caregivers"]
    minFunding?: number;               // e.g. 20000
    urgency: "urgent" | "flexible";    // derived from deadline input
    kpis: string[];                    // e.g. ["youth_outreach"]
    fundingType: "one_off" | "recurring" | "either";
    adminTolerance: "low" | "medium" | "high";
    followUpWillingness: boolean;
}

export interface GrantRecommendation {
    grant: IGrant;
    beneficiaries?: string[];           // e.g. ["Youth", "Caregivers"]
    score: number;
    reasons: string[];
}