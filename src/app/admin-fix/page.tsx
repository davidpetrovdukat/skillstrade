'use client';

import { fixDashboardData } from '@/actions/admin-fix';
import { useState } from 'react';

export default function AdminFixPage() {
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleFix = async () => {
        setLoading(true);
        setStatus('Processing...');
        try {
            const result = await fixDashboardData();
            setStatus(result.success ? `Success: ${result.message}` : `Error: ${result.message}`);
        } catch (err: any) {
            setStatus(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
            <div className="border border-white/20 p-8 max-w-md w-full text-center space-y-6">
                <h1 className="text-xl font-bold uppercase text-[#D3E97A]">Admin Data Fix</h1>
                <p className="text-sm text-gray-400">
                    Run this to repair data for <strong>nikitajermolajevs1@outlook.com</strong>.
                </p>
                <button
                    onClick={handleFix}
                    disabled={loading}
                    className="w-full bg-[#D3E97A] text-black font-bold py-3 uppercase hover:bg-white transition-colors disabled:opacity-50"
                >
                    {loading ? 'Running Fix...' : 'RUN FIX SCRIPT'}
                </button>
                {status && (
                    <div className="p-4 border border-white/10 bg-white/5 text-xs text-left">
                        {status}
                    </div>
                )}
            </div>
        </div>
    );
}
