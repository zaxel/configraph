"use client"
import { useBuilderStore } from '@/features/builder/store/builder.store';
import { PublishValidationModal } from '@/features/builder/ui/components/modals/PublishValidationModal';
import ProductStudio from '@/features/product-studio/ProductStudio';

const Builder = () => {
    const publishIssues = useBuilderStore(s => s.publishIssues);
    const publishModalOpen = useBuilderStore(s => s.publishModalOpen);
    const setPublishModalOpen = useBuilderStore(s => s.setPublishModalOpen);
    const executePublish = useBuilderStore(s => s.executePublish);
    const publishing = useBuilderStore(s => s.publishing);

    return (
        <>
            <div className="grow p-4 md:p-8">
                <ProductStudio />
            </div>

            <PublishValidationModal
                open={publishModalOpen}
                issues={publishIssues}
                publishing={publishing}
                onClose={() => setPublishModalOpen(false)}
                onPublish={executePublish}
            />
        </>
    );
};

export default Builder;