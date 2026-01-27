"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

const FAQS: FAQItem[] = [
    {
        question: "Refunding Unused Tokens",
        answer:
            "Unused tokens can be refunded to your original payment method at any time. A small processing fee of 2% applies to cover banking charges. Funds are released from escrow immediately upon request approval.",
    },
    {
        question: "Token Expiry Dates",
        answer:
            "Tokens purchased on Skill-Trade do not expire as long as your account remains active. If an account is dormant for more than 12 months, we will notify you before any administrative fees are applied to the balance.",
    },
    {
        question: "Escrow Security Measures",
        answer:
            "All funds converted into tokens are held in a segregated client trust account regulated by EU financial authorities. Freelancers are only paid once you explicitly approve the work, ensuring 100% security for your capital.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="w-full max-w-4xl mx-auto flex flex-col gap-8">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-center md:text-left border-l-4 border-primary pl-4">
                Common Questions
            </h2>
            <div className="flex flex-col gap-0 border-t border-gray-800">
                {FAQS.map((faq, index) => (
                    <div key={index} className="border-b border-gray-800">
                        <button
                            onClick={() => toggleIndex(index)}
                            className="w-full flex cursor-pointer items-center justify-between py-6 pr-4 list-none hover:bg-white/5 transition-colors text-left"
                        >
                            <span
                                className={`text-lg font-bold uppercase tracking-wide transition-colors ${openIndex === index ? "text-primary" : "text-white"
                                    }`}
                            >
                                {faq.question}
                            </span>
                            <motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDown
                                    className={`w-6 h-6 transition-colors ${openIndex === index ? "text-primary" : "text-white"
                                        }`}
                                />
                            </motion.div>
                        </button>
                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-6 text-gray-400 leading-relaxed max-w-2xl">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
