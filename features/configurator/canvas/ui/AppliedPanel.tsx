import React from 'react';
import { useConfiguratorStore } from '../../store/configurator.store';
import Card from './Card';
import { DecalConfig } from '../../store/slices/decals.types';

const AppliedPanel = () => {
    const decals = useConfiguratorStore((s) => s.decals);
  const removeDecal = useConfiguratorStore((s) => s.removeDecal);
  const setEditorTab = useConfiguratorStore(s => s.setEditorTab);

  const onItemClickHandler = (decal: DecalConfig) => {
    if(!decal) return null;
    setEditorTab(decal.source.type);
  }

  return (
    <ul className="flex gap-2 flex-wrap">
      {decals.map((decal) => (
        <Card key={decal.id} src={decal.texture} onClick={()=>onItemClickHandler(decal)} onDeleteClick={()=>removeDecal(decal.id)} alt='remove sticker'/>
      ))}
    </ul>
  );
};

export default AppliedPanel;