import { ComponentType } from "react";

export interface LocationStates {
  '/'?: {};
  '/#'?: {};
  //
  '/hotel'?: {};
  '/hotel/:id'?: {};
  '/hotel/checkout'?: {};
  //
  '/checkout'?: {};
  '/pay-done'?: {};

  //
  '/author'?: {};
  '/contact-us'?: {};
  '/login'?: {};
  '/signup'?: {};
  '/phone-verfication'?: {};
  '/forgot-pass'?: {};
  '/page404'?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
