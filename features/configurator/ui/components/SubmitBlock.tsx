import Button from '@/components/common/Button';
import React, { useMemo } from 'react';
import { SubmitComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';
import { buildResult } from '../../domain/result/buildResult';

const SubmitBlock = ({ data }: { data: SubmitComponent }) => {
    const product = useConfiguratorStore((s) => s.product);
    const parts = useConfiguratorStore((s) => s.selectedOptions.parts);
    const decals = useConfiguratorStore((s) => s.decals);
    const size = useConfiguratorStore((s) => s.selectedOptions.size);
    const addon = useConfiguratorStore((s) => s.selectedOptions.addon);
    const quantity = useConfiguratorStore((s) => s.quantity);
    const selectedOptions = useConfiguratorStore((s) => s.selectedOptions);


    const result = useMemo(() => {
        if (!product) return null;

        return buildResult(product, {
            parts,
            decals,
            size,
            addon,
            quantity,
            selectedOptions
        });
    }, [product, parts, decals, size, addon, quantity, selectedOptions]);

    return (
        <div>
            {data.label && <h3 className='font-medium text-xl mb-4'>{data.label}</h3>}
            <Button
                onClick={() => {
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
