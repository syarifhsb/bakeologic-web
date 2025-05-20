import { useNavigation } from "react-router";
import { Button } from "~/components/ui/button";
import * as React from "react";

export function ButtonLoading({
  textIdle = "Submit",
  textSubmitting = "Submitting...",
}: React.ComponentProps<"button"> & {
  textIdle?: string;
  textSubmitting?: string;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <Button className="cursor-pointer" type="submit" disabled={isSubmitting}>
      {isSubmitting ? textSubmitting : textIdle}
    </Button>
  );
}
