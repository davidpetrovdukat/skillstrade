import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const services = [
    {
        id: "01",
        title: "Brand\nIdentity",
        image: "/services/brand_identity.webp",
        link: "/services/user_01_arthur"
    },
    {
        id: "02",
        title: "Webflow\nDev",
        image: "/services/webflow.webp",
        link: "/services/user_07_marcus"
    },
    {
        id: "03",
        title: "SEO\nAudit",
        image: "/services/seo.webp", // Fixed image path
        link: "/services/user_13_claire"
    },
    {
        id: "04",
        title: "Motion\nDesign",
        image: "/services/3d_motion.webp", // Fixed image path
        link: "/services/user_03_julien"
    },
    {
        id: "05",
        title: "Copy\nWriting",
        image: "/services/copywriting.webp",
        link: "/services/user_16_sarah" // Placeholder, will update if grep finds different
    }
]

export function Services() {
    return (
        <section className="border-b border-white/20 bg-background">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service, index) => (
                    <Link
                        href={service.link}
                        key={index}
                        className={`
              aspect-square border-b border-white/20 relative group cursor-pointer overflow-hidden block
              ${index === 0 || index === 3 ? 'lg:border-b-0' : ''} 
              lg:border-r border-r-white/20
            `}
                    >
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <span className="text-xs font-mono text-white/60 group-hover:text-white transition-colors border border-white/20 px-2 py-1 bg-black/20 backdrop-blur-sm">
                                    {service.id}
                                </span>
                            </div>
                            <h3 className="text-3xl font-bold uppercase group-hover:translate-x-2 transition-transform duration-300 font-heading whitespace-pre-line text-white">
                                {service.title}
                            </h3>
                        </div>
                    </Link>
                ))}

                {/* View All Card */}
                <Link href="/services" className="aspect-square bg-primary p-8 flex flex-col justify-between hover:bg-white hover:text-black transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start">
                        <ArrowUpRight className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-3xl font-bold uppercase text-black group-hover:translate-x-2 transition-transform duration-300 font-heading">
                        View All<br />Services
                    </h3>
                </Link>
            </div>
        </section>
    )
}
