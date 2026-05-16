import { ProductConfigSlice } from "@/features/builder/store/slices/productConfig.type";
import { Product } from "@/features/configurator/model";
import { MeshLayout } from "@/lib/extractMeshes";
import fs from "fs";
import path from 'path';

export type BuilderConfig = {
  meshes: MeshLayout[];
} | null;

export type ConfiguratorRecord = {
  id: string;
  draft: Product | null;
  published: Product | null;
  builderConfig: BuilderConfig;


  createdAt: number;
  updatedAt: number;
  publishedAt?: number;
};

const DATA_DIR = path.join(process.cwd(), 'db', 'data');

export async function createConfigurator(data: Omit<ConfiguratorRecord, "id" | "createdAt" | "updatedAt">) {
  const id = 'cfg_' + crypto.randomUUID();

  const record = {
    id,
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await fs.promises.mkdir(DATA_DIR, { recursive: true });
  await fs.promises.writeFile(
    path.join(DATA_DIR, `${id}.json`),
    JSON.stringify(record, null, 2)
  );

  return record; 

}

export async function getConfigurator(id: string) {
  const filePath = path.join(DATA_DIR, `${id}.json`);
  const data = await fs.promises.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function updateConfiguratorDraft(id: string, draft: Product) {
  const filePath = path.join(DATA_DIR, `${id}.json`);

  const raw = await fs.promises.readFile(filePath, "utf-8");
  const data = JSON.parse(raw);

  // update only draft
  data.draft = draft;

  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));

  return data;
}


export async function publishConfigurator(id: string) {
  const filePath = path.join(DATA_DIR, `${id}.json`);

  const raw = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(raw);

  data.published = data.draft;
  data.publishedAt = Date.now();

  await fs.writeFile(filePath, JSON.stringify(data, null, 2));

  return data;
}
