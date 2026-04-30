import { Product } from "@/features/configurator/model";
import { MeshInfo } from "@/lib/extractMeshes";

export type ProductConfigSlice = {
    product: Product | null;
    configuratorId: string | null;
    builderConfig: BuilderConfig;
    initProduct: (product: Product) => void;
    setModelUrl: (url: string) => void;
    setConfiguratorId: (id: string) => void;
    loadConfigurator: (id: string) => void;
}

export type BuilderConfig = {
  meshes: MeshInfo[];
} | null;