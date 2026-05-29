import Button from '@/components/common/Button';
import React, { useMemo } from 'react';
import { SubmitComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';
import { buildResult } from '../../domain/result/buildResult';

const SubmitBlock = ({ data }: { data: SubmitComponent }) => {
    const product = useConfiguratorStore((s) => s.product);
    const decals = useConfiguratorStore((s) => s.decals);
    const quantity = useConfiguratorStore((s) => s.quantity);
    const selectedOptions = useConfiguratorStore((s) => s.selectedOptions);


    const result = useMemo(() => {
        if (!product) return null;

        return buildResult(product, {
            decals,
            quantity,
            selectedOptions
        });
    }, [product, decals, quantity, selectedOptions]);

    return (
        <div>
            {data.label && <h3 className='font-medium text-xl mb-4'>{data.label}</h3>}
            <Button
                variant="accent"
                onClick={() => {
                    console.log(result);
                    if (!result) return;
                    window.parent.postMessage(
                        {
                            type: "CONFIGURATOR_SUBMIT",
                            payload: result,
                        },
                        "*"
                    );
                }}
                className='w-max'
            >
                {data.text}
            </Button>
        </div>
    );
};

export default SubmitBlock;
