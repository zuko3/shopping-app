import "react";
import { useSelector } from "react-redux";
import { Link } from "@tanstack/react-router";

export const Header = () => {
  const cartLines = useSelector((state) => state.cart?.cartLines);
  const loggedInStatus = useSelector((state) => state?.auth?.loggedIn);
  const count = cartLines ? Object.keys(cartLines)?.length : 0;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 py-4">
      <nav className="flex items-center gap-3 text-sm">
        <Link
          to="/"
          className="hover:underline"
          activeProps={{
            className: "text-black-600 font-bold underline",
          }}
        >
          Home
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          to="/products"
          className="hover:underline"
          activeProps={{
            className: "text-black-600 font-bold underline",
          }}
        >
          Products
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          to="/cart"
          className="hover:underline"
          activeProps={{
            className: "text-black-600 font-bold underline",
          }}
        >
          Cart
          <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
            {count}
          </span>
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          to="/about"
          className="hover:underline"
          activeProps={{
            className: "text-black-600 font-bold underline",
          }}
        >
          About
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          to="/redux"
          className="hover:underline"
          activeProps={{
            className: "text-black-600 font-bold underline",
          }}
        >
          Redux
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          to="/tanstack"
          className="hover:underline"
          activeProps={{
            className: "text-black-600 font-bold underline",
          }}
        >
          TanstackQuery Auth Required
        </Link>
        <span className="text-gray-400">|</span>
        <Link
          to="/auth/login"
          className="hover:underline"
          activeProps={{
            className: "text-black-600 font-bold underline",
          }}
        >
          {loggedInStatus ? "Logout" : "Login"}
        </Link>
      </nav>
    </header>
  );
};
