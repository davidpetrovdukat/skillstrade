import Image from 'next/image';

export default function TrustRow() {
    return (
        <section className="w-full pt-8 pb-12 border-t border-gray-800 mt-8">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {/* Visa - colorful logo */}
                <div className="h-8 flex items-center w-16 relative">
                    <Image
                        src="/visa-logo.svg"
                        alt="Visa"
                        fill
                        className="object-contain object-center"
                    />
                </div>
                {/* Mastercard - colorful logo */}
                <div className="h-8 flex items-center w-12 relative">
                    <Image
                        src="/mastercard-logo.svg"
                        alt="Mastercard"
                        fill
                        className="object-contain object-center"
                    />
                </div>
                {/* PCI DSS - colorful logo */}
                <div className="h-8 flex items-center w-20 relative">
                    <Image
                        src="/pci-dss-logo.svg"
                        alt="PCI DSS"
                        fill
                        className="object-contain object-center"
                    />
                </div>
                {/* 3D Secure */}
                <div className="h-8 flex items-center w-14 relative">
                    <Image
                        src="/3ds.png"
                        alt="3D Secure"
                        fill
                        className="object-contain object-center"
                    />
                </div>
            </div>
        </section>
    );
}
