function LostItems() {
  return (
    <section className="py-16 bg-white">

      <h2 className="text-4xl font-bold text-center mb-10">
        Recently Lost
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {[1,2,3].map((item)=>(
          <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden">

            <img
              src="https://picsum.photos/400/250?random=2"
              alt="Lost Item"
              className="w-full h-52 object-cover"
            />

            <div className="p-5">

              <h3 className="text-xl font-bold">
                College ID Card
              </h3>

              <p>📍 Lost near CSE Block</p>

              <button className="mt-4 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600">
                Claim Item
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default LostItems;