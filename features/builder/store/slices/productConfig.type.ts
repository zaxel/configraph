import { ComponentType, Product } from "@/features/configurator/model";
import { MeshLayout } from "@/lib/extractMeshes";
import type { UniqueIdentifier } from "@dnd-kit/core";

export type ProductConfigSlice = {
  product: Product | null;
  draft: Product | null;
  builderConfig: BuilderConfig;
  
  configurator: ConfiguratorState;

  meshesRegistered: boolean;
  setConfiguratorName: (name: string) => void;
  initProduct: (product: Product) => void;
  setModelUrl: (url: string) => void;
  setConfiguratorId: (id: string) => void;
  loadConfigurator: (id: string) => void;
  setBuilderConfig: (config: BuilderConfig) => void;
  saveDraft: () => Promise<void>;
  updateConfiguratorMeta: () => Promise<void>;
  deleteModule: (moduleId: string) => void;
  addModule: (type: ComponentType) => void;
  reorderModules: (activeId: UniqueIdentifier, overId: UniqueIdentifier) => void;
} 

export type BuilderConfig = {
  meshes: MeshLayout[];
} | null;

export type ConfiguratorState = {
    id: string | null;
    name: string;
    status: "idle" | "loading" | "updating" | "ready" | "error";
    error: string | null;
};

