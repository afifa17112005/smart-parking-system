
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import React from 'react';
import { Car } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden font-sans">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px]" />
            </div>

            {/* Navigation / Header */}
            <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center transform rotate-3 shadow-lg shadow-blue-500/20 group-hover:rotate-0 transition-transform duration-300">
                        <Car className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">ParkSmart</span>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/map')}
                        className="px-5 py-2 text-sm font-medium text-white bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-all backdrop-blur-sm"
                    >
                        Launch Map
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20 backdrop-blur-md">
                        🚀 The Future of Smart Parking
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
                        Find Your Perfect Spot <br className="hidden md:block" />
                        <span className="text-blue-400">Instantly.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Stop circling. Start parking. Real-time availability, intelligent routing, and seamless navigation for the modern driver.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/map')}
                            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95"
                        >
                            <span className="flex items-center gap-2">
                                Get Started Now
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                        <button className="px-8 py-4 text-slate-300 hover:text-white font-medium transition-colors">
                            Learn More
                        </button>
                    </div>
                </motion.div>

                {/* Feature Cards / Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto w-full"
                >
                    <FeatureCard
                        icon="📍"
                        title="Real-Time Tracking"
                        description="Live updates on parking availability across the city."
                    />
                    <FeatureCard
                        icon="🛡️"
                        title="Secure Locations"
                        description="Verified parking spots with 24/7 surveillance data."
                    />
                    <FeatureCard
                        icon="⚡"
                        title="Instant Booking"
                        description="Reserve your spot in seconds before you arrive."
                    />
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-8 text-center text-slate-500 text-sm">
                <p>© 2024 ParkSmart Systems. All rights reserved.</p>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default backdrop-blur-sm group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}
