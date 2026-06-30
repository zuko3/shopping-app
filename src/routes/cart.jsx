import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
} from "@/slices/cartSlice";

function incrementQuantityHandler(productId, dispatch) {
  dispatch(incrementQuantity(productId));
}

function decrementQuantityHandler(productId, dispatch) {
  dispatch(decrementQuantity(productId));
}

function deleteProductHandler(productId, dispatch) {
  dispatch(deleteProduct(productId));
}

function getCartTotal(cartLines) {
  return cartLines.reduce(function (acc, value) {
    return acc + value.totalPrice;
  }, 0);
}

export const Route = createFileRoute("/cart")({
  component: function Index() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart?.cartLines);
    const count = cart ? Object.keys(cart)?.length : 0;
    const cartTotal = getCartTotal(Object.values(cart));

    function handleCheckout() {
      navigate({
        to: "/payment",
        search: {
          paymentIntentId: crypto.randomUUID(),
        },
      });
    }

    return (
      <div className="bg-gray-100 text-gray-900">
        <div className="mx-auto max-w-6xl bg-white">
          <div className="flex flex-col gap-4">
            {count === 0 ? (
              <div className="pb-2 pt-2">
                <p>Empty Cart !</p>
                <div className="pb-2 pt-2">
                  <Link
                    to="/products"
                    className="inline-block w-fit rounded-full border border-black mt-4 px-6 py-3 text-sm text-black transition hover:underline"
                  >
                    Back to products
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex justify-between">
                <main className="w-3/4 pr-8">
                  <div className="bg-white">
                    {Object.values(cart).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-gray-100"
                      >
                        {/* Product Name */}
                        <div className="flex-1">
                          <p className="text-base font-medium text-gray-800">
                            {item.name}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="w-24 text-center font-medium">
                          ${item.price}
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              decrementQuantityHandler(item.id, dispatch)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                          >
                            -
                          </button>

                          <span className="w-6 text-center font-medium">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              incrementQuantityHandler(item.id, dispatch)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:bg-gray-100"
                          >
                            +
                          </button>

                          <button
                            onClick={() =>
                              deleteProductHandler(item.id, dispatch)
                            }
                            className="ml-3 text-sm text-red-500 hover:text-red-600"
                          >
                            Delete
                          </button>
                        </div>

                        {/* Total */}
                        <div className="w-24 text-right font-semibold">
                          ${item.totalPrice}
                        </div>
                      </div>
                    ))}
                  </div>
                </main>
                {/* Price section */}
                <aside className="bg-white p-6 rounded-sm shadow h-fit">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between font-semibold text-base border-t pt-2">
                      <span>Total</span>
                      <span>${cartTotal}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="mt-5 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                  >
                    Checkout
                  </button>
                </aside>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
