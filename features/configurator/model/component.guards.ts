import { Component } from "./components.types";
import { Module } from "./product.types";

export function isComponentType<T extends Component["type"]>(
  c: Component,
  type: T
): c is Extract<Component, { type: T }> { 
  return c.type === type;
}

export function isModuleType<T extends Module["id"]>(
  m: Module,
  id: T
): m is Extract<Module, { id: T }> { 
  return m.id === id;
}