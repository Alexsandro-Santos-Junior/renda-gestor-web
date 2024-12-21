import {
  CreditCardIcon,
  HomeIcon,
  RocketIcon,
  BadgeDollarSign,
  Receipt,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon,
    roles: "",
  },
  {
    title: "Despesas",
    href: "/expense",
    icon: CreditCardIcon,
    roles: "",
  },
  {
    title: "Rendas",
    href: "/income",
    icon: Receipt,
    roles: "",
  },
  {
    title: "Patrimonios",
    href: "/asset",
    icon: BadgeDollarSign,
    roles: "",
  },
  {
    title: "Investimentos",
    href: "/investments",
    icon: RocketIcon,
    roles: "",
  },
];
