import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: function () {
    return 'Hello "/index home"!';
  },
});
