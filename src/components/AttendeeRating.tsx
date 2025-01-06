import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsDown, Minus, ThumbsUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type RatingOption = "negative" | "neutral" | "positive";

export function AttendeeRating({ sessionId }: { sessionId: string }) {
  const [selectedRating, setSelectedRating] = useState<RatingOption | null>(
    null
  );

  const handleRating = (rating: RatingOption) => {
    setSelectedRating(rating);
    // Here you would typically send this rating to your backend
    console.log(`Session ${sessionId} rated as ${rating}`);
    toast({
      title: "Thank you for your feedback!",
      description: "Your rating has been recorded.",
    });
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Rate this session</h3>
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
    </div>
  );
}
