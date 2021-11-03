// This Component is changed

import { FC } from 'react';
import GallerySlider from 'components/GallerySlider/GallerySlider';
import { Room } from 'app/feature/hotel/hotelInterfaces';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';

export interface StayCardHProps {
  className?: string;
  data: Room;
  selected: number;
  index: number;
  onSelectedChange: any;
}

// const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const HotelCardH: FC<StayCardHProps> = ({
  className = '',
  data,
  index,
  selected,
  onSelectedChange,
}) => {
  const { images, type, costPerNight, roomAmenities, meals } = data;
  let targeted = false;

  if (selected === index) {
    targeted = true;
  }

  const renderSliderGallery = () => {
    return (
      <div className='relative w-full sm:w-72 '>
        <GallerySlider
          ratioClass='aspect-w-6 aspect-h-5'
          galleryImgs={images}
        />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className='hidden sm:grid grid-cols-3 gap-2'>
        <div>
          <span>Room Facilities</span>
          {roomAmenities.map((am, i) => (
            <div className='space-y-3' key={i}>
              <div className='flex items-center space-x-3'>
                <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                  {am}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <span>Meals</span>
          {meals.map((m, i) => (
            <div className='space-y-3' key={i}>
              <div className='flex items-center space-x-3'>
                <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                  {m}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className='flex-grow p-3 sm:p-5 flex flex-col'>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <h2 className='text-lg font-medium capitalize'>
              <span className='line-clamp-1 text-2xl'>{type}</span>
            </h2>
          </div>
        </div>
        <div className='hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4'></div>
        {renderTienIch()}
        <div className='w-14 border-b border-neutral-100 dark:border-neutral-800 my-4'></div>
        <div className='flex justify-between items-end'>
          <span className='text-base font-semibold'>
            {costPerNight}
            {` `}
            <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
              /night
            </span>
          </span>
          <span>
            {targeted ? (
              <ButtonSecondary className='cursor-not-allowed opacity-50 -mt-3'>
                Selected Now
              </ButtonSecondary>
            ) : (
              <ButtonPrimary
                onClick={() => onSelectedChange(index)}
                className='-mt-3'
              >
                Choose This
              </ButtonPrimary>
            )}
          </span>
        </div>
      </div>
    );
  };

  const border = targeted
    ? 'border-primary-6000'
    : 'border-neutral-100 dark:border-neutral-800';

  return (
    <div
      className={`nc-StayCardH group relative bg-white dark:bg-neutral-900 border ${border}  rounded-2xl overflow-hidden ${className}`}
      data-nc-id='StayCardH'
    >
      <div className='flex flex-col sm:flex-row sm:items-center'>
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default HotelCardH;
