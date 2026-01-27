
'use client'

import { ChevronDown, ArrowUpDown, LayoutGrid, List } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import { SERVICES_DATA } from '@/lib/services-data'

export function ServiceFilters() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const currentCategory = searchParams.get('category')
    const currentSort = searchParams.get('sort')
    const currentView = searchParams.get('view') || 'grid'

    // Extract unique categories from data
    const categories = Array.from(new Set(SERVICES_DATA.map(s => s.category || 'Other'))).sort()

    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)

    const updateParam = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        replace(`${pathname}?${params.toString()}`)
        setIsCategoryOpen(false)
        setIsSortOpen(false)
    }

    return (
        <div className="sticky top-[73px] z-40 bg-background/95 backdrop-blur-sm border-y border-white/10">
            <div className="max-w-[1400px] mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
                {/* Fixed: Removed overflow-x-auto to allow dropdowns to show */}
                <div className="flex items-center gap-4 py-1">

                    {/* Category Filter */}
                    <div className="relative group">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors font-mono ${currentCategory ? 'text-primary' : 'text-white hover:text-primary'}`}
                        >
                            {currentCategory || 'Category'} <ChevronDown className="w-4 h-4" />
                        </button>

                        {isCategoryOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsCategoryOpen(false)} />
                                <div className="absolute top-full left-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 shadow-xl z-50 flex flex-col py-1">
                                    <button
                                        onClick={() => updateParam('category', null)}
                                        className="text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors font-mono"
                                    >
                                        All Categories
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => updateParam('category', cat)}
                                            className={`text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors font-mono ${currentCategory === cat ? 'text-primary' : 'text-white'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                </div>

                <div className="flex items-center gap-4 ml-auto">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white whitespace-nowrap transition-colors font-mono"
                        >
                            Sort by: <span className="text-white">{currentSort === 'price-asc' ? 'Low Price' : currentSort === 'price-desc' ? 'High Price' : 'Recommended'}</span>
                            <ArrowUpDown className="w-4 h-4" />
                        </button>

                        {isSortOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsSortOpen(false)} />
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 shadow-xl z-50 flex flex-col py-1">
                                    <button
                                        onClick={() => updateParam('sort', null)}
                                        className="text-left px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors font-mono"
                                    >
                                        Recommended
                                    </button>
                                    <button
                                        onClick={() => updateParam('sort', 'price-asc')}
                                        className={`text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors font-mono ${currentSort === 'price-asc' ? 'text-primary' : 'text-white'}`}
                                    >
                                        Price: Low to High
                                    </button>
                                    <button
                                        onClick={() => updateParam('sort', 'price-desc')}
                                        className={`text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors font-mono ${currentSort === 'price-desc' ? 'text-primary' : 'text-white'}`}
                                    >
                                        Price: High to Low
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* View Toggle */}
                    <div className="flex border border-white/10 rounded-none overflow-hidden">
                        <button
                            onClick={() => updateParam('view', 'grid')}
                            className={`p-1.5 transition-colors ${currentView !== 'list' ? 'bg-white/10 text-primary' : 'bg-background text-white/50 hover:bg-white/10 hover:text-white'}`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => updateParam('view', 'list')}
                            className={`p-1.5 transition-colors ${currentView === 'list' ? 'bg-white/10 text-primary' : 'bg-background text-white/50 hover:bg-white/10 hover:text-white'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
