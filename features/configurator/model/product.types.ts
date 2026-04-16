import { Component } from "./components.types";
import { PriceConfig } from "./pricing.types";


export type Module = { 
  id: string; 
  order: number; 
  displayType: "one-at-time" | "select" | "x-slider" | "all"; 
  enabled?: boolean; 
  components: Component[]; 
};

  export type Product = {
  id: string;

  quantity: number;

  model: {
    url: string;
  };

  pricing: PriceConfig;

  modules: Module[];
};