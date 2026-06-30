import { createFileRoute, Link } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import * as productAPI from "@/apis/productAPI";
import { addProduct } from "@/slices/cartSlice";

function handleAddProduct(product, dispatch) {
  dispatch(addProduct(product));
}

export const Route = createFileRoute("/products/mobile")({
  loader: async () => {
    const res = await productAPI.fetchMobileProductList();
    return res.data;
    // API response handling skipped for mock environment
    // if (!res.ok) throw new Error("Failed to Fetch !");
    // return res.json();
  },
  pendingComponent: () => (
    <div className="p-6 text-sm text-zinc-500">Loading...</div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="p-6 text-sm">
      <p className="text-red-500">Error: {error.message}</p>
      <button onClick={() => reset()} className="mt-2 cursor-pointer underline">
        Try again
      </button>
    </div>
  ),
  component: function MobileLists() {
    const dispatch = useDispatch();
    const cartLines = useSelector((state) => state.cart?.cartLines);
    const products = Route.useLoaderData();
    const colors = [
      "bg-amber-50",
      "bg-emerald-50",
      "bg-sky-50",
      "bg-violet-50",
      "bg-teal-50",
    ];

    return (
      <div className="px-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="w-auto">
              <h1 className="text-4xl font-bold text-gray-900">📱 Mobiles</h1>
              <p className="text-gray-500 mt-2">
                Explore our latest mobile phones.
              </p>
            </div>
            <div className="w-auto">
              <Link
                to="/cart"
                className="inline-block rounded-full border border-black px-6 py-3 text-sm text-black transition hover:underline"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="flex flex-wrap gap-4">
          {products.map((p, i) => (
            <div
              key={p.id}
              className={`${colors[i % colors.length]} p-4 rounded w-full sm:w-[48%] md:w-[30%] flex flex-col`}
            >
              {/* Product Name */}
              <div className="font-semibold text-gray-900">{p.name}</div>

              {/* Price */}
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-xs font-semibold text-gray-500">$</span>
                <span className="text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                  {p.price}
                </span>
              </div>

              {/* Buttons */}
              <button
                onClick={() => handleAddProduct(p, dispatch)}
                disabled={cartLines[p.id]}
                className="mt-4 bg-black text-white text-sm py-2 rounded transition hover:bg-gray-800 disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
              >
                Add to Cart
              </button>

              <button className="mt-2 bg-white border text-sm py-2 rounded hover:bg-gray-50 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
