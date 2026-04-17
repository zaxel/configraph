export function buildInitialGroupAndColorSelections(product) {
  const result = {};

  const materialsModule = product.modules.find(
    (m) => m.id === "materials"
  );

  if (!materialsModule) return result;

  const defaults = materialsModule.default;

  for (const meshGroup in defaults) {
    const def = defaults[meshGroup];

    const component = materialsModule.components.find(
      (c) => c.id === def.componentId
    );

    if (!component) continue;

    const color =
      component.colors.variants?.[def.colorIndex]?.value;

    result[component.id] = {
      type: "material",
      componentId: component.id,
      meshGroup: meshGroup,
      color,
    };
  }

  return result;
}


export function buildInitialSizeSelections(product) {
  const sizeModule = product.modules.find((m) => m.id === "size");
  if (!sizeModule) return { };

  const sizeComponent = sizeModule.components.find((c) => c.type === "size");
  if (!sizeComponent) return { };

  const sizeIndex = sizeModule.default?.sizeIndex ?? null;
  if (sizeIndex === null) return {};
  console.log(sizeModule)
  return {
    [sizeComponent.id]: {
      ...sizeComponent.options[sizeIndex],
      type: "size",
    }
  };
}