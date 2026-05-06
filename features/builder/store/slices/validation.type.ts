type FieldPath = string; 
// e.g. "modules.price.options[3].value"

export type ValidationError = {
  message: string;
  code?: string;
};

export type ValidationSlice = {
  errors: Record<FieldPath, ValidationError[]>;
  touched: Record<FieldPath, boolean>;
  dirty: Record<FieldPath, boolean>;

  // derived
  isValid: boolean;

  // actions
  setFieldTouched: (path: FieldPath) => void;
  setFieldDirty: (path: FieldPath) => void;

  setErrors: (errors: Record<FieldPath, ValidationError[]>) => void;
  clearErrors: () => void;

  validateDraft: () => void;
  validateField: (path: FieldPath) => void;
};