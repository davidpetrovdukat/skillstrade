'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { ArrowRight, Lock, Verified, Phone, CalendarDays, ChevronDown } from 'lucide-react';
// import { cn } from '@/lib/utils'; // Not used yet

const RESTRICTED_COUNTRIES = [
    "Sudan", "Democratic Republic of the Congo", "Iran", "Mali", "Myanmar", "North Korea",
    "South Sudan", "Syria", "Yemen", "Afghanistan", "Belarus", "Central African Republic",
    "Cuba", "Haiti", "Iraq", "Russia", "Somalia", "Venezuela", "Zimbabwe"
];

// List of common countries for the dropdown (simplified for MVP, ideally this comes from a library/API)
// Excluding restricted ones.
const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Germany", "France", "Australia",
    "Japan", "China", "India", "Brazil", "Mexico", "Italy", "Spain", "Netherlands",
    "Switzerland", "Sweden", "Singapore", "United Arab Emirates", "Ukraine", "Poland"
].filter(c => !RESTRICTED_COUNTRIES.includes(c)).sort();


export function SignUpForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        dob: '',
        street: '',
        country: '',
        city: '',
        postcode: '',
        terms: false
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { firstName, lastName, phone, dob, street, country, city, postcode, terms } = formData;
        const isValid =
            firstName.trim() !== '' &&
            lastName.trim() !== '' &&
            phone.trim() !== '' &&
            dob.trim() !== '' &&
            street.trim() !== '' &&
            country.trim() !== '' &&
            city.trim() !== '' &&
            postcode.trim() !== '' &&
            terms === true;

        setIsFormValid(isValid);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, terms: e.target.checked }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('Form submitted:', formData);
            // TODO: Implement actual registration logic
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
            {/* Row 1: Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                    <input
                        className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                        id="firstName"
                        placeholder=" "
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                        htmlFor="firstName">
                        First Name
                    </label>
                </div>
                <div className="group relative">
                    <input
                        className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                        id="lastName"
                        placeholder=" "
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                        htmlFor="lastName">
                        Last Name
                    </label>
                </div>
            </div>

            {/* Row 2: Contact & DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                    <input
                        className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                        id="phone"
                        placeholder=" "
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                        htmlFor="phone">
                        Phone Number
                    </label>
                    {/* Placeholder for icon if needed, using standard text for now or Lucide */}
                    {/* <span className="absolute right-0 top-3 text-zinc-600 material-symbols-outlined text-[18px]">call</span> */}
                </div>
                <div className="group relative">
                    <input
                        className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300 [&::-webkit-calendar-picker-indicator]:invert"
                        id="dob"
                        type="date"
                        placeholder=" "
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                        htmlFor="dob">
                        Date of Birth
                    </label>
                </div>
            </div>

            {/* Section Divider */}
            <div className="pt-4">
                <span className="text-xs font-bold text-zinc-500 tracking-[0.2em] uppercase border-l-2 border-zinc-700 pl-3">
                    Residential Address
                </span>
            </div>

            {/* Row 3: Street & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                    <input
                        className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                        id="street"
                        placeholder=" "
                        type="text"
                        value={formData.street}
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                        htmlFor="street">
                        Street Address
                    </label>
                </div>

                {/* Brutalist Select */}
                <div className="group relative">
                    <select
                        className="peer w-full appearance-none bg-transparent border-0 border-b-2 border-zinc-700 text-white focus:border-primary focus:ring-0 py-3 px-0 text-lg cursor-pointer transition-colors duration-300"
                        id="country"
                        value={formData.country}
                        onChange={handleChange}
                    >
                        <option className="bg-[#1a1a1a] text-zinc-500" value="" disabled>Select Country</option>
                        {COUNTRIES.map(country => (
                            <option key={country} className="bg-[#1a1a1a]" value={country}>{country}</option>
                        ))}
                    </select>
                    <label
                        className="absolute left-0 -top-3.5 text-primary text-xs font-medium uppercase tracking-wide hidden peer-focus:block"
                        htmlFor="country">
                        Country
                    </label>
                    <div className="absolute right-0 top-4 pointer-events-none text-zinc-500 peer-focus:text-primary transition-colors">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Row 4: City & Post Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                    <input
                        className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                        id="city"
                        placeholder=" "
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                        htmlFor="city">
                        City
                    </label>
                </div>
                <div className="group relative">
                    <input
                        className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                        id="postcode"
                        placeholder=" "
                        type="text"
                        value={formData.postcode}
                        onChange={handleChange}
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                        htmlFor="postcode">
                        Post Code
                    </label>
                </div>
            </div>

            {/* Row 5: T&Cs Checkbox */}
            <div className="flex items-start gap-3 mt-4">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={formData.terms}
                        onChange={handleCheckboxChange}
                        className="
                            peer appearance-none h-5 w-5 border-2 border-zinc-600 bg-transparent cursor-pointer 
                            checked:border-primary checked:bg-primary transition-all duration-200
                        "
                    />
                    {/* Tick mark emulation (or relying on standard accent-color if browser supports) */}
                    <div className="pointer-events-none absolute inset-0 hidden peer-checked:flex items-center justify-center text-black">
                        {/* SVG Checkmark */}
                        <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>

                <label className="text-sm text-zinc-400 cursor-pointer select-none leading-relaxed" htmlFor="terms">
                    I agree to the <Link className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors" href="/legal/terms">Terms of Service</Link> and <Link className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-colors" href="/legal/privacy">Privacy Policy</Link>. I understand that my application is subject to review.
                </label>
            </div>

            {/* Action */}
            <div className="mt-6 flex flex-col gap-6">
                <button
                    disabled={!isFormValid}
                    className={`
                        group relative w-full h-14 font-bold text-base uppercase tracking-wider transition-all duration-300 flex items-center justify-center overflow-hidden
                        ${isFormValid
                            ? 'bg-primary text-black hover:bg-white active:scale-[0.99] cursor-pointer'
                            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'}
                    `}
                    type="submit">
                    <span className="relative z-10 flex items-center gap-2">
                        Complete Registration
                        <ArrowRight className={`w-5 h-5 transition-transform ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
                    </span>
                </button>
                <div className="text-center">
                    <Link
                        className="text-zinc-400 text-xs font-medium uppercase tracking-wide hover:text-white transition-colors"
                        href="/login">
                        Already have an account? <span className="text-white border-b border-zinc-600 pb-0.5 hover:border-primary">Log In</span>
                    </Link>
                </div>
            </div>
        </form>
    );
}
