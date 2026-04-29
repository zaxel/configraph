declare module "draco3d" {
  export interface EncoderModule {
    [key: string]: unknown; 
  }

  export interface DecoderModule { 
    [key: string]: unknown;
  }

  export function createEncoderModule(options?: object): Promise<EncoderModule>;
  export function createDecoderModule(options?: object): Promise<DecoderModule>;
}