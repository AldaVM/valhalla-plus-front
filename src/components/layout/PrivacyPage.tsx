import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full py-8 px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 w-full max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              to="/roadmaps"
              className="text-gray-600 hover:text-black transition-colors duration-200 mr-4"
              aria-label="Volver al inicio"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </Link>
            <h1 className="text-3xl font-medium text-black uppercase tracking-wide">
              🔒 Política de Privacidad
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">
                Información que recopilamos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Recopilamos información que usted nos proporciona directamente,
                como cuando crea una cuenta, se suscribe a nuestros servicios, o
                se comunica con nosotros.
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                <li>Información de contacto (nombre, email)</li>
                <li>Información de la cuenta y credenciales</li>
                <li>Datos de uso de la plataforma</li>
                <li>Información técnica del dispositivo</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">
                Cómo utilizamos su información
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Personalizar su experiencia de usuario</li>
                <li>Comunicarnos con usted sobre actualizaciones y mejoras</li>
                <li>Mejorar la seguridad de nuestra plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">
                Protección de datos
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas
                apropiadas para proteger su información personal contra acceso
                no autorizado, alteración, divulgación o destrucción.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">
                Sus derechos
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
                <li>Acceder a su información personal</li>
                <li>Corregir información inexacta</li>
                <li>Solicitar la eliminación de sus datos</li>
                <li>Oponerse al procesamiento de sus datos</li>
                <li>Portabilidad de sus datos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black mb-4">
                Contacto
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Si tiene preguntas sobre esta política de privacidad o sobre
                cómo manejamos su información, no dude en contactarnos a través
                de nuestro equipo de soporte.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm mb-4 md:mb-0">
                Para cualquier consulta sobre privacidad, contacta con nuestro
                equipo de soporte.
              </p>
              <Link
                to="/roadmaps"
                className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
