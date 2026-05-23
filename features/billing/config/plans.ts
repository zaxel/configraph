export const PLANS = {
  free: {
    limits: {
      configurators: 5,
      uploadMb: 10,
    },

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
    limits: {
      configurators: 25,
      uploadMb: 50,
    },

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
    limits: {
      configurators: null, // unlimited
      uploadMb: 100,
    },

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