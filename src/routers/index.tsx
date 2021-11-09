import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Page } from './types';
import ScrollToTop from './ScrollToTop';
import Header from 'shared/Header/Header';
import Footer from 'shared/Footer/Footer';
import PageHome from 'containers/PageHome/PageHome';
import Page404 from 'containers/Page404/Page404';
import HotelSearchPage from 'containers/HotelSearchPage/HotelSearchPage';
import PayPage from 'containers/PayPage/PayPage';
import AuthorPage from 'containers/AuthorPage/AuthorPage';
import PageContact from 'containers/PageContact/PageContact';
import PageSignUp from 'containers/PageSignUp/PageSignUp';
import PageLogin from 'containers/PageLogin/PageLogin';
import HotelDetailsPage from 'containers/HotelSearchPage/HotelDetailsPage';
import HotelCheckOut from 'containers/CheckOutPage/HotelCheckOut';
import OtpPage from 'containers/PageSignUp/OtpPage';

export const pages: Page[] = [
  { path: '/', exact: true, component: PageHome },
  { path: '/#', exact: true, component: PageHome },
  { path: '/hotel', exact: true, component: HotelSearchPage },
  { path: '/hotel/checkout', exact: true, component: HotelCheckOut },
  { path: '/hotel/:id', exact: true, component: HotelDetailsPage },
  //

  //
  { path: '/pay-done', component: PayPage },
  //
  { path: '/author', component: AuthorPage },
  //
  //
  { path: '/contact-us', component: PageContact },
  { path: '/signup', component: PageSignUp },
  { path: '/login', component: PageLogin },
  { path: '/phone-verfication', component: OtpPage },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
