import Button from '@/components/common/Button';
import { SizeComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';

const SizeBlock = ({ data }: { data: SizeComponent }) => {
    const selected = useConfiguratorStore(s => s.selectedOptions["size"]);
    const setOption = useConfiguratorStore(s => s.setOption);
    return (
        <div>
            {data.label && <h3 className='font-medium text-xl mb-4'>{data.label}</h3>}
            <ul className='flex items-center gap-3'>
                {data.options.map(size => {
                    const isSelected = size.value === selected;
                    return (
                        <li key={size.value}>
                            <Button variant={isSelected ? "active" : "primary"} onClick={() =>
                                !isSelected &&
                                setOption("size", size.value,)
                            }>
                                {size.value}
                            </Button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SizeBlock;