import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background text-white flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
                {/* LEFT SIDE: Image Panel */}
                <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black min-h-[600px]">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 ease-out"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBNxGdKlKtF43-jdWZDh4S2KJrQ_yOX_mzwy8Uoa9c1EZ0ihhCkzjDHzIuLEfWqLoIec-9j0Kj137TAyRF7rs1KEQRRUas6gYDeqzmm3cDjRjT2OoIWBKQo-wwM8ArTAmKTLN2pjYc2qLhTKxktIC_njzcvQA5iP8-nlxhhh9FVEryFO93zZs8QSfpHEaQCxKzDf4D_qqH76mlBM8G7V9gDchF1Ra6L9_Tia6HnhPGnG-LlELIYlKNM033PHMc6zal-cCQdgpmelEqJ')" }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col justify-end h-full w-full p-12 xl:p-20 mt-auto">
                        <h1 className="text-white text-5xl xl:text-6xl font-bold leading-tight tracking-tight max-w-lg font-heading">
                            Welcome back to the elite network.
                        </h1>
                        <div className="mt-6 w-24 h-1 bg-primary"></div>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form */}
                <div className="w-full lg:w-1/2 bg-[#121212] flex flex-col items-center justify-center relative px-6 md:px-12 py-10">
                    <LoginForm />
                </div>
            </main>
            <Footer />
        </div>
    )
}
