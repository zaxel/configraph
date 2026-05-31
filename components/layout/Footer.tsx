import Link from 'next/link';

const Footer = () => {
    return (
        <footer className='border-t border-zinc-200 bg-white/80 backdrop-blur'>
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <span>© {new Date().getFullYear()} Configraph</span>
                <div className="flex items-center gap-6">
                    <Link href="#" className="hover:text-foreground">Privacy</Link>
                    <Link href="#" className="hover:text-foreground">Terms</Link>
                    <Link href="mailto:sae11.z.alex@gmail.com" className="hover:text-foreground">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;