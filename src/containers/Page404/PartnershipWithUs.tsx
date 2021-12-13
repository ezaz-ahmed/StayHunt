import { FC } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import PartnershipPage from "images/Partnership.png";

const PartnershipWithUs: FC = () => (
  <div className="nc-Page404">
    <Helmet>
      <title>Partnership | TicketsForTravel</title>
    </Helmet>
    <main className="container relative pb-16 lg:pb-20 lg:pt-5">
      <div className="text-center max-w-4xl mx-auto space-y-2 my-20">
        <span className="text-5xl font-semibold">
          Grow Your Business With Us
        </span>

        <NcImage src={PartnershipPage} />

        <div className="flex justify-around pt-8">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://hotel.tickets4travel.com/#/login"
            className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 py-3 px-6 text-xl rounded-full`}
          >
            Hotel
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://bus.tickets4travel.com/#/login"
            className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 py-3 px-6 text-xl rounded-full`}
          >
            Bus
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://launch.tickets4travel.com/#/login"
            className={`ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 py-3 px-6 text-xl rounded-full`}
          >
            Launch
          </a>
        </div>
      </div>
    </main>
  </div>
);

export default PartnershipWithUs;
