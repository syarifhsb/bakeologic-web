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
  ]),
] satisfies RouteConfig;
