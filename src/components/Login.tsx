import type { Route } from "@/App";
import type { Role } from "@/data";
import { Button } from "./ui/button";

export function Login({
  setRole,
  setRoute,
}: {
  setRole: (role: Role) => void;
  setRoute: (route: Route) => void;
}) {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Button
        onClick={() => {
          setRole("attendee");
          setRoute({ route: "home" });
        }}
      >
        Login as Attendee
      </Button>
      <Button
        onClick={() => {
          setRole("speaker");
          setRoute({ route: "home" });
        }}
      >
        Login as Speaker
      </Button>
    </div>
  );
}
