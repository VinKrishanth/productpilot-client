import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-12 border-t border-gray-200 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-16 mb-10">
          
          {/* About Ecobazar */}
          <div>
            <Logo />
            <p className="text-primary-light text-sm mt-3 mb-4 text-justify leading-relaxed">
              We are a team of designers and developers building high-quality products for modern e-commerce businesses.
            </p>
            <address className="text-sm text-primary-light not-italic space-y-1">
              <p>1234 Main Street, City, Country</p>
              <p>+1 234-567-8901</p>
              <p>info@ecobazar.com</p>
            </address>
          </div>

          {/* My Account */}
          <div>
            <h3 className="font-bold text-lg mb-4">My Account</h3>
            <ul className="space-y-2">
              {["My Account", "Order History", "Shopping Cart", "Wishlist", "Settings"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-primary-light hover:text-green-400 text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              {["Contact", "FAQs", "Terms & Conditions", "Privacy Policy", "Track Order"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-primary-light hover:text-green-400 text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* App & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Download Our App</h3>
            <p className="text-primary-light text-sm mb-4">
              Get access to exclusive offers and deals, right from your phone.
            </p>
            <div className="flex space-x-2 mb-4">
              <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/800px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-10" />
              </a>
              <a href="#">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/800px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-10" />
              </a>
            </div>

            <div className="flex space-x-3 justify-start">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <Icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 py-6 mt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-light text-sm text-center md:text-left">
            © {new Date().getFullYear()} Ecobazar — All Rights Reserved
          </p>
          <div className="flex gap-4 items-center">
            {[
              ["Visa", "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"],
              ["Mastercard", "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"],
              ["Amex", "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"],
              ["PayPal", "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"],
            ].map(([alt, src], i) => (
              <img key={i} src={src} alt={alt} className="h-6 w-auto" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
