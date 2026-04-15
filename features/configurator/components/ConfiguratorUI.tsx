import React from 'react';
const additionalInfoSections = [
    {
        title: "Shipping Info",
        description: "I’m a great place to add more information about your shipping methods, packaging, and cost.Providing straightforward information about your shipping policy&nbsp;is a great way to build trust and reassure your customers that they can buy from you with confidence."
    },
    {
        title: "Return & Refund Policy",
        description: "I’m a great place to let your customers know what to do in case they are dissatisfied with their purchase.Easy Returns &amp; ExchangesHassle-Free ProcessBuilds Customer ConfidenceHaving a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
    },
    {
        title: "Product Info",
        description: "I'm a great place to add more information about your product, such as sizing, material, care, and cleaning instructions. This is also a great space to highlight what makes this product special and how your customers can benefit from this item.",
    },
    {
        title: "Leather Tote Short Description",
        description: "Everyday Leather Tote",
    },
]
const isOnSale = true;
const formattedPrice = 12.50;
const priceDisplay = 11.20;

const ConfiguratorUI = () => {
    return (
        <div className='w-full md:w-1/3 shrink-0 flex flex-col gap-6'>
            {/* <div className='w-full lg:w-1/2 flex flex-col gap-6'> */}
                <h2 className='text-xl font-medium'>Nike Jordan</h2>
                <p className='text-gray-500'>A comfortable, everyday T-shirt made from soft, breathable cotton, designed with a classic fit and clean lines for effortless wear.</p>
                <hr className='h-[2px] bg-gray-100' />
                <div className='flex justify-start gap-4'>
                    {isOnSale && (
                        <h4 className='text-xl text-gray-500 line-through'>
                            ${formattedPrice}
                        </h4>
                    )}
                    <h3 className='font-medium text-2xl'>${priceDisplay}</h3>
                </div>
                <hr className='h-[2px] bg-gray-100' />
                    {/* <Picker /> */}
                    <div>Picker</div>
                <hr className='h-[2px] bg-gray-100' />
                {/* <CustomizeProduct productId={item?._id ?? "0000"} options={item?.productOptions ?? []} variants={item?.variants ?? []} /> */}

                <hr className='h-[2px] bg-gray-100' />
                <ul>
                    {additionalInfoSections.map((section, index) => {
                        const description = section.description
                            ? section.description.replace(/<[^>]*>/g, '')
                            : 'No description available';

                        return <li key={index} className='text-sm mb-5'>
                            <h3 className='font-medium text-lg mb-4'>{section.title}</h3>
                            <p>{description}</p>
                        </li>
                    })}
                </ul>
            {/* </div> */}
        </div>
    );
};

export default ConfiguratorUI;