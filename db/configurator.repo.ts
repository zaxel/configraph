import fs from "fs";
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'db', 'data');

export async function createConfigurator(data: any) {
  const id = 'cfg_' + crypto.randomUUID();

  const record = {
    id,
    ...data,
    createdAt: Date.now()
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
