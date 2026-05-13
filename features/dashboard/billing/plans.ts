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