import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteCart } from "@/slices/cartSlice";

function deleteCartFunc(dispatch) {
  dispatch(deleteCart());
}

export const Route = createFileRoute("/success/$paymentIntentId/$orderId")({
  component: function Index() {
    const { paymentIntentId, orderId } = Route.useParams();

    const dispatch = useDispatch();

    const deleteCartFn = useCallback(
      () => deleteCartFunc(dispatch),
      [dispatch],
    );

    useEffect(
      function () {
        deleteCartFn();
        return function () {};
      },
      [deleteCartFn],
    );

    return (
      <div className="flex flex-col gap-4">
        <p>Hello /"Success"!</p>
        <p>
          paymentIntentId={paymentIntentId}, orderId={orderId}
        </p>
        <div className="pb-2 pt-2">
          <Link
            to="/"
            className="inline-block w-fit rounded-full border border-black px-6 py-3 text-sm text-black transition hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  },
});
