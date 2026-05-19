import { Product } from "@/features/configurator/model";
import { BuilderConfig, ProductConfigSlice } from "../../store/slices/productConfig.type";
import { PublishIssue } from "./types";
import { validateContentModules } from "./validators/validateContentModule";
import { validatePartsModules } from "./validators/validatePartsModules";
import { validateSizeModules } from "./validators/validateSizeModules";
import { validateSubmitModules } from "./validators/validateSubmitModules";
import { validateAddonModules } from "./validators/validateAddonModules";
import { validateCanvasModules } from "./validators/validateCanvasModules";
import { validatePriceModules } from "./validators/validatePriceModules";

export function validateForPublish(
    draft: Product,
    builderConfig: BuilderConfig
): PublishIssue[] {
    const issues: PublishIssue[] = [];

    validateContentModules(draft, issues);
    validatePartsModules(draft, builderConfig, issues);
    validateSizeModules(draft, issues);
    validateSubmitModules(draft, issues);
    validateAddonModules(draft, issues);
    validateCanvasModules(draft, issues);
    validatePriceModules(draft, issues);

    return issues;
}