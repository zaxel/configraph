import { AddonModule, CanvasModule, ComponentType, ContentModule, PartsModule, PriceModule, SizeModule, SubmitModule } from "@/features/configurator/model";
type ModuleFactoryFn = (order: number) => AddonModule | SizeModule | PartsModule | ContentModule | CanvasModule | SubmitModule | PriceModule;


export function createModuleFactory(type: ComponentType, order: number) {
  const register: Record<ComponentType, ModuleFactoryFn> = {
    "addon": createAddonModule,
    "size": createSizeModule,
    "parts": createPartsModule,
    "content": createContentModule,
    "canvas": createCanvasModule,
    "submit": createSubmitModule,
    "price": createPriceModule,
  }

  return register[type](order);
}

function createAddonModule(order: number): AddonModule {
  return {
    id: "addon",
    instanceId: `mdl_${crypto.randomUUID()}`,
    order,

    default: {
      type: "addon",
      selections: [],
    },

    components: [
      {
        id: `cmp_${crypto.randomUUID()}`,
        type: "addon",
        label: "",
        options: [],
      },
    ],
  };
}

function createSizeModule(order: number): SizeModule {
  return {
    id: "size",
    instanceId: `mod_${crypto.randomUUID()}`,
    order,
    default: undefined,

    components: [
      {
        id: `cmp_${crypto.randomUUID()}`,
        type: "size",
        label: "",
        options: []
      }
    ],
  }
}
function createPartsModule(order: number): PartsModule {
  return {
    id: "parts",
    instanceId: `mod_${crypto.randomUUID()}`,
    type: "parts",
    order,


    default: {
      type: "parts",
      selections: {

      },
      selectedPart: ""

    },

    components: [
      {
        id: `cmp_${crypto.randomUUID()}`,
        type: "parts",
        label: "",
        options: []
      }
    ],
  }
}
function createContentModule(order: number): ContentModule {
  return {
    id: "content",
    instanceId: `mod_${crypto.randomUUID()}`,
    order,
    type: "content",
    default: {
      type: "content"
    },
    components: [
      {
        id: `cmp_${crypto.randomUUID()}`,
        type: "content",
        label: "",
        content: []
      }
    ]
  }
}

function createCanvasModule(order: number): CanvasModule {

}
function createSubmitModule(order: number): SubmitModule {
  return {
    id: "submit",
    instanceId: `mod_${crypto.randomUUID()}`,
    order,
    type: "submit",
    default: {
      type: "submit"
    },
    components: [
      {
        id: `cmp_${crypto.randomUUID()}`,
        type: "submit",
        label: "",
        text: "Add To cart"
      }
    ]
  }
}
function createPriceModule(order: number): PriceModule {

}