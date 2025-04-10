import type { Route } from "./+types/faq";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bakeologic" },
    { name: "description", content: "Baking with logic, love and magic." },
  ];
}

const faqs = [
  {
    question: "What are your opening hours?",
    answer:
      "Our bakery is open from 7:00 AM to 8:00 PM, Monday through Sunday.",
  },
  {
    question: "Do you offer delivery services?",
    answer:
      "Yes, we offer delivery services within a 5km radius. Delivery charges may apply depending on your location.",
  },
  {
    question: "Can I place custom orders?",
    answer:
      "Absolutely! We accept custom orders for special occasions. Please contact us at least 48 hours in advance.",
  },
  {
    question: "Do you have gluten-free options?",
    answer:
      "Yes, we offer a variety of gluten-free baked goods. Please check our menu or ask our staff for available options.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can place orders through our website, by phone, or by visiting our store directly.",
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-6">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
