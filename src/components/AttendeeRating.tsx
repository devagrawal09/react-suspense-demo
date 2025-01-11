import { Button } from "@/components/ui/button";
import { ThumbsDown, Minus, ThumbsUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getAttendeeFeedback, setAttendeeFeedback } from "@/data";
import { useAsync } from "@/hooks/use-async";

type RatingOption = "negative" | "neutral" | "positive";

export type AttendeeRatingProps = { sessionId: string };

export function AttendeeRating({ sessionId }: AttendeeRatingProps) {
  const {
    value: selectedRating,
    refetch,
    status,
  } = useAsync(() => getAttendeeFeedback(sessionId));

  const handleRating = async (rating: RatingOption) => {
    await setAttendeeFeedback(sessionId, rating);
    refetch();
    toast({
      title: "Thank you for your feedback!",
      description: "Your rating has been recorded.",
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Rate this session</h3>
      <p className="text-sm text-gray-600">
        How would you rate this session overall?
      </p>
      {status === "pending" ? (
        <p>Loading feedback...</p>
      ) : (
        <div className="flex space-x-2">
          <Button
            variant={selectedRating === "negative" ? "default" : "outline"}
            size="icon"
            onClick={() => handleRating("negative")}
          >
            <ThumbsDown className="h-4 w-4" />
          </Button>
          <Button
            variant={selectedRating === "neutral" ? "default" : "outline"}
            size="icon"
            onClick={() => handleRating("neutral")}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant={selectedRating === "positive" ? "default" : "outline"}
            size="icon"
            onClick={() => handleRating("positive")}
          >
            <ThumbsUp className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
