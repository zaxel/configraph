import { AddonComponent, Product } from "@/features/configurator/model";
import { MeshLayout } from "@/lib/extractMeshes";

type AddonOption = AddonComponent["options"][number];

export type ProductConfigSlice = {
    product: Product | null;
    draft: Product | null;
    configuratorId: string | null;
    builderConfig: BuilderConfig;
    initProduct: (product: Product) => void;
    setModelUrl: (url: string) => void;
    setConfiguratorId: (id: string) => void;
    loadConfigurator: (id: string) => void;
    setBuilderConfig: (config: BuilderConfig) => void,
    updateAddonOption: (moduleId: string, optionId: string, patch: Partial<AddonOption>) => void,
}

export type BuilderConfig = {
  meshes: MeshLayout[];
} | null;