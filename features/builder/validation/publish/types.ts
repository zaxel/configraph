export type PublishIssue = {
    severity: "error" | "warning";
    message: string;
    path?: string;
    moduleId?: string;
    componentId?: string;
    code?: string;
};