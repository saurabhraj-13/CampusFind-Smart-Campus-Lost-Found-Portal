import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    { name: "Mobile", icon: "📱" },
    { name: "Laptop", icon: "💻" },
    { name: "ID Card", icon: "🆔" },
    { name: "Keys", icon: "🔑" },
    { name: "Wallet", icon: "👛" },
    { name: "Books", icon: "📚" },
    { name: "Bag", icon: "🎒" },
    { name: "Charger", icon: "🔌" },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Heading */}
      <div className="text-center px-4 mb-8 sm:mb-10">

        <div className="inline-block bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-semibold mb-3">
          📂 Browse
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
          Browse Categories
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
          Quickly find lost and found items by category.
        </p>

      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/category/${encodeURIComponent(category.name)}`}
            className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-md dark:shadow-gray-950 rounded-2xl p-5 sm:p-6 text-center hover:-translate-y-1 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-500 transition duration-300"
          >

            {/* Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 flex items-center justify-center text-3xl sm:text-4xl transition">
              {category.icon}
            </div>

            {/* Category Name */}
            <h3 className="mt-4 font-bold text-gray-800 dark:text-gray-100 text-base sm:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {category.name}
            </h3>

            {/* Explore */}
            <div className="mt-2 text-xs sm:text-sm text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition">
              Explore →
            </div>

          </Link>
        ))}

      </div>

    </section>
  );
}

export default Categories;