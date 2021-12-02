import { FC } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridFeatureProperty from "./SectionGridFeatureProperty";
import RoundtripSectionGridFeature from "./RoundtripSectionGridFeature";

import OneWayIcon from "images/extra/one-way.svg";
import TwoWayIcon from "images/extra/two-way.svg";

import { useAppSelector } from "app/hook";
import Heading from "components/Heading/Heading";

export interface HotelSearchPageProps {
  className?: string;
}

const LaunchSearchPage: FC<HotelSearchPageProps> = ({ className = "" }) => {
  const { launchUserInput, firstLaunchSelected } = useAppSelector(
    (state) => state.launch
  );

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>TicketsForTravel | Buy Launch Tickets Online</title>
      </Helmet>
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          currentPage="Launch"
          currentTab="Launch"
          className="pt-10 pb-24 lg:pb-20 lg:pt-20"
        />

        {launchUserInput?.fromCity && launchUserInput?.toCity && (
          <div className={`mb-12 lg:mb-16 ${className}`}>
            <Heading
              desc={
                launchUserInput.roundTrip
                  ? firstLaunchSelected
                    ? `Choose a launch for ${launchUserInput?.toCity.locName} to
          ${launchUserInput?.fromCity.locName}`
                    : `Choose a launch for ${launchUserInput?.fromCity.locName} to
          ${launchUserInput?.toCity.locName}`
                  : ""
              }
            >
              <span className="flex align-middle text-4xl font-semibold">
                Launch in {launchUserInput.fromCity.locName}
                {launchUserInput.roundTrip ? (
                  <img
                    src={TwoWayIcon}
                    alt="Two Way Icon"
                    className="w-11 h-auto mx-4"
                  />
                ) : (
                  <img
                    src={OneWayIcon}
                    alt="One Way Icon"
                    className="w-11 h-auto mx-4"
                  />
                )}
                {launchUserInput.toCity.locName}
              </span>
            </Heading>
          </div>
        )}

        {launchUserInput?.roundTrip ? (
          <RoundtripSectionGridFeature variant="Launch" />
        ) : (
          <SectionGridFeatureProperty variant="Launch" />
        )}

        {/* SECTION 1 */}
        {/* Will Change */}
        <div className="mt-24">
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewCategories
              heading="Explore by types of Bus"
              subHeading="Explore bus based on 10 types of place"
              categoryCardType="card5"
              itemPerRow={5}
              sliderStyle="style2"
            />
          </div>
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className="py-24 lg:py-32" />

        {/* SECTION */}
        <div className="relative py-16 mb-24 lg:mb-32">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div>
      </div>
    </div>
  );
};

export default LaunchSearchPage;
