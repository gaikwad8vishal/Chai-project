import { motion } from "framer-motion";

export function LandingPageHome() {
  const teas = [
    { name: "Masala Chai", image: "/images/tea3.jpeg" },
    { name: "Green Tea", image: "/images/img5.avif" },
    { name: "darleejing tea", image: "/images/tea4.webp" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-20"
      >
        <h1 className="text-5xl font-bold text-[#4B382A]">☕ Experience the Aroma of Chai</h1>
        <p className="text-lg text-gray-700 mt-3">Authentic flavors crafted for tea lovers</p>
        <button className="mt-5 bg-[#4B382A] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#6A4F3D]">
          <a href="/all-product">Order Now</a>
        </button>
      </motion.div>

      {/* Featured Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {teas.map((tea, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-5 rounded-xl shadow-lg w-64 text-center"
          >
            {/* ✅ Fixed Image Mapping */}
            <div className="w-full h-40">
              <img
                src={tea.image}
                alt={tea.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold text-[#4B382A] mt-3">{tea.name}</h2>
            <p className="text-gray-600 mt-2">Aromatic & refreshing taste</p>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-16 p-10 text-center max-w-3xl">
        <h2 className="text-3xl font-semibold text-[#4B382A]">Why Choose Chai-Chai?</h2>
        <p className="text-gray-700 mt-3">Freshly sourced, ethically produced, and brewed with love.</p>
      </div>
    </div>
  );
}
