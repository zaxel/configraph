import { ZodError } from "zod";
import { ZodIssueRaw } from "./types";

export function mapPublishZodErrors(
    error: ZodError
): ZodIssueRaw[] {
    return error.issues.map((issue) => {
        return {
            severity: "error",
            message: issue.message, 
            path: issue.path as (string | number)[],
            code: issue.code,
        }
    });
}