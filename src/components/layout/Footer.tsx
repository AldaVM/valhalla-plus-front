import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="w-full px-4 md:px-6 md:max-w-2xl md:mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          {/* Brand */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-sm font-medium tracking-wide text-gray-600">
              Valhalla Jiu Jitsu +
            </h3>
          </div>

          {/* Legal Links */}
          <div className="flex space-x-6">
            <Link 
              to="/privacy" 
              className="text-xs font-medium tracking-wide text-gray-500 hover:text-black transition-colors duration-200"
              aria-label="Política de privacidad"
            >
              Privacidad
            </Link>
            <Link 
              to="/terms" 
              className="text-xs font-medium tracking-wide text-gray-500 hover:text-black transition-colors duration-200"
              aria-label="Términos de servicio"
            >
              Términos
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-6 pt-6 text-center w-full">
          <p className="text-xs font-medium tracking-wide text-gray-500">
            © {currentYear} Valhalla Jiu Jitsu +. Todos los derechos reservados ALDAVM.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 