import React from 'react';
import { PartComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';

const PartBlock = ({data}: { data: PartComponent }) => {
    const selected = useConfiguratorStore(s => s.selectedOptions[data.id]);
        const setOption = useConfiguratorStore(s => s.setOption);

    // console.log(selected);
    return (
        <div>
            parts block
        </div>
    );
};

export default PartBlock;