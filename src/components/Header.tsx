import { Role } from "@/data";
import { Button } from "./ui/button";
import type { Route } from "@/App";

export function Header({
  role,
  setRole,
  setRoute,
}: {
  role: string;
  setRole: (role: Role) => void;
  setRoute: (route: Route) => void;
}) {
  return (
    <nav className="container mx-auto flex justify-between items-center">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => setRoute({ route: "home" })}
      >
        Conference Schedule
      </h1>
      {role ? (
        <Button
          variant="link"
          className="text-white"
          onClick={() => {
            setRole("");
            setRoute({ route: "home" });
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="link"
          className="text-white"
          onClick={() => setRoute({ route: "login" })}
        >
          Login
        </Button>
      )}
    </nav>
  );
}
