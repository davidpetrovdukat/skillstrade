'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { registerUser } from '@/actions/auth';

import { ArrowRight, Lock, Verified, Phone, CalendarDays, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
// import { cn } from '@/lib/utils'; // Not used yet

const RESTRICTED_COUNTRIES = [
    "Sudan", "Democratic Republic of the Congo", "Iran", "Mali", "Myanmar", "North Korea",
    "South Sudan", "Syria", "Yemen", "Afghanistan", "Belarus", "Central African Republic",
    "Cuba", "Haiti", "Iraq", "Russia", "Somalia", "Venezuela", "Zimbabwe"
];

// List of common countries for the dropdown (simplified for MVP, ideally this comes from a library/API)
// Excluding restricted ones.
const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Holy See", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
].filter(c => !RESTRICTED_COUNTRIES.includes(c)).sort();


export function SignUpForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const { email, password, confirmPassword, firstName, lastName, phone, dob, street, country, city, postcode, terms } = formData;
        const isValid =
            email.trim() !== '' &&
            password.trim() !== '' &&
            confirmPassword.trim() !== '' &&
            password === confirmPassword &&
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        setError('');

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value.toString());
            });

            // Call server action directly
            const result = await registerUser({}, formDataToSend);

            if (result.success) {
                router.push('/login?registered=true');
            } else {
                setError(result.error || 'Registration failed. Please try again.');
                setIsSubmitting(false);
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-8">
            {/* Google Signup */}
            <button
                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                type="button"
                className="flex items-center justify-center gap-3 h-14 bg-transparent border border-white/20 hover:border-primary hover:bg-white/5 text-white transition-colors group w-full"
            >
                <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span className="text-sm font-bold tracking-wide group-hover:text-primary transition-colors font-heading uppercase">
                    Sign up with Google
                </span>
            </button>

            {/* Divider */}
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#121212] px-4 text-white/40 font-medium tracking-widest font-mono">Or register with email</span>
                </div>
            </div>

            {
                error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-none flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-bold font-mono">{error}</p>
                    </div>
                )
            }

            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                {/* Row 0: Email & Password */}
                <div className="flex flex-col gap-8">
                    <div className="group relative">
                        <input
                            className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                            id="email"
                            placeholder=" "
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label
                            className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                            htmlFor="email">
                            Email Address
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group relative">
                            <input
                                className="peer w-full bg-transparent border-0 border-b-2 border-zinc-700 text-white placeholder-transparent focus:border-primary focus:ring-0 py-3 px-0 text-lg transition-colors duration-300"
                                id="password"
                                placeholder=" "
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label
                                className="absolute left-0 -top-3.5 text-zinc-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-primary peer-focus:text-xs font-medium uppercase tracking-wide"
                                htmlFor="password">
                                Password
                            </label>
                        </div>
                        <div className="group relative">
                            <input
                                className={`peer w-full bg-transparent border-0 border-b-2 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-zinc-700 focus:border-primary'} text-white placeholder-transparent focus:ring-0 py-3 px-0 text-lg transition-colors duration-300`}
                                id="confirmPassword"
                                placeholder=" "
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <label
                                className={`absolute left-0 -top-3.5 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'text-red-500' : 'text-zinc-500'} text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'peer-focus:text-red-500' : 'peer-focus:text-primary'} font-medium uppercase tracking-wide`}
                                htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                        </div>
                    </div>
                </div>

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
                            lang="en-GB"
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
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Complete Registration
                                    <ArrowRight className={`w-5 h-5 transition-transform ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
                                </>
                            )}
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
        </div >
    );
}
