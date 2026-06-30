import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/products/")({
  component: function Index() {
    return (
      <div className="mx-auto max-w-3xl py-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-gray-600">
          Select a category to browse our products.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            to="/products/mobile"
            className="rounded-lg border p-4 transition hover:bg-gray-100"
          >
            <h2 className="font-semibold">📱 Mobiles</h2>
            <p className="text-sm text-gray-600">
              Explore our latest mobile phones.
            </p>
          </Link>

          <Link
            to="/products/laptop"
            className="rounded-lg border p-4 transition hover:bg-gray-100"
          >
            <h2 className="font-semibold">💻 Laptops</h2>
            <p className="text-sm text-gray-600">
              Browse laptops for work and everyday use.
            </p>
          </Link>
        </div>
      </div>
    );
  },
});
