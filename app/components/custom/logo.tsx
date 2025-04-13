import logoInverted from "~/assets/logo-inverted.png";
import logo from "~/assets/logo.png";

export function Logo({ inverted }: { inverted?: boolean }) {
  const logoAsset = inverted ? logoInverted : logo;
  return <img src={logoAsset} alt="Bakeologic Logo" height={20} width={150} />;
}
