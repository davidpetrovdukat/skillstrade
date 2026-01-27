'use client'

import { motion } from 'framer-motion'

export function Marquee() {
    const text = "VERIFIED EXPERTS • SECURE PAYMENTS • 24/7 SUPPORT • "
    const repeatedText = Array(10).fill(text).join("")

    return (
        <div className="bg-black border-b border-white/20 py-4 overflow-hidden relative z-20">
            <div className="flex whitespace-nowrap overflow-hidden">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <span className="text-primary font-mono text-sm md:text-base tracking-widest mx-4">
                        {repeatedText}
                    </span>
                    <span className="text-primary font-mono text-sm md:text-base tracking-widest mx-4">
                        {repeatedText}
                    </span>
                </motion.div>
            </div>
        </div>
    )
}
