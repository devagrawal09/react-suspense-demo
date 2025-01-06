import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import { AttendeeRating } from "./AttendeeRating";
import { SpeakerReview } from "./SpeakerReview";
import {
  getIsBookmarked,
  getSession,
  getSpeaker,
  Session,
  Speaker,
  toggleBookmark,
} from "@/data";

type SessionDetailsProps = {
  sessionId: string;
  role?: "attendee" | "speaker";
  goBack: () => void;
};

export function SessionDetails({
  sessionId,
  goBack,
  role,
}: SessionDetailsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [session, setSession] = useState<Session>();
  const [speaker, setSpeaker] = useState<Speaker>();

  function fetchIsBookmarked() {
    getIsBookmarked(sessionId).then(setIsBookmarked);
  }

  useEffect(() => {
    getSession(sessionId).then((s) => setSession(s));
    fetchIsBookmarked();
  }, [sessionId]);

  useEffect(() => {
    session?.speakerId &&
      getSpeaker(session?.speakerId).then((s) => setSpeaker(s));
  }, [session?.speakerId]);

  if (!session) return <div>Loading...</div>;

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
          onClick={() => toggleBookmark(session.id).then(fetchIsBookmarked)}
        >
          <Bookmark className={isBookmarked ? "fill-current" : ""} />
        </Button>
      </div>
      <p className="text-sm text-gray-600 mb-4">{session.time}</p>
      <p>{session.description || "No description available."}</p>

      {speaker ? (
        <div className="mt-4">
          <p className="font-bold">{speaker.name}</p>
          <p className="text-sm text-gray-600">{speaker.bio}</p>
        </div>
      ) : (
        <p className="mt-4 text-sm text-gray-600">Loading speaker details.</p>
      )}

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
