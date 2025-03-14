// app/clients/page.tsx
export default function ClientListPage() {
    const dummyClients = [
      { name: "Fashion Nova", slug: "fashion-nova" },
      { name: "Urban Threads", slug: "urban-threads" },
      { name: "Eco Wear", slug: "eco-wear" },
      { name: "Athletic Gear Co", slug: "athletic-gear" },
      { name: "Luxury Styles", slug: "luxury-styles" },
    ];
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Our Clients</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyClients.map((client) => (
             <a
             key={client.slug}
             href={`http://${client.slug}.x.com:3000`} // Local development
             className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
           >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-100 mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{client.name}</h2>
                <p className="text-sm text-gray-500">
                  Visit {client.slug}.x.com
                </p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-500">
          <p>For local testing, ensure these entries are in your hosts file:</p>
          <code className="block mt-2 p-3 bg-gray-100 rounded">
            127.0.0.1 fashion-nova.x.com urban-threads.x.com eco-wear.x.com athletic-gear.x.com luxury-styles.x.com
          </code>
        </div>
      </div>
    );
  }