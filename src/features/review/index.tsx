import * as C from "./components";
import { useReviewFlow } from "./hooks/use-review-flow";

export function ReviewPage() {
  const review = useReviewFlow();

  return (
    <C.ReviewShell
      isOpen={review.isOpen}
      isNoteStep={review.step === "note"}
      onClose={review.close}
    >
      {review.step === "choices" && (
        <C.ChoiceSection
          onOpenGoogleReview={review.openGoogleReview}
          onChooseNote={review.chooseNote}
        />
      )}

      {review.step === "note" && (
        <C.NoteForm onSuccess={review.complete} />
      )}

      {review.step === "success" && (
        <C.SuccessScreen onClose={review.close} />
      )}
    </C.ReviewShell>
  );
}
