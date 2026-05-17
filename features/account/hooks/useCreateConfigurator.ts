import { useMutation } from "@tanstack/react-query";
import { createConfiguratorAction } from "../actions/configurator.action";

export function useCreateConfigurator(configurator, userId, size, type, path) {
  return useMutation({
    mutationFn: ()=> createConfiguratorAction(configurator, userId, size, type, path),
  });
}