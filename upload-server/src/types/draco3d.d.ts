declare module 'draco3d' {
    interface DecoderModule {
        [key: string]: any;
    }
    interface EncoderModule {
        [key: string]: any;
    }
    const draco3d: {
        createDecoderModule(): Promise<DecoderModule>;
        createEncoderModule(): Promise<EncoderModule>;
    };
    export default draco3d;
    export { DecoderModule, EncoderModule };
}