import { Product } from "@/features/configurator/model";
import { BuilderConfig, ProductConfigSlice } from "../../store/slices/productConfig.type";
import { PublishIssue } from "./types";
import { validateContentModules } from "./validators/validateContentModule";
import { validatePartsModules } from "./validators/validatePartsModules";
import { validateSizeModules } from "./validators/validateSizeModules";

export function validateForPublish(
    draft: Product,
    builderConfig: BuilderConfig
): PublishIssue[] {
    const issues: PublishIssue[] = [];

    validateContentModules(draft, issues);
    validatePartsModules(draft, builderConfig, issues);
    validateSizeModules(draft, issues);
    // validateSubmitModules(draft, issues);

    return issues;
}