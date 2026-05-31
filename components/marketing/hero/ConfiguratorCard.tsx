const ConfiguratorCard = () => {
    return (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-120 md:left-auto md:translate-x-0 md:-right-4 md:-bottom-14 lg:-right-8 lg:bottom-auto lg:top-10 w-full xs:w-[430px] rounded-3xl border bg-white p-3 xs:p-6 shadow-2xl z-20">

            <div className="mb-4 flex items-center justify-between">
                <div>
                    <div className="font-semibold">
                        Running Shoe
                    </div>

                    <div className="text-sm text-zinc-500">
                        Interactive Preview
                    </div>
                </div>

                <div className="font-semibold">
                    $299
                </div>
            </div>
            <div className="w-full h-[375px] -mt-5">
                <iframe
                    className="w-full h-full border-0"
                    src={`${process.env.NEXT_PUBLIC_APP_URL}/embed/b4555bde-67f9-47f8-9531-f97ec5c81ef0`}
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default ConfiguratorCard;