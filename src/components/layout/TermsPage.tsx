import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors">
      <div className="w-full py-8 px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 w-full max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Link
              to="/contenido"
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
            <h1 className="text-3xl font-medium text-black dark:text-white uppercase tracking-wide">
              📜 Términos y Condiciones de Uso
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
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
            {/* Sección 1 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                Aceptación de los términos
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Al acceder y utilizar esta plataforma de cursos online de
                jiu-jitsu, el usuario acepta cumplir estos términos y
                condiciones. Si no está de acuerdo, por favor absténgase de
                utilizar la aplicación.
              </p>
            </section>

            {/* Sección 2 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                Uso educativo
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Todo el contenido disponible en esta plataforma —incluyendo,
                entre otros, videos, imágenes, texto y técnicas de jiu-jitsu— es
                ofrecido exclusivamente con fines educativos y de formación
                personal.
              </p>
            </section>

            {/* Sección 3 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  3
                </span>
                Derechos de autor
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Algunos materiales presentes en la plataforma pueden estar
                protegidos por derechos de autor pertenecientes a terceros.
                Dichos materiales se utilizan en virtud del uso legítimo o fair
                use para propósitos educativos y sin fines comerciales. El
                usuario reconoce y acepta que:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 ml-4">
                <li>
                  No adquiere ningún derecho de propiedad sobre el contenido.
                </li>
                <li>
                  No podrá reproducir, distribuir o explotar comercialmente
                  dicho contenido sin la autorización expresa del titular de los
                  derechos.
                </li>
              </ul>
            </section>

            {/* Sección 4 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Prohibiciones
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                El usuario se compromete a no:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 ml-4">
                <li>
                  Descargar, copiar, modificar, redistribuir o revender el
                  contenido de la plataforma.
                </li>
                <li>
                  Utilizar los materiales para propósitos comerciales o de
                  lucro.
                </li>
                <li>
                  Compartir su acceso a la plataforma con terceros no
                  autorizados.
                </li>
              </ul>
            </section>

            {/* Sección 5 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                Responsabilidad
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                La plataforma no será responsable por lesiones, accidentes o
                daños derivados de la aplicación práctica de las técnicas
                aprendidas en los cursos. El usuario es responsable de practicar
                jiu-jitsu bajo la supervisión adecuada y asumiendo los riesgos
                inherentes a la actividad física.
              </p>
            </section>

            {/* Sección 6 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  6
                </span>
                Modificación de los términos
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                La plataforma se reserva el derecho de actualizar o modificar
                estos términos en cualquier momento. El uso continuado de la
                aplicación después de dichos cambios constituirá aceptación de
                los términos actualizados.
              </p>
            </section>

            {/* Sección 7 */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  7
                </span>
                Ley aplicable
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Estos términos y condiciones se regirán e interpretarán de
                acuerdo con las leyes del país en el que opere la plataforma,
                sin perjuicio de los derechos que asistan al usuario por la
                legislación de su lugar de residencia.
              </p>
            </section>
          </div>

          {/* Footer */}
          <footer className="w-full bg-transparent mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-0">
                Para cualquier consulta sobre estos términos, contacta con nuestro equipo de soporte.
              </p>
              <Link
                to="/contenido"
                className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
              >
                Volver al inicio
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
