'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent')
        if (!consent) {
            setIsVisible(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted')
        setIsVisible(false)
    }

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined')
        setIsVisible(false)
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto bg-[#121212] border border-white/20 p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="space-y-4 max-w-2xl">
                            <h3 className="text-white text-sm font-bold uppercase tracking-widest font-heading">
                                COOKIE PREFERENCES
                            </h3>
                            <p className="text-white/60 text-xs md:text-sm font-mono leading-relaxed">
                                We use cookies to enhance your experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies. Read our <Link href="/legal/cookies" className="text-primary hover:underline underline-offset-4 decoration-primary/30">Cookie Policy</Link>.
                            </p>
                        </div>

                        <div className="flex flex-row gap-4 w-full md:w-auto">
                            <button
                                onClick={handleDecline}
                                className="flex-1 md:flex-none h-10 px-6 border border-white/20 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-colors font-heading"
                            >
                                Decline
                            </button>
                            <button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none h-10 px-6 bg-primary text-black hover:bg-white border border-primary hover:border-white text-xs font-bold uppercase tracking-wider transition-colors font-heading"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
