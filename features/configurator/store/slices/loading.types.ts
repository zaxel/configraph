 export type LoadingSlice = {
   isLoading: boolean;
   progress: number;
   setLoading: (isLoading: boolean) => void;
   setProgress: (progress: number) => void;
 };