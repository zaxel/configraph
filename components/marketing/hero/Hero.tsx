import EmbedCard from './EmbedCard';
import ConfiguratorCard from './ConfiguratorCard';
import DashboardCard from './DashboardCard.tsx';
import HeroVisual from './HeroVisual';

const Hero = () => {
    return (
        <section id="hero" className="relative mb-[500px] md:mb-0 bg-secondary/40">
            <div className="h-full mx-auto flex flex-col max-w-7xl gap-16 px-6 py-2 xs:py-10 lg:py-16 lg:flex-row items-center ">
                <div className="flex flex-col justify-center w-full lg:w-1/3">
                    <HeroVisual />
                </div>

                <div className="relative w-full lg:w-2/3 aspect-7/4">
                    {/* Dashboard Screenshot */}
                    <DashboardCard />
                    

                    {/* Configurator */}
                    <ConfiguratorCard />


                    {/* Embed Card */}
                    <EmbedCard />
                </div>
            </div>
        </section>
    );
};

export default Hero;