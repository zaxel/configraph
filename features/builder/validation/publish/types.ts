export interface ZodIssueRaw {
  code: string;
  message: string;
  path: (string | number)[]; 
  severity: "error" | "warning";
}

export type PublishIssue = {
    severity: "error" | "warning";
    message: string;
    path?: string;
    moduleId?: string;
    componentId?: string;
    entityId?: string;
    code?: string;
    field?: string;
};