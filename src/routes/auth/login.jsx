import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInStatus } from "@/slices/authSlice";

export const Route = createFileRoute("/auth/login")({
  component: function Index() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state?.auth?.loggedIn);
    const navigate = useNavigate();

    function login() {
      dispatch(setLoggedInStatus(true));
      navigate({
        to: "/tanstack",
      });
    }

    function logout() {
      dispatch(setLoggedInStatus(false));
    }

    return (
      <div className="flex flex-col gap-4">
        <div>Hello "/auth/login"!</div>
        <button
          onClick={isLoggedIn ? logout : login}
          className="bg-black self-start text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    );
  },
});
