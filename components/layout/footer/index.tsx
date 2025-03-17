export default function Footer() {
  return (
    <footer className="bg-[#0A4A3C] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p>F.D.Khan Building, Abid Road</p>
              <p>Hyderabad, T.S</p>
              <p>Phone: 040-24755224 | 24758009</p>
              <p>Mobile: 90007 11299</p>
              <p>Email: fdkhancompany@gmail.com</p>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-[#C5B358] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="hover:text-[#C5B358] transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/clients" className="hover:text-[#C5B358] transition-colors">
                  Our Clients
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <p>Monday - Saturday</p>
              <p>10:00 AM - 8:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {process.env.SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 