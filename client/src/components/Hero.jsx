import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center py-20 px-8">

        <div>

          <h1 className="text-5xl font-bold leading-tight">
            Lost Something?
          </h1>

          <h2 className="text-4xl font-bold mt-3">
            Found Something?
          </h2>

          <p className="mt-6 text-lg">
            Help students reconnect with their belongings quickly and securely.
          </p>

          <div className="mt-8 flex gap-4">

            <Link to="/report-lost">
  <button className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600">
    Report Lost
  </button>
</Link>

<Link to="/report-found">
  <button className="bg-green-500 px-6 py-3 rounded-lg hover:bg-green-600">
    Report Found
  </button>
</Link>

          </div>

        </div>

        <div className="text-center text-8xl">
          🎒
        </div>

      </div>

    </section>
  );
}

export default Hero;