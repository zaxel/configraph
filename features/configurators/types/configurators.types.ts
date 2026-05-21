import { Product, Published } from "@/features/configurator/model";
import { MeshLayout } from "@/lib/extractMeshes";

export type BuilderConfig = {
  meshes: MeshLayout[];
} | null;

export type ConfiguratorData = { 
  id: string;
  draft: Product | null;
  published: Published | null;
  builder_config: BuilderConfig;
};

export interface ConfiguratorRecord {
  id: string;
  clerk_user_id: string;
  name: string;
  slug: string;
  data: ConfiguratorData;
  thumbnail_url: string | null;
  is_public: boolean;
  model_path: string;
  model_format: string;
  model_size_bytes: number;

  created_at: string;
  updated_at: string;
}

