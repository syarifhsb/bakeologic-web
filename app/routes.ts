import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("products", "routes/products.tsx"),
    route("products/:slug", "routes/products-slug.tsx"),
    route("about", "routes/about.tsx"),
    route("faq", "routes/faq.tsx"),
    route("contact", "routes/contact.tsx"),
    route("shops", "routes/shops.tsx"),
    route("cart", "routes/cart.tsx"),

    // ✅ TODO
    // route("dashboard", "routes/dashboard.tsx"),
    // route("logout", "routes/logout.tsx"),
    // route("cart", "routes/cart.tsx"),
  ]),
  route("auth/register", "routes/register.tsx"),
  route("auth/login", "routes/login.tsx"),
] satisfies RouteConfig;
