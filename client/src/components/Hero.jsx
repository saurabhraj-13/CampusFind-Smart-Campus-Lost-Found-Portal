import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-700 dark:to-cyan-600 text-white transition-colors duration-300">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center py-14 sm:py-16 md:py-20 px-5 sm:px-8">

        {/* Hero Content */}
        <div className="text-center md:text-left">

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Lost Something?
          </h1>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2 sm:mt-3">
            Found Something?
          </h2>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-white/90 max-w-xl mx-auto md:mx-0">
            Help students reconnect with their belongings quickly and securely.
          </p>

          {/* Buttons */}
          <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">

            <Link
              to="/report-lost"
              className="w-full sm:w-auto"
            >
              <button
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 dark:bg-red-500 dark:hover:bg-red-600 px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
              >
                Report Lost
              </button>
            </Link>

            <Link
              to="/report-found"
              className="w-full sm:w-auto"
            >
              <button
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 dark:bg-green-500 dark:hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
              >
                Report Found
              </button>
            </Link>

          </div>

        </div>

        {/* Hero Icon */}
        <div className="text-center text-7xl sm:text-8xl md:text-9xl">
          🎒
        </div>

      </div>

    </section>
  );
}

export default Hero;