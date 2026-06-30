import {
  createFileRoute,
  Link,
  Outlet,
  useMatchRoute,
} from "@tanstack/react-router";
import { ProductFilter } from "@/components/molecules/ProductFilter";

export const Route = createFileRoute("/products")({
  component: function ProductsLayout() {
    const matchRoute = useMatchRoute();
    const isProductsHome = !!matchRoute({
      to: "/products",
      fuzzy: false, //Exact match /products(y) /products/mobile(n)
    });

    return (
      <div className="bg-gray-100 text-gray-900">
        <div className="mx-auto max-w-6xl bg-white">
          <div className="flex">
            {/* Side Section */}
            {!isProductsHome && (
              <aside className="w-1/4 bg-gray-50 px-5 py-6 space-y-8 h-fit">
                <h3 className="mb-3 text-sm font-medium text-gray-900">
                  Category
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <Link
                    to="/products/mobile"
                    className="block hover:underline"
                    activeProps={{
                      className: "text-black-600 font-bold underline",
                    }}
                  >
                    Mobiles
                  </Link>
                  <Link
                    to="/products/laptop"
                    className="block hover:underline"
                    activeProps={{
                      className: "text-black-600 font-bold underline",
                    }}
                  >
                    Laptops
                  </Link>
                </div>
                <ProductFilter type={"highLow"} />
                <ProductFilter type={"price"} />
                <ProductFilter type={"color"} />
              </aside>
            )}
            {/* Main Section */}
            <main className="w-3/4">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    );
  },
});
