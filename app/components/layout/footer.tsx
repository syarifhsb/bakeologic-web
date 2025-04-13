import { FacebookIcon, InstagramIcon, type LucideIcon } from "lucide-react";
import { Link } from "react-router";
import { Logo } from "~/components/custom/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

type FooterLink = {
  name: string;
  text?: string;
  href: string;
  icon?: LucideIcon;
};

type FooterGroup = {
  group: string;
  type: "text" | "icon";
  links: FooterLink[];
};

const footerLinks: FooterGroup[] = [
  {
    group: "USEFUL INFORMATION",
    type: "text",
    links: [{ name: "FAQ", text: "FAQ", href: "/faq" }],
  },
  {
    group: "CONTACT US",
    type: "text",
    links: [
      { name: "Contact", text: "Contact Information", href: "/contact" },
      { name: "Shop", text: "Find our shops", href: "/shops" },
    ],
  },
  {
    group: "FOLLOW US",
    type: "icon",
    links: [
      { name: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
      { name: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="dark bg-background text-foreground mt-7">
      <div className="flex flex-col md:flex-row m-7 justify-between">
        <Accordion className="md:hidden" type="single" collapsible>
          {footerLinks.map((group) => (
            <AccordionItem value={group.group} key={group.group}>
              <AccordionTrigger className="font-semibold text-md">
                {group.group}
              </AccordionTrigger>
              {group.type === "text" ? (
                <AccordionContent className="flex flex-col gap-y-1">
                  {group.links.map((link) => (
                    <Link to={link.href} key={link.text} className="ml-4">
                      {link.text}
                    </Link>
                  ))}
                </AccordionContent>
              ) : group.type === "icon" ? (
                <AccordionContent className="flex flex-row gap-y-1">
                  {group.links.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      className="ml-4 text-sm"
                    >
                      {link.icon && <link.icon />}
                    </Link>
                  ))}
                </AccordionContent>
              ) : null}
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex flex-col items-center space-y-2 text-xs md:items-start mt-7 md:mt-0">
          <Logo inverted />
          <p>Baking with logic, love and magic</p>
          <p>Bakeologic © 2025. All rights reserved.</p>
        </div>
        <div className="hidden md:flex flex-row gap-x-4">
          {footerLinks.map((group) =>
            group.type === "text" ? (
              <div className="flex flex-col space-y-2 w-48" key={group.group}>
                <div className="font-semibold border-b pb-2">{group.group}</div>
                <div className="flex flex-col gap-y-1">
                  {group.links.map((link) => (
                    <Link to={link.href} className="text-sm" key={link.name}>
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            ) : group.type === "icon" ? (
              <div className="flex flex-col space-y-2 w-48" key={group.group}>
                <div className="font-semibold border-b pb-2">{group.group}</div>
                <div className="flex flex-row gap-x-2">
                  {group.links.map((link) => (
                    <Link
                      to={link.href}
                      className="text-sm"
                      key={link.name}
                      target="_blank"
                    >
                      {link.icon && <link.icon />}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </footer>
  );
}
