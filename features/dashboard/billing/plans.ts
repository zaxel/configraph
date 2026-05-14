import {
  Sparkles,
  Crown,
  Rocket,
} from "lucide-react";

export const PLANS = {
  FREE: {
    maxConfigurators: 5,
    maxUploadMb: 5,
    canvas: false,
    watermark: true,
    team_access: false, 
    analytics: false,
    API: false,
    premium_support: false,
},

  PRO: {
    maxConfigurators: 25,
    maxUploadMb: 50,
    canvas: true,
    watermark: false,
    team_access: false, 
    analytics: false,
    API: false,
    premium_support: false,
  },

  BUSINESS: {
    maxConfigurators: 1_000_000,
    maxUploadMb: 100,
    canvas: true,
    watermark: false,
    team_access: true, 
    analytics: true,
    API: true,
    premium_support: true,
  },
};


export const plans = [
  {
    name: "Free",
    price: "$0",
    description:
      "Perfect for experimenting and testing ideas.",
    icon: Sparkles,
    current: true,

    features: [
      "Up to 5 configurators",
      "5MB upload limit",
      "Watermarked embeds",
      "Basic customization",
    ],
  },

  {
    name: "Pro",
    price: "$49",
    description:
      "Best for creators, freelancers, and small studios.",
    icon: Crown,
    popular: true,

    features: [
      "Up to 25 configurators",
      "50MB upload limit",
      "Canvas customization",
      "No watermark",
      "Priority rendering",
    ],
  },

  {
    name: "Business",
    price: "$149",
    description:
      "Advanced tools for teams and growing brands.",
    icon: Rocket,

    features: [
      "Unlimited configurators",
      "100MB upload limit",
      "Team access",
      "Advanced analytics",
      "API access",
      "Premium support",
    ],
  },
];