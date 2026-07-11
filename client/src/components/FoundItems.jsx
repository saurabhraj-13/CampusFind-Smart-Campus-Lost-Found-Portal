function FoundItems() {

  return (

    <section className="py-16 bg-gray-100">

      <h2 className="text-4xl font-bold text-center mb-10">
        Recently Found
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {[1,2,3].map((item)=>(
          <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden">

            <img
              src="https://picsum.photos/400/250"
              alt=""
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h3 className="text-xl font-bold">
                HP Laptop
              </h3>

              <p>📍 Library</p>

              <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
                View Details
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>

  );
}

export default FoundItems;