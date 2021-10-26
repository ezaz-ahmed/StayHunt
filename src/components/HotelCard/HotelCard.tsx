// This Component is changed

import { FC } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import { HotelInList } from 'app/feature/hotel/hotelInterfaces';
import GallerySlider from 'components/GallerySlider/GallerySlider';

export interface HotelCardProps {
  className?: string;
  ratioClass?: string;
  data?: HotelInList;
  size?: 'default' | 'small';
}

const HotelCard: FC<HotelCardProps> = ({
  size = 'default',
  className = '',
  data,
  ratioClass,
}) => {
  let outArr = Array.from(Array(data?.starRating), (_, x) => x);

  const renderSliderGallery = () => {
    return (
      <div className='relative w-full'>
        {data?.images && (
          <GallerySlider ratioClass={ratioClass} galleryImgs={data.images} />
        )}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === 'default' ? 'p-4 space-y-4' : 'p-3 space-y-2'}>
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <h2
              className={` font-medium capitalize ${
                size === 'default' ? 'text-lg' : 'text-base'
              }`}
            >
              <span className='line-clamp-1'>{data?.name}</span>
            </h2>
          </div>
          <div className='flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2'>
            {size === 'default' && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
            )}
            <span className=''>{data?.city.cityName}</span>
          </div>
        </div>
        <div className='w-14 border-b border-neutral-100 dark:border-neutral-800'></div>
        <div className='flex justify-between items-center'>
          <span className='text-base font-semibold'>
            {`BDT ${data?.minPrice}`}
            {` `}
            {size === 'default' && (
              <span className='text-sm text-neutral-500 dark:text-neutral-400 font-normal'>
                /night
              </span>
            )}
          </span>

          <span className='flex'>
            {outArr.map((o) => (
              <StarIcon key={o} className='w-5 h-5 text-red-500 m-0 p-0' />
            ))}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id='StayCard'
    >
      <Link to={`/hotel/${data?._id}`}>
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default HotelCard;
