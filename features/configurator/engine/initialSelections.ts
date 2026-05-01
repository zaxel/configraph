import { AddonModule, Module, PartsModule, Product, SizeModule } from "../model";
import { PartsSelection } from "../model/selections.types";


function isPartsModule(m: Module): m is PartsModule {
  return m.id === "parts";
}

type initPartsType = { parts: PartsSelection }
export function buildInitialPartsSelections(product: Product) {
  const result: initPartsType = {
    parts: {
      selectedPart: "",
      items: {}
    }
  };

  const partsModule = product.modules.find(isPartsModule);

  if (!partsModule) return result;

  const defaults = partsModule.default;
  if (!defaults) return result;

  for (const partId in defaults.selections) {
    const def = defaults.selections[partId];

    result.parts = {
      ...result.parts,
      items: {
        ...result.parts.items,
        [partId]: def
      }
    };
  }
  result.parts.selectedPart = defaults.selectedPart;
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

  const def = sizeModule.default ?? null;
  if (def === null) return {};
  return {
    size: def.value,
  };
}

function isAddonModule(m: Module): m is AddonModule {
  return m.id === "addon";
}
export function buildInitialAddonSelections(product: Product) {
  const addonModule = product.modules.find((m) => m.id === "addon");
  if (!addonModule) return {};

  const addonComponent = addonModule.components.find((c) => c.type === "addon");
  if (!addonComponent || !isAddonModule(addonModule)) return {};

  const def = addonModule.default?.selections ?? null;
  if (def === null) return {};
  return {
    addon: def
  };
}