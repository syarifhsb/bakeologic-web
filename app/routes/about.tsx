export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Bakeologic</h1>
      <div className="prose max-w-none">
        <p className="text-lg mb-4">
          Welcome to Bakeologic, your premier destination for high-quality
          baking products and supplies. We are passionate about bringing the joy
          of baking to every kitchen.
        </p>
        <p className="text-lg mb-4">
          Our mission is to provide bakers of all skill levels with the finest
          ingredients, tools, and equipment needed to create delicious baked
          goods.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Quality ingredients for exceptional results</li>
            <li>Supporting both home bakers and professionals</li>
            <li>Sustainable and eco-friendly practices</li>
            <li>Outstanding customer service</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
