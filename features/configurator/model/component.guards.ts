import { Component } from "./components.types";

export function isComponentType<T extends Component["type"]>(
  c: Component,
  type: T
): c is Extract<Component, { type: T }> {
  return c.type === type;
}