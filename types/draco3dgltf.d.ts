declare module "draco3dgltf" {
   export interface EncoderModule {
    [key: string]: unknown;
  }

  export interface DecoderModule {
    [key: string]: unknown;
  }

  export function createEncoderModule(): Promise<EncoderModule>;
  export function createDecoderModule(): Promise<DecoderModule>;
}