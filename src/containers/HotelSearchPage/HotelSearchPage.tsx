import { FC } from 'react';
import { Helmet } from 'react-helmet';
import BackgroundSection from 'components/BackgroundSection/BackgroundSection';
import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import SectionGridAuthorBox from 'components/SectionGridAuthorBox/SectionGridAuthorBox';
import SectionHeroArchivePage from 'components/SectionHeroArchivePage/SectionHeroArchivePage';
import SectionSliderNewCategories from 'components/SectionSliderNewCategories/SectionSliderNewCategories';
import SectionSubscribe2 from 'components/SectionSubscribe2/SectionSubscribe2';
import SectionGridFilterCard from './SectionGridFilterCard';

import { useAppSelector } from 'app/hook';

export interface HotelSearchPageProps {
  className?: string;
}

const HotelSearchPage: FC<HotelSearchPageProps> = ({ className = '' }) => {
  const { hotelUserInput } = useAppSelector((state) => state.hotel);

  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id='ListingStayPage'
    >
      <Helmet>
        <title>TicketsForTravel | Book Hotel From Anywhere</title>
      </Helmet>
      <BgGlassmorphism />

      <div className='container relative overflow-hidden'>
        {/* SECTION HERO */}
        <SectionHeroArchivePage
          currentPage='Hotel'
          currentTab='Hotel'
          className='pt-10 pb-24 lg:pb-20 lg:pt-20'
        />

        {/* SECTION */}
        {hotelUserInput?.location && (
          <SectionGridFilterCard
            className='pb-24 lg:pb-32'
            heading={`Hotels in ${hotelUserInput.location.cityName}`}
          />
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

export default HotelSearchPage;
