import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Session = {
  id: string;
  title: string;
  time: string;
  date: string;
  description: string;
};

type SessionCardProps = {
  session: Session;
};

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{session.title}</CardTitle>
        <CardDescription>
          {session.date} at {session.time}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">{session.description}</p>
      </CardContent>
      <CardFooter>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
}
