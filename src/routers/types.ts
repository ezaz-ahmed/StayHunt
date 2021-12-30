import { ComponentType } from 'react';

export interface LocationStates {
  '/'?: {};
  '/#'?: {};
  //
  '/hotel'?: {};
  '/hotel/:id'?: {};
  '/hotel/checkout'?: {};
  '/hotel-pay-done'?: {};
  //
  '/bus'?: {};
  '/bus/:id'?: {};
  '/bus/checkout'?: {};
  '/bus/roundtrip-checkout'?: {};
  //
  '/launch'?: {};
  '/launch/:id'?: {};
  '/launch/checkout'?: {};
  '/launch/roundtrip-checkout'?: {};
  //
  '/listing-stay'?: {};
  '/listing-stay-map'?: {};
  '/listing-stay-detail'?: {};
  //
  '/listing-experiences'?: {};
  '/listing-experiences-map'?: {};
  '/listing-experiences-detail'?: {};
  //
  '/listing-car'?: {};
  '/listing-car-map'?: {};
  '/listing-car-detail'?: {};
  //
  '/checkout'?: {};
  //
  '/edit-account'?: {};
  '/account-password'?: {};
  //
  '/blog'?: {};
  '/blog-single'?: {};
  //
  '/add-listing-1'?: {};
  '/add-listing-2'?: {};
  '/add-listing-3'?: {};
  '/add-listing-4'?: {};
  '/add-listing-5'?: {};
  '/add-listing-6'?: {};
  '/add-listing-7'?: {};
  '/add-listing-8'?: {};
  '/add-listing-9'?: {};
  '/add-listing-10'?: {};
  //
  '/author'?: {};
  '/search'?: {};
  '/about-us'?: {};
  '/contact-us'?: {};
  '/login'?: {};
  '/signup'?: {};
  '/verfication'?: {};
  '/confirm-identity'?: {};
  '/seach-account'?: {};
  '/change-password'?: {};
  '/page404'?: {};
  '/partnership-with-us'?: {};
  '/subscription'?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}
