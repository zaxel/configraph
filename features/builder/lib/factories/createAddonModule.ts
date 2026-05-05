import { AddonModule, CanvasModule, ComponentType, ContentModule, PartsModule, PriceModule, SizeModule, SubmitModule } from "@/features/configurator/model";
type ModuleFactoryFn = (order: number) => AddonModule | SizeModule | PartsModule | ContentModule | CanvasModule | SubmitModule | PriceModule; 


export function createModuleFactory(type: ComponentType, order: number){
    const register: Record<ComponentType, ModuleFactoryFn>  = {
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
        instanceId: crypto.randomUUID(),
        order,

        default: {
            type: "addon",
            selections: [],
        },

        components: [
            {
                id: crypto.randomUUID(),
                type: "addon",
                label: "Addons:",
                options: [],
            },
        ],
    };
}

function createSizeModule(order: number): SizeModule {

}
function createPartsModule(order: number): PartsModule {

}
function createContentModule(order: number): ContentModule {

}
function createCanvasModule(order: number): CanvasModule {

}
function createSubmitModule(order: number): SubmitModule {

}
function createPriceModule(order: number): PriceModule {

}