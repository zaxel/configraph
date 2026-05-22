import { createServerConfiguratorAction } from "@/features/configurators/actions/editor.actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // 1. Verify Server-to-Server Internal Secret First
        const incomingSecret = req.headers.get("x-internal-secret");
        const localSecret = process.env.INTERNAL_SECRET; 

        if (!localSecret || incomingSecret !== localSecret) {
            return NextResponse.json({ error: "Forbidden: Invalid Internal Secret" }, { status: 403 });
        }

        // 2. Safe JSON parsing
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        // Extract userId along with metadata from the request body
        const { userId, url, modelPath, fileSize, fileType } = body;

        // 3. Validation guard (Now checking userId too, since auth() won't provide it)
        if (!userId || !url || !modelPath || !fileSize || !fileType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // 4. Construct payload
        const draftConfigurator = {
            id: crypto.randomUUID(),
            draft: {
                quantity: 1,
                model: { url },
                modules: []
            },
            published: null,
            builder_config: {
                meshes: []
            }
        };
        // 5. Execute core business logic
        const configurator = await createServerConfiguratorAction(
            draftConfigurator, 
            fileSize, 
            fileType, 
            modelPath,
            userId
        );
        
        return NextResponse.json({
            configuratorId: configurator.id,
            url,
        }, { status: 201 });

    } catch (err) {
        console.error("Configurator creation failed:", err);
        return NextResponse.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}

