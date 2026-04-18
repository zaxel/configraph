import { Component, MaterialComponent, MaterialsModule, Module, Product, SizeComponent, SizeModule } from "../model";
import { MaterialSelection } from "../model/selections.types";


function isMaterialsModule(m: Module): m is MaterialsModule {
  return m.id === "materials";
}

function isMaterialComponent(c: Component): c is MaterialComponent {
  return "colors" in c;
}

export function buildInitialGroupAndColorSelections(product: Product) {
  const result: Record<string, MaterialSelection> = {};

  const materialsModule = product.modules.find(isMaterialsModule);

  if (!materialsModule) return result;

  const defaults = materialsModule.default;

  for (const meshGroup in defaults) {
    const def = defaults[meshGroup];


    const component = materialsModule.components.find(
      (c) => c.id === def.componentId
    );

    if (!component || !isMaterialComponent(component)) continue;

    const color =
      def.colorIndex != null
        ? component.colors.variants?.[def.colorIndex]?.value
        : undefined;

    result[component.id] = {
      type: "material",
      meshGroup: meshGroup,
      color,
    };
  }

  return result;
}

function isSizeModule(m: Module): m is SizeModule {
  return m.id === "size";
}

export function buildInitialSizeSelections(product: Product) {
  const sizeModule = product.modules.find((m) => m.id === "size");
  if (!sizeModule) return {};

  const sizeComponent = sizeModule.components.find((c) => c.type === "size");
  if (!sizeComponent || !isSizeModule(sizeModule)) return {};

  const sizeIndex = sizeModule.default?.sizeIndex ?? null;
  if (sizeIndex === null) return {};
  return {
    [sizeComponent.id]: {
      ...sizeComponent.options[sizeIndex],
      type: "size",
    }
  };
}