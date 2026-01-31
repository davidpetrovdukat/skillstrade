import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShieldCheck } from "lucide-react";
import { connectMongo } from "@/lib/db";
import { Service } from "@/models/Service";
import { User } from "@/models/User";
import { Freelancer } from "@/models/Freelancer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { OrderForm } from "@/components/order/OrderForm";

export const dynamic = 'force-dynamic';

interface OrderPageProps {
    searchParams: Promise<{
        serviceId: string;
    }>;
}

export default async function OrderPage(props: OrderPageProps) {
    const searchParams = await props.searchParams;
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");

    await connectMongo();

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) redirect("/login");

    const serviceId = searchParams.serviceId;
    if (!serviceId) redirect("/services");

    const service = await Service.findById(serviceId).lean();
    if (!service) redirect("/services");

    const freelancer = await Freelancer.findById(service.freelancer).lean();

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-dark text-white font-display overflow-x-hidden">
            <Header />

            <main className="flex-1 w-full flex flex-col">
                {/* Page Header */}
                <div className="w-full px-6 py-12 md:px-12 lg:px-40 border-b border-white/10 bg-[#161811]">
                    <div className="max-w-[1280px] mx-auto">
                        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-2 text-white font-heading">
                            Review Your Order
                        </h1>
                        <div className="flex items-center gap-2 text-primary">
                            <ShieldCheck className="w-5 h-5" />
                            <p className="text-white/60 font-medium uppercase tracking-widest text-sm font-mono">
                                Tokens will be held in escrow until delivery.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="px-6 md:px-12 lg:px-40 py-12 flex-1">
                    <OrderForm
                        service={JSON.parse(JSON.stringify(service))}
                        user={JSON.parse(JSON.stringify(user))}
                        freelancer={JSON.parse(JSON.stringify(freelancer))}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}

