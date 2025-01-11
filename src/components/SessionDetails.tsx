import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getIsBookmarked,
  getSession,
  getSpeaker,
  toggleBookmark,
} from "@/data";
import { useAsync } from "@/hooks/use-async";
import { Bookmark } from "lucide-react";
import { lazy } from "react";

export type SessionDetailsProps = {
  sessionId: string;
  role?: "attendee" | "speaker" | "";
  goBack: () => void;
};

export function SessionDetails({
  sessionId,
  goBack,
  role,
}: SessionDetailsProps) {
  const { value: session } = useAsync(() => getSession(sessionId));
  const { value: speaker } = useAsync(() => getSpeaker(session.speakerId));
  const { value: isBookmarked, refetch: refetchBookmarked } = useAsync(() =>
    getIsBookmarked(sessionId)
  );

  return (
    <>
      <Button variant="link" onClick={goBack}>
        &lt; Go back
      </Button>
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold">{session.title}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleBookmark(session.id).then(refetchBookmarked)}
        >
          <Bookmark className={isBookmarked ? "fill-current" : ""} />
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-4">{session.time}</p>
      <p>{session.description || "No description available."}</p>

      <div className="mt-4">
        <p className="font-bold">{speaker.name}</p>
        <p className="text-sm text-gray-600">{speaker.bio}</p>
      </div>

      <Card className="mt-4 pt-4">
        <CardContent className="space-y-6">
          {role === "attendee" ? (
            <AttendeeRating sessionId={session.id} />
          ) : role === "speaker" ? (
            <SpeakerReview sessionId={session.id} />
          ) : (
            <>Login to provide feedback</>
          )}
        </CardContent>
      </Card>
    </>
  );
}

const AttendeeRating = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const module = await import("./AttendeeRating");
  return { default: module.AttendeeRating };
});

const SpeakerReview = lazy(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const module = await import("./SpeakerReview");
  return { default: module.SpeakerReview };
});
