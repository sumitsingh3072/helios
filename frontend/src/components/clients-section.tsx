import { useRef } from "react";

// Reduced list for hackathon focus
const clients = [
    { name: "Webflow", type: "logo" },
    { name: "loom", type: "text", font: "font-sans font-bold text-2xl" },
    { name: "runway", type: "text", font: "font-extrabold italic text-2xl tracking-tighter" },
    { name: "TikTok", type: "logo" },
    { name: "hume", type: "text", font: "font-light text-3xl" },
    { name: "pipe", type: "text", font: "font-bold text-3xl tracking-tight" },
    { name: "BLOCK", type: "text", font: "font-extrabold text-xl tracking-widest" },
    { name: "galileo", type: "text", font: "font-medium text-2xl" },
];

export default function ClientsSection() {
    return (
        <section className="py-20 px-6 bg-[#F3F0E7] text-black">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Header Col */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest leading-loose sticky top-32">
                            Selected <br />
                            Clients
                        </h3>
                    </div>

                    {/* Logos Grid */}
                    <div className="lg:col-span-10 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-20 items-center">
                        {clients.map((client, i) => (
                            <div key={i} className="flex items-center justify-start h-12">
                                {client.type === "logo" && client.name === "Webflow" && (
                                    <span className="font-bold text-2xl flex items-center gap-1"><span className="text-3xl">W</span> Webflow</span>
                                )}
                                {client.type === "logo" && client.name === "TikTok" && (
                                    <span className="font-bold text-2xl flex items-center gap-1">TikTok</span>
                                )}
                                {client.type === "text" && (
                                    <span className={client.font}>{client.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
