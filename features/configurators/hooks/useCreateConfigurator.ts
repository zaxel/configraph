import { useMutation } from "@tanstack/react-query";
import { createConfiguratorAction } from "../actions/editor.actions";
import { ConfiguratorData } from "../types/configurators.types";

export function useCreateConfigurator(configurator: ConfiguratorData, userId: string, size: number, type: string, path: string) {
  return useMutation({
    mutationFn: ()=> createConfiguratorAction(configurator, size, type, path),
  });
}