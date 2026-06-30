import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "@/components/molecules/header";
import { Banner } from "@/components/molecules/banner";

export const Route = createRootRoute({
  component: function () {
    return (
      <div className="min-h-screen text-gray-900">
        <div className="mx-auto min-h-screen max-w-5xl bg-white">
          <Header />
          <Banner />
          <main className="py-3">
            <Outlet />
          </main>
        </div>
      </div>
    );
  },
});
