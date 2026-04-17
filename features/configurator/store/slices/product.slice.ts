import { Product } from "../../model";

export const product: Product = {
  id: "nike-basic",
  quantity: 1,

  model: {
    url: "/models/nike4.glb",
  },

  modules: [
    {
      id: "prices-01",
      displayType: "all",
      order: 1,
      components: [
        {
          id: 102,
          type: "price",
          pricing: {
            basePrice: "100.00",
            oldPrice: "115.00",
            currency: "USD",
            order: 1,
          },
        }
      ],
    },
    {
      id: "content-01",
      order: 0,
      displayType: "all",

      components: [
        {
          id: 222,
          type: "content",
          content: {
            value: "Nike Jordan 3",
            textType: "heading1"
          }
        },
        {
          id: 201,
          type: "content",
          content: {
            value: "A comfortable, everyday T-shirt made from soft, breathable cotton, designed with a classic fit and clean lines for effortless wear.",
            textType: "text-md-gray"
          }
        },
      ],
    },
    {
      id: "materials",
      order: 2,
      displayType: "select",


      default: {
        sole: {
          componentId: 223,
          colorIndex: 0
        },
        laces: {
          componentId: 224,
          colorIndex: null
        },
        wamp: {
          componentId: 226,
          colorIndex: 0
        },
      },

      components: [
        {
          id: 223,
          type: "material",
          meshGroup: "sole",
          mesh: "sole_middle",
          material: {
            key: "rubber",
            label: "rubber",
            img: undefined,
          },
          colors: {
            allowCustom: false,
            variants: [
              { value: "red", label: "red", price: 0 },
              { value: "black", label: "black", price: 0 },
              { value: "blue", label: "blue", price: 0 },
              { value: "white", label: "white", price: 0 },
              { value: "gold", label: "nova wave", price: 1.0 },
            ]
          },
        },

        {
          id: 224,
          type: "material",
          mesh: "Object_8004_2",
          meshGroup: "laces",
          material: {
            key: "fabric",
            label: "fabric",
            img: "/textures/laces-fabric.jpg",
          },
          colors: {
            allowCustom: true,
            variants: [],
          },

        },
        {
          id: 225,
          type: "material",
          mesh: "Object_8004",
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
          mesh: "wamp",
          meshGroup: "wamp",
          material: {
            key: "wamp",
            label: "fabric",
            img: undefined,
          },
          colors: {
            allowCustom: false,
            variants: [
              { value: "red", label: "red", price: 0 },
              { value: "black", label: "black", price: 0 },
              { value: "blue", label: "blue", price: 0 },
              { value: "white", label: "white", price: 0 },
            ]
          },
        },
      ],
    },

    {
      id: "size",
      order: 3,
      displayType: "all",
      default: {
        sizeIndex: 0,
      },

      components: [
        {
          id: 228,
          type: "size",
          label: "Size:",
          options: [
            {
              value: "M",
              label: "M",
              price: 0,
            },
            {
              value: "S",
              label: "S",
              price: 0,
            },
            {
              value: "L",
              label: "L",
              price: 0,
            },
            {
              value: "XL",
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
          content: {
            value: "Product Info",
            textType: "heading2"
          }
        },
        {
          id: 239,
          type: "content",
          content: {
            value: "I'm a great place to add more information about your product, such as sizing, material, care, and cleaning instructions. This is also a great space to highlight what makes this product special and how your customers can benefit from this item.",
            textType: "text-sm"
          }
        },
        {
          id: 240,
          type: "content",
          content: {
            value: "Return & Refund Policy",
            textType: "heading2"
          }
        },
        {
          id: 241,
          type: "content",
          content: {
            value: "I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase.Easy Returns &amp; ExchangesHassle-Free ProcessBuilds Customer ConfidenceHaving a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
            textType: "text-sm"
          }
        },
      ],
    },
  ],
};

type ProductSlice = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const createProductSlice = (set): ProductSlice => ({
  product: product,

  setProduct: (product) =>
    set({ product }),
});