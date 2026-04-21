import { StateCreator } from "zustand";
import { Product } from "../../model";
import { BoundStore } from "../store.types";

export const product: Product = {
  id: "nike-basic",
  quantity: 1,

  model: {
    url: "/models/nike4.glb",
  },

  modules: [
    {
      id: "price",
      order: 1,
      components: [
        {
          id: "102",
          type: "price",
          pricing: {
            basePrice: 100.0,
            oldPrice: 115.0,
            currency: "USD",
            order: 1,
          },
        }
      ],
    },
    {
      id: "canvas",
      order: 2,
      components: [
        {
          id: "1452",
          type: "canvas",
          mode: "decal", // or "uv"
          stickers: [
            'liberty.png', 'elvis.jpg', 'pluto.png',
            
          ],
        }
      ]
    },
    // {
    //   id: "canvas",
    //   order: 2,
    //   components: [
    //     {
    //       id: "1452",
    //       type: "canvas",
    //       mode: "decal", // or "uv"
    //       stickers: ['liberty.png', 'elvis.jpg'],

    //       // UV-specific config (optional)
    //       zones?: ['body', 'sole'],
    //       uvTemplates?: {
    //         body: '11234_body_uv.png',
    //         sole: '11211_sole_uv.png',
    //       }
    //     }
    //   ]
    // },

    {
      id: "content-01",
      order: 0,

      components: [
        {
          id: "222",
          type: "content",
          content: {
            value: "Nike Jordan 3",
            textType: "heading1"
          }
        },
        {
          id: "201",
          type: "content",
          content: {
            value: "A comfortable, everyday T-shirt made from soft, breathable cotton, designed with a classic fit and clean lines for effortless wear.",
            textType: "text-md-gray"
          }
        },
      ],
    },
    {
      id: "parts",
      type: "parts",
      order: 3,


      default: {
        type: "parts",
        selections: {
          body: {
            groupId: "id-83866e",
            color: "red",
            enabled: true,
          },
          laces: {
            groupId: "id-889776",
            color: "black",
            enabled: true,
          },
          sole: {
            groupId: "id-76653",
            color: "white",
            enabled: false,
          },
        },
        selectedPart: "body"

      },

      components: [ //parts
        {
          id: "parts",
          type: "parts",
          label: "Parts:",
          options: [
            {
              id: "body",
              optional: false,
              groups: [
                {
                  id: "id-83866e",
                  meshes: ["wamp"],
                  label: "fabric",
                  colors: {
                    allowCustom: false,
                    variants: [
                      { value: "red", label: "red", price: 0 },
                      { value: "black", label: "black", price: 0 },
                      { value: "blue", label: "blue", price: 0 },
                      { value: "white", label: "white", price: 0 },
                    ]
                  },
                }
              ]
            },
            {
              id: "laces",
              type: "part",
              optional: false,
              groups: [
                {
                  id: "id-889776",
                  meshes: ["Object_8004_2", "Object_8004_1"],
                  label: "fabric",
                  colors: {
                    allowCustom: true,
                    variants: [],
                  },
                },
                {
                  id: "id-7779",
                  meshes: ["Object_8004"],
                  label: "leather",
                  colors: {
                    allowCustom: false,
                    variants: [
                      { value: "black", label: "black", price: 0 },
                      { value: "brown", label: "brown", price: 0 },
                    ]
                  },
                }
              ]
            },
            {
              id: "sole",
              type: "part",
              optional: true,
              groups: [
                {
                  id: "id-76653",
                  meshes: ["sole_middle"],
                  label: "rubber",
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
                }
              ]
            },
          ]
        }
      ],
    },

    {
      id: "size",
      order: 4,
      default: {
        type: "size",
        value: "XL",
      },

      components: [
        {
          id: "228",
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
      id: "addon",
      order: 5,

      default: {
        type: "addon",
        selections: ["spare velcro", "exclusively signed by Michel Jordan",]
      },



      components: [
        {
          id: "318",
          type: "addon",
          label: "Addons:",
          options: [
            {
              value: "fancy and beautiful loop",
              label: "fancy and beautiful loop",
              price: 0
            },
            {
              value: "spare velcro",
              label: "spare velcro",
              price: 10.0
            },
            {
              value: "antibacterial and antifungal powder",
              label: "antibacterial and antifungal powder",
              price: 11.8
            },
            {
              value: "exclusively signed by Michel Jordan",
              label: "exclusively signed by Michel Jordan",
              price: 99.99
            },
          ]
        },


      ],
    },
    {
      id: "content-02",
      order: 6,

      components: [
        {
          id: "238",
          type: "content",
          content: {
            value: "Product Info",
            textType: "heading2"
          }
        },
        {
          id: "239",
          type: "content",
          content: {
            value: "I'm a great place to add more information about your product, such as sizing, material, care, and cleaning instructions. This is also a great space to highlight what makes this product special and how your customers can benefit from this item.",
            textType: "text-sm"
          }
        },
        {
          id: "240",
          type: "content",
          content: {
            value: "Return & Refund Policy",
            textType: "heading2"
          }
        },
        {
          id: "241",
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

export type ProductSlice = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const createProductSlice: StateCreator<
  BoundStore,
  [["zustand/devtools", never]],
  [],
  ProductSlice
> = (set) => ({
  product: product, // Initial value

  setProduct: (product) =>
    set({ product }, false, "setProduct"), // Third arg is for Devtools action name
});

