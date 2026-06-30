import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/payment")({
  component: function Index() {
    const search = Route.useSearch();
    const navigate = useNavigate();
    const { paymentIntentId } = search;

    function handleOrder() {
      navigate({
        to: "/success/$paymentIntentId/$orderId",
        params: {
          paymentIntentId: paymentIntentId,
          orderId: `OD-${crypto.randomUUID()}`,
        },
      });
    }

    return (
      <div className="flex flex-col gap-4">
        <div>Hello "/payment"!</div>
        <p>paymentIntentId={paymentIntentId}</p>
        <button
          onClick={handleOrder}
          className="bg-black self-start text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Confirm Order
        </button>
      </div>
    );
  },
});
