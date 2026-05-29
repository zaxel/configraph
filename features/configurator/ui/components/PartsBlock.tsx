import { HexColorPicker } from 'react-colorful';
import { PartsComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';
import Button from '@/components/common/Button';
import { Checkbox } from '@/components/ui/checkbox';
import { useProduct } from '@/features/product-studio/context/ProductContext';

export const PartsBlock = ({ data }: { data: PartsComponent }) => {
  const selectedPartOption = useConfiguratorStore(s => s.selectedOptions.parts.selectedPart);
  const selectedItemsOption = useConfiguratorStore(s => s.selectedOptions.parts.items);
  const setPart = useConfiguratorStore(s => s.setPart);
  const setGroup = useConfiguratorStore(s => s.setGroup);
  const setColor = useConfiguratorStore(s => s.setColor);
  const setEnabled = useConfiguratorStore(s => s.setEnabled);
  const product = useProduct();

  const parts = data.options.map(part => {
    if(!part.optional && !part.enabled)return null;
    const isSelected = part.id === selectedPartOption;
    return <li key={part.id}>
      <Button variant={isSelected ? "active-accent" : "accent"} onClick={() => product && !isSelected && setPart(product, part.id)}>
        {part.label}
      </Button>
    </li>
  }).filter(p=>p!==null);
  if(parts.length===0) return null;

  const selectedPart =
    data.options.find(el => el.id === selectedPartOption) ??
    data.options[0];

  if (!selectedPart) return null;
  const partSelection = selectedItemsOption[selectedPart.id];
  if (!partSelection) return null;

  const groups = selectedPart.groups.map(group => {

    const isSelected = group.id === partSelection.groupId;

    return <li key={group.id}>
      <Button
        variant={isSelected ? "active-accent" : "accent"}
        onClick={() => !isSelected && selectedPartOption && product && setGroup(product, selectedPartOption, group.id)
        }>
        {group.label}
      </Button>
    </li>
  })

  const selectedGroup = selectedPart.groups.find(group => group.id === partSelection.groupId);
  if (!selectedGroup || !selectedGroup.colors || !selectedGroup.colors.variants) return null;

  const isCustomAllowed = selectedGroup.colors.allowCustom;

  const colors = selectedGroup.colors.variants.map(color => {
    const isSelected = color.value === partSelection.color;

    return <li
      onClick={() =>
        !isSelected && selectedPartOption && setColor(selectedPartOption, color.value)
      }
      key={color.value}
      className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative`}
      style={{ backgroundColor: color.value }}>
      {isSelected && <div className='absolute w-10 h-10 rounded-full ring-2 ring-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>}
    </li>
  })

  return (
    <div className='flex flex-col gap-4'>
      {data.label && (
        <h3 className="font-medium text-xl mb-4">{data.label}</h3>
      )}
      {parts && parts.length > 0 && <ul className='flex gap-4 flex-wrap'>{parts}</ul>}
      {groups && groups.length > 0 && <ul className='flex gap-4 flex-wrap'>{groups}</ul>}
      {selectedPart.optional && <label className="flex gap-4 cursor-pointer">
        <Checkbox
          className="h-5 w-5 cursor-pointer"
          checked={partSelection.enabled}
          disabled={!selectedPartOption}
          onCheckedChange={(checked) => {
            if (selectedPartOption)
              setEnabled(selectedPartOption, Boolean(checked))
          }
          }
        />
        <span>toggle part</span>
      </label>
      }
      {partSelection.enabled && !isCustomAllowed && colors && colors.length > 0 && <ul className='flex items-center gap-3'>{colors}</ul>}
      {partSelection.enabled && isCustomAllowed && <div className="h-24">
        <HexColorPicker className="max-h-full" color={partSelection.color as string}
          onChange={(color) => {
            if (selectedPartOption)
              setColor(selectedPartOption, color)
          }
          } />
      </div>}
    </div>
  );
};

export default PartsBlock;