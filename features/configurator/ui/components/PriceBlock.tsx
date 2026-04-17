import { PriceComponent } from '../../model';

const PriceBlock = ({ data }: { data: PriceComponent }) => {
    const isOnSale = data.pricing.oldPrice;
    const oldPrice = data.pricing.oldPrice;
    const basePrice = data.pricing.basePrice;
    return (
        <div className='flex justify-start items-end gap-4'>
            {isOnSale && (
                <h4 className='text-xl text-gray-500 line-through'>
                    ${oldPrice}
                </h4>
            )}
            <h3 className='font-medium text-2xl'>${basePrice}</h3>
        </div>
    );
};

export default PriceBlock;