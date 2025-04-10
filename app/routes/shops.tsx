export default function ShopsPage() {
  const shops = [
    {
      id: 1,
      name: "Downtown Bakery",
      address: "123 Main Street, Downtown",
      hours: "Mon-Sat: 7AM - 8PM, Sun: 8AM - 6PM",
      phone: "+1 (555) 123-4567",
      image: "/images/shop1.jpg",
    },
    {
      id: 2,
      name: "Westside Cafe",
      address: "456 West Avenue, Westside",
      hours: "Mon-Sun: 6AM - 9PM",
      phone: "+1 (555) 234-5678",
      image: "/images/shop2.jpg",
    },
    {
      id: 3,
      name: "East End Patisserie",
      address: "789 East Boulevard, East End",
      hours: "Mon-Sat: 8AM - 7PM, Sun: 9AM - 5PM",
      phone: "+1 (555) 345-6789",
      image: "/images/shop3.jpg",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Shops</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="h-48 bg-gray-200">
              {/* Image placeholder - replace with actual image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Shop Image
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{shop.name}</h2>
              <div className="space-y-2 text-sm">
                <p className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {shop.address}
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {shop.hours}
                </p>
                <p className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  {shop.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
