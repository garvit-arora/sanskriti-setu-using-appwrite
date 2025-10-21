import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white py-10 px-6">
      {/* Footer Links */}
      <div className="footer-container grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        
        {/* About */}
        <div className="footer-content">
          <h3 className="text-xl font-semibold mb-4">About Sanskriti Setu</h3>
          <ul className="space-y-2">
            <li><a href="#who-we-are" className="hover:underline">Who We Are</a></li>
            <li><a href="#how-it-works" className="hover:underline">How It Works</a></li>
            <li><a href="#mission" className="hover:underline">Our Mission</a></li>
            <li><a href="#blog" className="hover:underline cursor-not-allowed opacity-70">Blog (Coming Soon)</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div className="footer-content">
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:underline">Key Features</a></li>
            <li><a href="/become-tutor" className="hover:underline">Become a Mentor</a></li>
            <li><a href="#pricing" className="hover:underline">Pricing & Credits</a></li>
            <li><a href="#faqs" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div className="footer-content">
          <h3 className="text-xl font-semibold mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><a href="#contact" className="hover:underline">Contact Us</a></li>
            <li><a href="#partners" className="hover:underline">Partner with Us</a></li>
            <li><a href="#feedback" className="hover:underline">Send Feedback</a></li>
            <li className="flex gap-4 mt-2">
              <a href="https://instagram.com/sanskritisetu" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
              <a href="https://linkedin.com/company/sanskritisetu" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
              <a href="https://twitter.com/sanskritisetu" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-content">
          <h3 className="text-xl font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms-of-service" className="hover:underline">Terms of Service</a></li>
            <li><a href="/accessibility" className="hover:underline">Accessibility</a></li>
            <li><a href="/code-of-conduct" className="hover:underline">Code of Conduct</a></li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="newsletter text-center mt-10">
        <h3 className="text-lg font-semibold mb-3">Subscribe to Our Newsletter</h3>
        <div className="flex justify-center gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-lg text-black w-64 focus:outline-none"
            aria-label="Enter your email to subscribe"
          />
          <button className="bg-white text-[#6C20BD] font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom text-center mt-8 border-t border-white/20 pt-4 select-none">
        <p>© 2025 Sanskriti Setu. All Rights Reserved.</p>
        <p className="italic text-sm mt-1">"You learn from the world, the world learns from you."</p>
      </div>
    </footer>
  );
};

export default Footer;
