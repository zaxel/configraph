import React from 'react';
import { AddonComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';
import { Checkbox } from "@/components/ui/checkbox"

const AddonBlock = ({ data }: { data: AddonComponent }) => {
    const selected = useConfiguratorStore(s => s.selectedOptions[data.id]);
    const setOption = useConfiguratorStore(s => s.setOption);
    if (!selected) return null;
    console.log(selected);

    return (
        <div>
            {data.label && <h3 className='font-medium text-xl mb-4'>{data.label}</h3>}

            <Checkbox checked={true}  />
            Addon Component
        </div>
    );
};

export default AddonBlock;