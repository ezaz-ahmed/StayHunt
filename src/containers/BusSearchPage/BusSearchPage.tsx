import { FC } from 'react';
import { Helmet } from 'react-helmet';
import BackgroundSection from 'components/BackgroundSection/BackgroundSection';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import SectionGridAuthorBox from 'components/SectionGridAuthorBox/SectionGridAuthorBox';
import SectionHeroArchivePage from 'components/SectionHeroArchivePage/SectionHeroArchivePage';
import SectionSliderNewCategories from 'components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionSubscribe2 from 'components/SectionSubscribe2/SectionSubscribe2';
import SectionGridFeatureProperty from './SectionGridFeatureProperty';

import OneWayIcon from 'images/extra/one-way.svg';
import TwoWayIcon from 'images/extra/two-way.svg';

import { useAppSelector } from 'app/hook';

export interface HotelSearchPageProps {
  className?: string;
}

const BusSearchPage: FC<HotelSearchPageProps> = ({ className = '' }) => {
  const { busUserInput, busList } = useAppSelector((state) => state.bus);

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id='ListingStayPage'
    >
      <Helmet>
        <title>TicketsForTravel | Buy Bus Tickets Online</title>
      </Helmet>
      <BgGlassmorphism />

      <div className='container relative overflow-hidden'>
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          currentPage='Bus'
          currentTab='Bus'
          className='pt-10 pb-24 lg:pb-20 lg:pt-20'
        />

        {busUserInput?.fromCity && busUserInput?.toCity && (
          <div className={`mb-12 lg:mb-16 ${className}`}>
            <h2 className='flex align-middle text-4xl font-semibold'>
              Bus in {busUserInput.fromCity.locName}
              {busUserInput.roundTrip ? (
                <img
                  src={TwoWayIcon}
                  alt='Two Way Icon'
                  className='w-11 h-auto mx-4'
                />
              ) : (
                <img
                  src={OneWayIcon}
                  alt='One Way Icon'
                  className='w-11 h-auto mx-4'
                />
              )}
              {busUserInput.toCity.locName}
            </h2>
          </div>
        )}

        {busList.bus && busList.bus.length > 0 && (
          <SectionGridFeatureProperty />
        )}

        {/* SECTION 1 */}
        <div className='relative py-16'>
          <BackgroundSection />
          <SectionSliderNewCategories
            heading='Explore by types of stays'
            subHeading='Explore houses based on 10 types of stays'
            categoryCardType='card5'
            itemPerRow={5}
            sliderStyle='style2'
          />

          <div className='relative py-16'>
            <BackgroundSection />
            <SectionSliderNewCategories
              heading='Explore by types of stays'
              subHeading='Explore houses based on 10 types of stays'
              categoryCardType='card5'
              itemPerRow={5}
              sliderStyle='style2'
            />
          </div>
        </div>

        {/* SECTION */}
        <SectionSubscribe2 className='py-24 lg:py-32' />

        {/* SECTION */}
        <div className='relative py-16 mb-24 lg:mb-32'>
          <BackgroundSection className='bg-orange-50 dark:bg-black dark:bg-opacity-20 ' />
          <SectionGridAuthorBox />
        </div>
      </div>
    </div>
  );
};

export default BusSearchPage;
