function Footer() {
  return (
    <>
      {/* About Section */}
      <section
        id="about"
        className="bg-blue-50 dark:bg-gray-900 py-12 sm:py-16 transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="text-center mb-10 sm:mb-12">

            <div className="inline-block bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
              🎓 About CampusFind
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
              Helping Students Find What They Lost
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
              CampusFind is a campus-based lost and found platform
              designed to help students report lost belongings,
              share found items, and reconnect belongings with their
              rightful owners quickly and easily.
            </p>

          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">

            {/* Easy Reporting */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md dark:shadow-gray-950 hover:-translate-y-1 hover:shadow-lg transition">

              <div className="text-4xl mb-4">
                📝
              </div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Easy Reporting
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Quickly report lost or found belongings on campus.
              </p>

            </div>

            {/* Smart Search */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md dark:shadow-gray-950 hover:-translate-y-1 hover:shadow-lg transition">

              <div className="text-4xl mb-4">
                🔎
              </div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Smart Search
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Search lost and found items by name, category,
                description, or location.
              </p>

            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md dark:shadow-gray-950 hover:-translate-y-1 hover:shadow-lg transition">

              <div className="text-4xl mb-4">
                📂
              </div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Organized Categories
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Easily browse items through organized campus
                categories.
              </p>

            </div>

            {/* Campus Community */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-md dark:shadow-gray-950 hover:-translate-y-1 hover:shadow-lg transition">

              <div className="text-4xl mb-4">
                🤝
              </div>

              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                Campus Community
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Connect students and help return belongings to
                their owners.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-300">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Brand */}
            <div>
              <h2 className="text-2xl font-bold text-blue-400">
                🔍 CampusFind
              </h2>

              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                A simple and reliable platform for finding lost
                belongings and reporting found items on campus.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Quick Links
              </h3>

              <div className="flex flex-col gap-2 text-gray-400 text-sm">

                <a
                  href="/"
                  className="hover:text-white transition"
                >
                  Home
                </a>

                <a
                  href="/#lost-items"
                  className="hover:text-white transition"
                >
                  Lost Items
                </a>

                <a
                  href="/#found-items"
                  className="hover:text-white transition"
                >
                  Found Items
                </a>

                <a
                  href="/#about"
                  className="hover:text-white transition"
                >
                  About
                </a>

              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="font-semibold text-lg mb-4">
                CampusFind
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Built to make the campus lost and found process
                faster, simpler, and more organized.
              </p>
            </div>

          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center">

            <p className="text-gray-400 text-sm">
              © 2026 CampusFind. All Rights Reserved.
            </p>

          </div>

        </div>

      </footer>
    </>
  );
}

export default Footer;