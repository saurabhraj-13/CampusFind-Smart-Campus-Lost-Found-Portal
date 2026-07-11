function Categories() {

  const categories = [
    "📱 Mobile",
    "💻 Laptop",
    "🆔 ID Card",
    "🔑 Keys",
    "👛 Wallet",
    "📚 Books",
    "🎒 Bag",
    "🔌 Charger"
  ];

  return (

    <section className="py-16">

      <h2 className="text-4xl font-bold text-center mb-10">
        Browse Categories
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((item) => (

          <div
            key={item}
            className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition"
          >
            {item}
          </div>

        ))}

      </div>

    </section>

  );
}

export default Categories;