export const selectVariant = (s) => s.selectedVariant;
export const selectMaterials = (s) => s.materials;

export const selectIsConfigured = (s) =>
  !!s.selectedVariant && Object.keys(s.materials).length > 0;




// const variant = useConfiguratorStore(selectVariant);  //usage