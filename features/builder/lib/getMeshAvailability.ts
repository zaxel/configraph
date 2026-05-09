import { PartsComponent, PartsModule, Module, Product } from "@/features/configurator/model";

export const getTakenMeshes = (draft: Product): Set<string> => {
  const taken = new Set<string>();
  
  draft.modules.forEach((module: Module) => {
    if (module.id !== 'parts') return;
    (module as PartsModule).components.forEach((component) => {
      if (component.type !== 'parts') return;
      (component as PartsComponent).options.forEach((part) => {
        part.groups.forEach((group) => {
          group.meshes.forEach((mesh) => taken.add(mesh)); 
        });
      });
    });
  });
  
  return taken;
};