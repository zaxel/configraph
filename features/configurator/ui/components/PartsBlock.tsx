import { HexColorPicker } from 'react-colorful';
import { PartsComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';
import * as THREE from "three"

export const PartsBlock = ({ data }: { data: PartsComponent }) => {
  const selectedPartOption = useConfiguratorStore(s => s.selectedOptions.parts.selectedPart);
  const selectedItemsOption = useConfiguratorStore(s => s.selectedOptions.parts.items);
  const setPart = useConfiguratorStore(s => s.setPart);
  const setGroup = useConfiguratorStore(s => s.setGroup);
  const setColor = useConfiguratorStore(s => s.setColor);

  const parts = data.options.map(part => {
    const isSelected = part.id === selectedPartOption;
    return <li
      key={part.id}
      onClick={() =>
        !isSelected &&
        setPart(part.id)
      }
      className={isSelected
        ? "ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm"
        : "ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer"
      }
    >
      {part.id}
    </li>
  })

  const selectedPart = data.options.find(el => el.id === selectedPartOption);
  if (!selectedPart) return null;
  const partSelection = selectedItemsOption[selectedPart.id];
  if (!partSelection) return null;

  const groups = selectedPart.groups.map(group => {

    const isSelected = group.id === partSelection.groupId;

    return <li
      key={group.id}
      onClick={() =>
        !isSelected &&
        setGroup(selectedPartOption, group.id)
      }
      className={isSelected
        ? "ring-1 ring-primary text-white bg-primary rounded-md py-1 px-4 text-sm"
        : "ring-1 ring-primary text-primary rounded-md py-1 px-4 text-sm cursor-pointer"
      }
    >
      {group.label}
    </li>
  })

  const selectedGroup = selectedPart.groups.find(group => group.id === partSelection.groupId);
  if (!selectedGroup || !selectedGroup.colors || !selectedGroup.colors.variants) return null;


  const isCustomAllowed = selectedGroup.colors.allowCustom;

  const colors = selectedGroup.colors.variants.map(color => {
    const isSelected = color.value === partSelection.color;

    return (<li
      onClick={() =>
        !isSelected &&
        setColor(selectedPartOption, color.value)
      }
      key={color.value}
      className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative`}
      style={{ backgroundColor: color.value }}>
      {isSelected && <div className='absolute w-10 h-10 rounded-full ring-2 ring-gray-400 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>}
    </li>)
  })

  return (
    <div className='flex flex-col gap-4'>
      {data.label && (
        <h3 className="font-medium text-xl mb-4">{data.label}</h3>
      )}
      {parts && parts.length > 0 && <ul className='flex gap-4'>{parts}</ul>}
      {groups && groups.length > 0 && <ul className='flex gap-4'>{groups}</ul>}
      {!isCustomAllowed && colors && colors.length > 0 && <ul className='flex items-center gap-3'>{colors}</ul>}
      {isCustomAllowed && <div className="h-24">
          <HexColorPicker className="max-h-full" color={partSelection.color} onChange={(color: string | number | THREE.Color)=>setColor(selectedPartOption, color)} />
        </div>}
    </div>
  );
};

export default PartsBlock;