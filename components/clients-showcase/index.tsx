export default function ClientsShowcase() {
  return (
    <section className="py-16 bg-[#0A4A3C]/5 dark:bg-[#0A4A3C]/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A4A3C] dark:text-white">
            Our Trusted Clients
          </h2>
          <p className="text-lg mb-8 text-[#0A4A3C]/80 dark:text-white/80">
            Explore our network of prestigious institutions and schools that trust us for their uniform and fabric needs.
          </p>
          <a 
            href="/search" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0A4A3C] hover:bg-[#0A4A3C]/90 transition-colors duration-200 hover:shadow-lg"
          >
            View Our Clients
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 