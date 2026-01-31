'use client';

import { useState } from 'react';
import { ChevronDown, ArrowRight, Loader2 } from 'lucide-react';
import { sendJoinApplication } from '@/actions/join';

// Countries and Restricted list (Duplicated from SignUpForm for safety/isolation)
const RESTRICTED_COUNTRIES = [
    "Sudan", "Democratic Republic of the Congo", "Iran", "Mali", "Myanmar", "North Korea",
    "South Sudan", "Syria", "Yemen", "Afghanistan", "Belarus", "Central African Republic",
    "Cuba", "Haiti", "Iraq", "Russia", "Somalia", "Venezuela", "Zimbabwe"
];

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia",
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

const SKILLS = [
    "Strategic Brand Identity",
    "SaaS UI/UX Design",
    "3D Motion Graphics",
    "Industrial Design Renders",
    "Pitch Deck Design",
    "Mobile App UI/UX",
    "Webflow Development",
    "React / Next.js Development",
    "Smart Contracts & Web3",
    "Shopify Expert",
    "Python Automation",
    "Cybersecurity Audits",
    "Technical SEO Audits",
    "Other"
];

export function JoinForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        portfolioUrl: '',
        linkedinUrl: '',
        country: '',
        languages: '',
        primarySkill: '',
        otherSkill: '',
        whyYou: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await sendJoinApplication(formData);
            if (result.success) {
                setIsSuccess(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error submitting form.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isOtherSkill = formData.primarySkill === 'Other';

    if (isSuccess) {
        return (
            <div className="w-full max-w-[600px] border border-primary/20 bg-primary/5 p-12 text-center animate-in fade-in duration-500">
                <h3 className="text-3xl font-bold uppercase tracking-tight font-heading text-primary mb-4">
                    Application Received
                </h3>
                <p className="text-white/60 font-mono text-lg leading-relaxed">
                    We have received your details. Our team will review your profile and get back to you shortly.
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-[600px]">
            {/* Full Name */}
            <label className="flex flex-col w-full gap-2 group">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    Full Name
                </span>
                <input
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                    placeholder="e.g. Alex Chen"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                />
            </label>

            {/* Email */}
            <label className="flex flex-col w-full gap-2 group">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    Email Address
                </span>
                <input
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                    placeholder="alex@example.com"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>

            {/* Country */}
            <label className="flex flex-col w-full gap-2 group relative">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    Country
                </span>
                <select
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none appearance-none cursor-pointer font-display [&>option]:bg-black"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                >
                    <option disabled value="">Select your country</option>
                    {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <div className="absolute right-0 bottom-4 pointer-events-none text-white/40">
                    <ChevronDown className="w-5 h-5" />
                </div>
            </label>

            {/* Languages */}
            <label className="flex flex-col w-full gap-2 group">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    Languages
                </span>
                <input
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                    placeholder="e.g. English, German, Spanish"
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                />
            </label>

            {/* Portfolio URL */}
            <label className="flex flex-col w-full gap-2 group">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    Portfolio URL
                </span>
                <input
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                    placeholder="https://your-work.com"
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                />
            </label>

            {/* LinkedIn Profile */}
            <label className="flex flex-col w-full gap-2 group">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    LinkedIn Profile
                </span>
                <input
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                    placeholder="https://linkedin.com/in/..."
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                />
            </label>

            {/* Primary Skill Dropdown */}
            <label className="flex flex-col w-full gap-2 group relative">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    Primary Skill
                </span>
                <select
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none appearance-none cursor-pointer font-display [&>option]:bg-black"
                    name="primarySkill"
                    value={formData.primarySkill}
                    onChange={handleChange}
                >
                    <option disabled value="">Select your craft</option>
                    {SKILLS.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                    ))}
                </select>
                <div className="absolute right-0 bottom-4 pointer-events-none text-white/40">
                    <ChevronDown className="w-5 h-5" />
                </div>
            </label>

            {/* Other Skill Input */}
            {isOtherSkill && (
                <label className="flex flex-col w-full gap-2 group animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                        Specify Skill
                    </span>
                    <input
                        className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors rounded-none font-display"
                        placeholder="e.g. AI Prompt Engineering"
                        type="text"
                        name="otherSkill"
                        value={formData.otherSkill}
                        onChange={handleChange}
                    />
                </label>
            )}

            {/* Why You Textarea */}
            <label className="flex flex-col w-full gap-2 group">
                <span className="text-xs uppercase tracking-widest text-white/40 font-bold group-focus-within:text-primary transition-colors font-heading">
                    Why You?
                </span>
                <textarea
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-lg text-white placeholder-white/20 focus:outline-none focus:ring-0 focus:border-primary transition-colors resize-none rounded-none font-display"
                    placeholder="Tell us about your most complex project..."
                    rows={4}
                    name="whyYou"
                    value={formData.whyYou}
                    onChange={handleChange}
                ></textarea>
            </label>

            {/* Submit Button */}
            <button
                className={`mt-8 w-full bg-primary hover:bg-white text-black font-bold text-lg py-5 px-8 rounded-none uppercase tracking-widest transition-colors duration-200 font-heading flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    "Apply for Review"
                )}
            </button>
        </form>
    );
}
