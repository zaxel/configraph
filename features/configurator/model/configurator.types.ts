import { Component } from "./components.types";
import { PriceConfig } from "./pricing.types";


export type Module = {
  id: string;
  title?: string;
  order: number;

  enabled?: boolean;

  components: Component[];
};

export type Configurator = {
  id: string;

  mode: "embedded" | "preview";

  currency: string;

  modules: Module[];

  quantity: number;

  pricing: PriceConfig;
};