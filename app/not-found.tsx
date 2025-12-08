import Link from 'next/link'
import { ArrowLeft, AlertTriangle } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center relative overflow-hidden selection:bg-[#FF4B00] selection:text-white">
            {/* Background Grid */}
            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center p-12 border border-zinc-800 bg-zinc-950/80 backdrop-blur-sm max-w-3xl w-full mx-4">
                <div className="flex items-center gap-3 text-[#FF4B00] uppercase tracking-widest text-sm font-bold mb-12 animate-pulse">
                    <AlertTriangle className="w-5 h-5" />
                    <span>System Error // 404</span>
                </div>

                <h1 className="text-8xl md:text-9xl font-black uppercase tracking-tighter mb-2 text-transparent" style={{ WebkitTextStroke: "2px white" }}>
                    VOID
                </h1>

                <h2 className="text-2xl md:text-4xl font-bold uppercase mb-8 text-white">
                    Protocol Missing
                </h2>

                <p className="text-zinc-500 text-sm uppercase tracking-widest max-w-[400px] leading-relaxed mb-12">
                    The coordinates you entered do not correspond to any known sector in the system.
                </p>

                <Link
                    href="/"
                    className="group bg-[#FF4B00] hover:bg-white hover:text-black text-white px-10 py-5 text-sm font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-4 border border-[#FF4B00]"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Return to Base
                </Link>
            </div>

            {/* Decorative Details */}
            <div className="absolute bottom-10 left-10 text-zinc-700 text-xs font-bold uppercase tracking-widest hidden md:block">
                ERR_CODE: 0x404_NOT_FOUND
            </div>
            <div className="absolute bottom-10 right-10 flex gap-3 items-center hidden md:flex">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-xs text-red-500 font-bold uppercase tracking-widest">Signal Lost</span>
            </div>
        </div>
    )
}
