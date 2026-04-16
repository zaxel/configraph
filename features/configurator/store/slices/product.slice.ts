export const product = {
  id: "nike-basic",
  quantity: 1,

  model: {
    url: "/models/nike3.glb",
  },

  pricing: {
    basePrice: 100.0,
    currency: "USD",
    order: 1,
  },

  modules: [
    {
      id: "content-01",
      order: 0,
      displayType: "all",

      components: [
        {
          id: 222,
          type: "content",
          order: 0,
          content: {
            value: "Nike Jordan 3",
            textType: "heading1"
          }
        }
      ],
    },
    {
      id: "materials",
      order: 2,
      displayType: "select",

      components: [
        {
          id: 223,
          type: "material",
          meshGroup: "sole",
          mesh: "sole",
          material: {
            key: "rubber",
            label: "rubber",
            img: null,
          },
          colors: {
            allowCustom: false,
            variants: [
              { value: "black", label: "black", price: 0 },
              { value: "blue", label: "blue", price: 0 },
              { value: "white", label: "white", price: 0 },
              { value: "nova wave", label: "nova wave", price: 1.0 },
            ]
          },
        },

        {
          id: 224,
          type: "material",
          mesh: "laces_fabric",
          meshGroup: "laces",
          material: {
            key: "fabric",
            label: "fabric",
            img: "/textures/laces-fabric.jpg",
          },
          colors: {
            allowCustom: true,
            variants: null,
          },

        },
        {
          id: 225,
          type: "material",
          mesh: "laces_leather",
          meshGroup: "laces",
          material: {
            key: "leather",
            label: "leather",
            img: "/textures/laces-leather.jpg",
          },
          colors: {
            allowCustom: false,
            variants: [
              { value: "black", label: "black", price: 0 },
              { value: "brown", label: "brown", price: 0 },
            ]
          },
        },
        {
          id: 226,
          type: "material",
          mesh: "wapm",
          meshGroup: "wapm",
          material: {
            key: "wamp",
            label: "fabric",
            img: null,
          },
          colors: {
            allowCustom: false,
            variants: [
              { value: "black", label: "black", price: 0 },
              { value: "blue", label: "blue", price: 0 },
              { value: "white", label: "white", price: 0 },
              { value: "red", label: "white", price: 0 },
            ]
          },
        },
      ],
    },

    {
      id: "size",
      order: 3,
      displayType: "all",

      components: [
        {
          id: 228,
          type: "size",
          options: [
            {
              label: "M",
              price: 0,
            },
            {
              label: "S",
              price: 0,
            },
            {
              label: "L",
              price: 0,
            },
            {
              label: "XL",
              price: 0,
            },
          ]
        }
      ],
    },
    {
      id: "content-02",
      order: 4,
      displayType: "all",

      components: [
        {
          id: 238,
          type: "content",
          order: 0,
          content: {
            value: "Product Info",
            textType: "heading2"
          }
        },
        {
          id: 239,
          type: "content",
          order: 1,
          content: {
            value: "I'm a great place to add more information about your product, such as sizing, material, care, and cleaning instructions. This is also a great space to highlight what makes this product special and how your customers can benefit from this item.",
            textType: "text-sm"
          }
        },
        {
          id: 240,
          type: "content",
          order: 2,
          content: {
            value: "Return & Refund Policy",
            textType: "heading2"
          }
        },
        {
          id: 241,
          type: "content",
          order: 3,
          content: {
            value: "I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase.Easy Returns &amp; ExchangesHassle-Free ProcessBuilds Customer ConfidenceHaving a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
            textType: "text-sm"
          }
        },
      ],
    },
  ],
};

export const createProductSlice = (set) => ({
  product: product,

  setProduct: (product) =>
    set({ product }),
});