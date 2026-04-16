/* base selectors */

export const getProduct = (s) => s.product;

export const selectOptions = (s) => s.selectedOptions;

/* param selector */

export const selectOption =
  (componentId: string) => (s) =>
    s.selectedOptions[componentId];

/* derived */

export const selectHasOption =
  (componentId: string, value: string) => (s) =>
    s.selectedOptions[componentId] === value;

/* example computed */

export const selectTotalSelected = (s) =>
  Object.keys(s.selectedOptions).length;