import { Button } from '@/components/ui/button';
import { useBuilderStore } from '@/features/builder/store/builder.store';
import { meshGroup } from '@/features/configurator/model';
import AddMeshSelect from './AddMeshSelect';

type MeshesTable = {
    moduleId: string,
    optionId: string,
    group: meshGroup,
}
const MeshesTable = ({ moduleId, optionId, group }: MeshesTable) => {
    const deleteMeshOption = useBuilderStore(s => s.deleteMeshOption);

    return (
        <>
            <table className="w-full text-sm border rounded-md">
                <thead className="bg-muted">
                    <tr>
                        <th className="p-2 text-left">Meshes</th>
                        <th className="p-2 text-center">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {group.meshes.map((mesh) => (
                        <tr key={mesh} className="border-t">

                            {/* MESHES */}
                            <td className="p-2">
                                {mesh}
                            </td>

                            {/* DELETE */}
                            <td className="p-2 text-center">
                                <Button
                                    className="cursor-pointer"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => deleteMeshOption(moduleId, optionId, group.id, mesh)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div >
                <AddMeshSelect moduleId={moduleId} optionId={optionId} groupId={group.id} />
            </div>
        </>
    );
};

export default MeshesTable;