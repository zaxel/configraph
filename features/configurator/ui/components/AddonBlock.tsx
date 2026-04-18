import React from 'react';
import { AddonComponent } from '../../model';
import { useConfiguratorStore } from '../../store/configurator.store';
import { Checkbox } from "@/components/ui/checkbox"

const AddonBlock = ({ data }: { data: AddonComponent }) => {
  const selected = useConfiguratorStore(s => s.selectedOptions.addon);
  const toggleAddon = useConfiguratorStore(s => s.toggleAddon);

  return (
    <div>
      {data.label && (
        <h3 className="font-medium text-xl mb-4">{data.label}</h3>
      )}

      <ul className="flex flex-col gap-3">
        {data.options.map(option => {
          const isSelected = selected.includes(option.value);

          return (
            <li key={option.value}>
              <label className="flex gap-4 cursor-pointer">
                <Checkbox
                  className="h-5 w-5 cursor-pointer"
                  checked={isSelected}
                  onCheckedChange={() => toggleAddon(option.value)}
                />
                <span>{option.label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddonBlock;