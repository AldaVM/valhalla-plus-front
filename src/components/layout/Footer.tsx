import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6 mt-auto transition-colors">
      <div className="max-w-6xl mx-auto w-full px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          {/* Brand */}
          <div className="mb-4 md:mb-0">
            <h3 className="text-sm font-medium tracking-wide text-gray-600 dark:text-gray-400">
              Valhalla Jiu Jitsu +
            </h3>
          </div>

          {/* Legal Links */}
          <div className="flex space-x-6">
            <Link 
              to="/privacy" 
              className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
              aria-label="Política de privacidad"
            >
              Privacidad
            </Link>
            <Link 
              to="/terms" 
              className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
              aria-label="Términos de servicio"
            >
              Términos
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6 text-center w-full">
          <p className="text-xs font-medium tracking-wide text-gray-500 dark:text-gray-400">
            © {currentYear} Valhalla Jiu Jitsu +. Todos los derechos reservados ALDAVM.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 