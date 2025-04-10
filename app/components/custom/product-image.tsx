import type { ProductImageJSON } from "~/modules/product/type";

const defaultImage = {
  url: "https://placehold.co/300x200",
  altText: "Placeholder",
};

export default async function ProductImage({
  image,
  ...props
}: React.ComponentProps<"div"> & {
  image: ProductImageJSON | undefined;
}) {
  const imageValidated = image ? image : defaultImage;

  return (
    <div className="relative w-full h-full" {...props}>
      <img
        src={imageValidated.url}
        alt={imageValidated.altText}
        height={217}
        width={325}
      />
    </div>
  );
}
