import { Copy } from 'lucide-react';

const EmbedCard = () => {
    return (
        <div className="absolute -top-10 right-4 md:top-auto md:-bottom-14 md:-left-4 w-[200px] md:w-[320px] rounded-2xl bg-zinc-950 p-3 md:p-5 text-white shadow-2xl z-10">

            <div className="mb-2 md:mb-4 flex items-center justify-between">
                <span className="text-[8px] md:text-sm">
                    Embed Code
                </span>

                <button className="inline-flex items-center gap-1 bg-zinc-800 text-white/80 px-2 py-1 rounded-lg text-[7px] md:text-xs cursor-pointer">
                    <Copy size={10} /> Copy
                </button>
            </div>

            <pre className="text-[6px] md:text-[10px] leading-relaxed font-mono text-[oklch(0.85_0.15_140)]">
                {`<iframe
    src="https://configraph.com/embed/8187c99f"
    width="100%"
    height="600"
    frameborder="0"
    allowfullscreen>
</iframe>`}
            </pre>

        </div>
    );
};

export default EmbedCard;