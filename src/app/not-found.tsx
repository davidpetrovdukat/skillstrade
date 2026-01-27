import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
    return (
        <div className="bg-background dark:bg-background text-white min-h-screen flex flex-col relative overflow-hidden font-display selection:bg-primary selection:text-black">
            <Header />

            {/* Ambient Background Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
            </div>

            {/* Main Container */}
            <main className="flex-grow flex flex-col items-center justify-center w-full relative z-10 p-6">
                <div className="flex flex-col items-center max-w-7xl w-full">
                    {/* 404 Visual: Hollow with Glitch/Ghost Offset */}
                    <div aria-label="404 Error Graphic"
                        className="relative w-full flex justify-center items-center py-10 sm:py-16 select-none mix-blend-screen">
                        {/* Ghost Layer (Offset) */}
                        <span aria-hidden="true"
                            className="font-display font-bold text-[140px] sm:text-[220px] md:text-[300px] lg:text-[400px] leading-[0.8] tracking-tighter text-primary/30 absolute animate-glitch blur-[1px]">
                            404
                        </span>
                        {/* Main Hollow Layer */}
                        <span
                            className="font-display font-bold text-[140px] sm:text-[220px] md:text-[300px] lg:text-[400px] leading-[0.8] tracking-tighter text-stroke-white relative z-10">
                            404
                        </span>
                    </div>

                    {/* Error Message Text */}
                    <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mb-16 z-20">
                        <h1 className="text-white font-display font-bold text-3xl sm:text-5xl tracking-tighter uppercase">
                            System Error.
                        </h1>
                        <p className="text-white/60 font-body text-base sm:text-lg font-light leading-relaxed max-w-lg">
                            You've reached the void. This page doesn't exist or has been deleted.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto z-20 justify-center">
                        {/* Primary Button */}
                        <Link
                            href="/"
                            className="group relative flex items-center justify-center px-10 h-14 bg-primary text-black hover:bg-white hover:scale-[1.02] transition-all duration-200 rounded-none w-full sm:w-auto min-w-[220px]">
                            <span className="font-display font-bold text-sm tracking-widest uppercase">Return Home</span>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
