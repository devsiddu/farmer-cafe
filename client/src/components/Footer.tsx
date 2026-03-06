import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full text-gray-500 bg-light mt-20">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/20 pb-8">

        {/* Brand */}
        <div className="md:max-w-80">
          <img src={assets.logoLight} width={157} alt="Farmers Cafe" />
          <p className="mt-5 text-sm text-secondary leading-relaxed">
            Connecting farmers directly with trusted agri-input shops. Find
            fertilizers, seeds, and more — locally sourced and easy to book.
          </p>
          {/* Social icons */}
          <div className="flex items-center gap-3 mt-5">
            {[
              { label: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
              { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
              { label: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z" },
            ].map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center hover:bg-secondary/20 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 flex items-start md:justify-end gap-16 flex-wrap">

          {/* Company */}
          <div>
            <h2 className="font-semibold mb-4 text-primary text-sm uppercase tracking-wider">Company</h2>
            <ul className="text-sm space-y-2.5 text-secondary">
              {[
                { to: "/", label: "Home" },
                { to: "/products", label: "Products" },
                { to: "/shops", label: "Shops" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact Us" },
                { to: "/privacy", label: "Privacy Policy" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-semibold mb-4 text-primary text-sm uppercase tracking-wider">Quick Links</h2>
            <ul className="text-sm space-y-2.5 text-secondary">
              {[
                { to: "/bookings", label: "My Bookings" },
                { to: "/cart", label: "My Cart" },
                { to: "/login", label: "Login" },
                { to: "/register", label: "Register" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h2 className="font-semibold mb-4 text-primary text-sm uppercase tracking-wider">Get in Touch</h2>
            <div className="text-sm space-y-2.5 text-secondary">
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+919876543210" className="hover:text-primary transition">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:support@farmerscafe.in" className="hover:text-primary transition">
                  support@farmerscafe.in
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span>
                <span>Belagavi, Karnataka, India</span>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Farmers Cafe. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-primary transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;