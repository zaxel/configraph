import { useProduct } from '@/features/product-studio/context/ProductContext';
import { BuilderModuleRenderer } from '../BuilderModuleRenderer';
import ModuleSelect from './ModuleSelect';

const BuilderUI = () => {
        const product = useProduct();
        if (!product) return null;

    return (
        <div className='w-full flex flex-col gap-6'>
            {product.modules
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((module) => {
                    return <BuilderModuleRenderer key={module.id} module={module} />
                })}
            <ModuleSelect />
        </div>
        
    );
};

export default BuilderUI;