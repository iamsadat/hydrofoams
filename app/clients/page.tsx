// app/clients/page.tsx
export default function ClientsPage() {
    const dummyClients = [
        { name: "Silverbrook Academy", slug: "silverbrook-academy" },
        { name: "Horizon Ridge High", slug: "horizon-ridge-high" },
        { name: "Pinecrest Preparatory School", slug: "pinecrest-prep" },
        { name: "Willowdale International School", slug: "willowdale-intl" },
        { name: "Starlight Scholars Institute", slug: "starlight-scholars" },
      ];
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 text-[#0A4A3C]">Our Clients</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyClients.map((client) => (
             <a
             key={client.slug}
             href={`/clients/${client.slug}`}
             className="border border-[#0A4A3C]/10 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
           >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-[#0A4A3C]/5 mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-[#0A4A3C]">{client.name}</h2>
                <p className="text-sm text-[#0A4A3C]/60">
                  View {client.name}'s Collection
                </p>
              </div>
            </a>
          ))}
        </div>
    
      </div>
    );
  }