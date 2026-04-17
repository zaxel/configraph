import { SizeComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';

const SizeBlock = ({ data }: { data: SizeComponent }) => {
    const selected = useConfiguratorStore(s => s.selectedOptions[data.id]);
    const setOption = useConfiguratorStore(s => s.setOption);
    if (!selected) return null;

    return (
        <div>
            {data.label && <h3 className='font-medium text-xl mb-4'>{data.label}</h3>}
            <ul className='flex items-center gap-3'>
                {data.options.map(size => {
                    const isSelected = size.value === selected.value;
                    return (
                        <li
                            key={size.value}
                            onClick={() => !isSelected && setOption(data.id, size)}
                            className={isSelected
                                ? "ring-1 ring-primary-500 text-white bg-primary rounded-md py-1 px-4 text-sm"
                                : "ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer"
                            }
                        >
                            {size.value}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SizeBlock;