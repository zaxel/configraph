import { useMutation } from "@tanstack/react-query";
import { createConfiguratorAction } from "../actions/createConfigurator.action";

export function useCreateConfigurator(configurator, userId, size, type, path) {
  return useMutation({
    mutationFn: ()=> createConfiguratorAction(configurator, userId, size, type, path),
  });
}