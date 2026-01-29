'use client'

import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export function LoginForm() {
    return (
        <div className="w-full max-w-[440px] flex flex-col gap-8">
            {/* Branding */}
            <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-white/60 text-xs tracking-[0.2em] font-medium uppercase border border-white/20 px-2 py-1 font-mono">
                    Skill-Trade
                </span>
            </div>

            {/* Headline */}
            <div className="text-center space-y-2">
                <h2 className="text-white text-4xl font-bold tracking-tight font-heading">LOG IN</h2>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4 mt-2">
                <button className="flex items-center justify-center gap-3 h-12 bg-transparent border border-white/20 hover:border-primary hover:bg-white/5 text-white transition-colors group">
                    <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <span className="text-sm font-bold tracking-wide group-hover:text-primary transition-colors font-heading">GOOGLE</span>
                </button>
                <button className="flex items-center justify-center gap-3 h-12 bg-transparent border border-white/20 hover:border-primary hover:bg-white/5 text-white transition-colors group">
                    <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-sm font-bold tracking-wide group-hover:text-primary transition-colors font-heading">LINKEDIN</span>
                </button>
            </div>

            {/* Divider */}
            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#121212] px-4 text-white/40 font-medium tracking-widest font-mono">Or continue with email</span>
                </div>
            </div>

            {/* Form */}
            <form action="#" className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1 group">
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 group-focus-within:text-primary transition-colors font-mono" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <input
                            autoComplete="email"
                            className="block w-full bg-transparent border-0 border-b border-white/30 text-white placeholder-white/20 focus:border-primary focus:ring-0 sm:text-lg px-0 py-3 transition-colors duration-200 font-mono"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            required
                            type="email"
                        />
                        <Mail className="absolute right-0 top-3 text-white/30 w-5 h-5" />
                    </div>
                </div>

                <div className="space-y-1 group">
                    <div className="flex justify-between items-baseline">
                        <label className="block text-xs font-bold uppercase tracking-wider text-white/60 group-focus-within:text-primary transition-colors font-mono" htmlFor="password">
                            Password
                        </label>
                        <a className="text-xs text-white/40 hover:text-primary transition-colors hover:underline font-mono" href="#">Forgot?</a>
                    </div>
                    <div className="relative">
                        <input
                            autoComplete="current-password"
                            className="block w-full bg-transparent border-0 border-b border-white/30 text-white placeholder-white/20 focus:border-primary focus:ring-0 sm:text-lg px-0 py-3 transition-colors duration-200 font-mono"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            type="password"
                        />
                        <Lock className="absolute right-0 top-3 text-white/30 w-5 h-5" />
                    </div>
                </div>

                <div className="pt-4">
                    <button className="flex w-full justify-center bg-primary p-4 text-sm font-bold uppercase tracking-wider text-black shadow-none hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 font-heading" type="submit">
                        Enter Dashboard
                    </button>
                </div>
            </form>

            <div className="text-center pt-4">
                <p className="text-white/40 text-sm font-mono">
                    Don&apos;t have an account?
                    <Link className="font-bold text-primary hover:text-white hover:underline decoration-1 underline-offset-4 ml-1 transition-colors" href="/signup">Sign up.</Link>
                </p>
            </div>
        </div>
    )
}
