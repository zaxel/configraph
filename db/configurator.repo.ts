const db = new Map();

export async function createConfigurator(data: any) {
  const id = 'cfg_' + crypto.randomUUID();

  const record = {
    id,
    ...data,
    createdAt: Date.now()
  };

  db.set(id, record);

  return record;
}

export async function getConfigurator(id: string) {
  return db.get(id);
}