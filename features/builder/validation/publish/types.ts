export interface ZodIssueRaw {
  code: string;
  message: string;
  path: (string | number)[]; // raw from Zod — do NOT pre-join
  severity: "error" | "warning";
}

export type PublishIssue = {
    severity: "error" | "warning";
    message: string;
    path?: string;
    moduleId?: string;
    componentId?: string;
    code?: string;
};