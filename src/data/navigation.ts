import { MegamenuItem, NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/853199/pexels-photo-853199.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Company',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '#',
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      ' https://images.pexels.com/photos/4245826/pexels-photo-4245826.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'App Name',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '#',
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/867092/pexels-photo-867092.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'City',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '#',
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Contruction',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '#',
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Country',
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: '#',
      name: i.Country,
    })),
  },
];

const templatesChildrenMenus: NavItemType[] = [
  { id: ncNanoId(), href: '/hotel', name: 'Hotel' },
  { id: ncNanoId(), href: '/bus', name: 'Bus' },
  { id: ncNanoId(), href: '/launch', name: 'Launch' },
  { id: ncNanoId(), href: '/flight', name: 'Flight' },
  { id: ncNanoId(), href: '/package-tour', name: 'Package Tour' },
  { id: ncNanoId(), href: '/rental-car', name: 'Rental Car' },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/',
    name: 'Home',
  },
  {
    id: ncNanoId(),
    href: '#',
    name: 'Our Services',
    type: 'dropdown',
    children: templatesChildrenMenus,
  },
  {
    id: ncNanoId(),
    href: '#',
    name: 'Explore World',
    type: 'megaMenu',
    megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: '/contact-us',
    name: 'Contact us',
  },
  {
    id: ncNanoId(),
    href: '/partnership-with-us',
    name: 'Partnership With Us',
  },
];
