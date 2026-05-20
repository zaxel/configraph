import { useProduct } from '@/features/product-studio/context/ProductContext';
import { BuilderModuleRenderer } from '../BuilderModuleRenderer';
import ModuleSelect from './ModuleSelect';
import type { DragEndEvent } from "@dnd-kit/core";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBuilderStore } from '../../store/builder.store';
import { Button } from '@/components/ui/button';
import { ImagePlus, Rocket } from 'lucide-react';
import TitleUpdate from './TitleUpdate';

const BuilderUI = () => {
  const reorderModules = useBuilderStore(s => s.reorderModules);
  const publishing = useBuilderStore(s => s.publishing);
  const publishConfigurator = useBuilderStore(s => s.publishConfigurator);
  const captureThumbnail = useBuilderStore(s => s.captureThumbnail);

  const thumbnailUploading = useBuilderStore(s => s.thumbnailUploading);
  const thumbnailCreating = useBuilderStore(s => s.thumbnailCreating);

  const handleCaptureThumbnail = async () => {
    await captureThumbnail();
  }


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const product = useProduct();
  if (!product) return null;
  const sortedModules = product.modules.slice().sort((a, b) => a.order - b.order);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;


    reorderModules(active.id, over.id);
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <TitleUpdate />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedModules.map((m) => m.instanceId)}
          strategy={verticalListSortingStrategy}
        >
          {sortedModules.map((module) => (
            <BuilderModuleRenderer key={module.instanceId} module={module} />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">

        <ModuleSelect />
        <Button
          className="cursor-pointer"
          disabled={thumbnailUploading || thumbnailCreating}
          onClick={() => handleCaptureThumbnail()}
          variant="outline"
          size="sm"
        >
          <ImagePlus className="w-4 h-4 mr-1" />
          {thumbnailUploading
            ? "Uploading..."
            : thumbnailCreating
              ? "Creating..."
              : "Generate Preview"}
        </Button>

        <Button
          className="cursor-pointer"
          disabled={publishing}
          onClick={() => publishConfigurator()}
          variant="default"
          size="sm"
        >
          <Rocket className="w-4 h-4 mr-1" />
          Publish
        </Button>
      </div>
    </div>
  );
};

export default BuilderUI;