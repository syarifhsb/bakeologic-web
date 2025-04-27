import type { ProductImageJSON } from "~/modules/product/type";

const defaultImage = {
  url: "https://placehold.co/300x200",
  altText: "Placeholder",
};

export default function ProductImage({
  image,
  height,
  width,
  ...props
}: React.ComponentProps<"div"> & {
  image: ProductImageJSON | undefined;
  height?: number;
  width?: number;
}) {
  const imageValidated = image ? image : defaultImage;
  const heightValidated = height || 217;
  const widthValidated = width || 325;

  return (
    <div className="relative w-full h-full" {...props}>
      <img
        src={imageValidated.url}
        alt={imageValidated.altText}
        height={heightValidated}
        width={widthValidated}
      />
    </div>
  );
}
