import { Sparkles, Crown, Rocket } from "lucide-react"; 
import { PlansConfig } from "../types/billing.types";

export const PLANS: PlansConfig = { 
  free: {
    price: 0,
    popular: false,
    description:
      "Perfect for experimenting and testing ideas.",
    icon: Sparkles,
    limits: {
      configurators: 5,
      uploadMb: 10,
    },
    featuresDescription: [
      "Up to 5 configurators",
      "10MB/item upload limit",
      "Watermarked embeds",
      "Basic customization",
    ],
    features: {
      watermark: true,
      canvasEditor: false,
      prioritySupport: false,
      apiAccess: false,
      teamAccess: false,
      analytics: false,
    },
  },

  pro: {
    price: 49,
    popular: true,
    description:
      "Best for creators, freelancers, and small studios.",
    icon: Crown,
    limits: {
      configurators: 25,
      uploadMb: 30,
    },
    featuresDescription: [
      "Up to 25 configurators",
      "30MB/item upload limit",
      "Canvas customization",
      "No watermark",
    ],
    features: {
      watermark: false,
      canvasEditor: true,
      prioritySupport: false,
      apiAccess: false,
      teamAccess: false,
      analytics: false,
    },
  },

  business: {
    price: 149,
    popular: false,
    description:
      "Advanced tools for teams and growing brands.",
    icon: Rocket,
    limits: {
      configurators: null, // unlimited
      uploadMb: 100,
    },
    featuresDescription: [
      "Unlimited configurators",
      "100MB/item upload limit",
      "Team access",
      "Advanced analytics",
      "API access",
      "Premium support",
    ],
    features: {
      watermark: false,
      canvasEditor: true,
      prioritySupport: true,
      apiAccess: true,
      teamAccess: true,
      analytics: true,
    },
  },
} as const;
