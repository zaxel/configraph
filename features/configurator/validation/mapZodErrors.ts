import { ValidationError } from "@/features/builder/store/slices/validation.type";
import { ZodError } from "zod";

export type PathResolver = (path: (string | number | symbol)[]) => string;

export const mapZodErrors = (
  error: ZodError,
  resolvePath?: PathResolver
): Record<string, ValidationError[]> => {
  const result: Record<string, ValidationError[]> = {};

  for (const issue of error.issues) {
    const path = resolvePath
      ? resolvePath(issue.path)
      : issue.path.join(".");

      console.log(path);

    if (!result[path]) result[path] = [];

    result[path].push({ 
      message: issue.message,
      code: issue.code,
    });
  }

  return result;
};