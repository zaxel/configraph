import { ZodError } from "zod";
import { PublishIssue } from "./types";

export function mapPublishZodErrors(
  error: ZodError
): PublishIssue[] {
  return error.issues.map((issue) => ({
    severity: "error",
    message: issue.message,
    path: issue.path.join("."),
    code: issue.code,
  }));
}