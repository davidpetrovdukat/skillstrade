import { Plus, ShoppingCart, Check } from 'lucide-react';
import { Addon } from '@/lib/services-data';

interface AddonsSectionProps {
    addons: Addon[];
    selectedAddonIds: Set<string>;
    onToggleAddon: (id: string) => void;
}

export function AddonsSection({ addons, selectedAddonIds, onToggleAddon }: AddonsSectionProps) {
    if (!addons || addons.length === 0) return null;

    return (
        <section className="flex flex-col gap-6">
            <h3 className="text-white text-xl font-bold uppercase tracking-wide font-heading">
                Upgrades & Quick Tasks
            </h3>

            <div className="flex flex-col border-t border-white/10">
                {addons.map((addon) => {
                    const isSelected = selectedAddonIds.has(addon.id);
                    return (
                        <div
                            key={addon.id}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-white/10 transition-colors px-4 -mx-4 sm:mx-0 sm:px-0 ${isSelected ? 'bg-white/5' : 'hover:bg-white/5'}`}
                        >
                            <div className="flex flex-col gap-1">
                                <h4 className="text-white font-bold text-base">{addon.title}</h4>
                                <p className="text-white/50 text-sm">{addon.desc}</p>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-6 min-w-[200px]">
                                <div className="text-primary font-mono text-lg whitespace-nowrap">
                                    {addon.price_tokens.toLocaleString()} T
                                </div>

                                <button
                                    onClick={() => onToggleAddon(addon.id)}
                                    className={`text-xs font-bold px-4 py-2 uppercase tracking-wider transition-all flex items-center gap-2 ${isSelected
                                            ? 'bg-primary text-black hover:bg-white'
                                            : 'bg-white/5 hover:bg-primary text-white hover:text-black'
                                        }`}
                                >
                                    {isSelected ? (
                                        <>
                                            <Check className="w-3 h-3" />
                                            Added
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-3 h-3" />
                                            Add
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
