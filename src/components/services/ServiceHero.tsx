
'use client'

import { Search, ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState } from 'react'

export function ServiceHero() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const [searchValue, setSearchValue] = useState(searchParams.get('search') || '')

    const handleSearch = useCallback((term: string) => {
        setSearchValue(term)
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }
        replace(`${pathname}?${params.toString()}`)
    }, [pathname, replace, searchParams])

    const handleTagClick = (tag: string) => {
        handleSearch(tag)
    }

    return (
        <section className="flex flex-col items-center justify-center px-4 py-16 md:py-24 bg-background border-b border-white/20 relative overflow-hidden">
            {/* Abstract Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-background to-background pointer-events-none" />

            <div className="max-w-4xl w-full text-center flex flex-col items-center gap-6 relative z-10">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] font-heading">
                    Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Services</span>
                </h1>
                <p className="text-white/60 text-lg md:text-xl font-normal max-w-lg mx-auto font-mono">
                    Fixed-price packages. Delivered in days. Paid in Tokens.
                </p>

                <div className="relative w-full max-w-xl mt-4 group">
                    <Search className="absolute left-0 bottom-4 text-white/50 group-focus-within:text-primary transition-colors w-6 h-6" />
                    <input
                        className="w-full bg-transparent border-b-2 border-white/20 py-3 pl-10 pr-12 text-xl md:text-2xl text-white placeholder-white/30 focus:outline-none focus:border-primary focus:ring-0 rounded-none transition-colors font-display"
                        placeholder="Search for services (e.g. Webflow, Branding)"
                        type="text"
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button className="absolute right-0 bottom-3 text-primary hover:text-white transition-colors">
                        <ArrowRight className="w-8 h-8" />
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {['Branding', 'Webflow', 'Copywriting', 'Ads'].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className="px-4 py-1.5 rounded-none bg-white/5 border border-white/10 hover:border-primary hover:text-primary transition-colors text-sm text-white/60 font-mono cursor-pointer"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
