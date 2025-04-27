import type { ProductImageJSON } from "~/modules/product/type";
import { cn } from "~/lib/cn";

const defaultImage = {
  url: "https://placehold.co/300x200",
  altText: "Placeholder",
};

export default function ProductImage({
  image,
  height = 200,
  width = 300,
  className,
  ...props
}: React.ComponentProps<"img"> & {
  image: ProductImageJSON | undefined;
  height?: number;
  width?: number;
}) {
  const imageValidated = image ? image : defaultImage;

  return (
    <img
      src={`${imageValidated.url}-/scale_crop/${width}x${height}/smart/`}
      alt={imageValidated.altText}
      height={height}
      width={width}
      className={cn("relative w-full h-full", className)}
      {...props}
    />
  );
}
