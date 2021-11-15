import { FC } from 'react';
import GallerySlider from 'components/GallerySlider/GallerySlider';
import { Link } from 'react-router-dom';
import Badge from 'shared/Badge/Badge';
import moment from 'moment';

import OneWayIcon from 'images/extra/one-way.svg';

export interface PropertyCardHProps {
  className?: string;
  data?: any;
}

const PropertyCardH: FC<PropertyCardHProps> = ({ className = '', data }) => {
  const { _id, images, AC, model, numOfSeats, name, fare, depTime, arrTime } =
    data;

  //   const state = useAppSelector((state) => state.state);

  const renderSliderGallery = () => {
    return (
      <div className='flex-shrink-0 p-3 w-full h-full sm:w-64 '>
        <GallerySlider
          ratioClass='aspect-w-1 aspect-h-1'
          galleryImgs={images}
          className='w-full h-full rounded-2xl overflow-hidden'
        />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className='flex justify-between'>
        <div className='flex items-center space-x-2'>
          <span className='hidden sm:inline-block'>
            <i className='las la-bed text-lg'></i>
          </span>
          <span className='text-xs text-neutral-500 dark:text-neutral-400'>
            <div className='text-center font-semibold'>Departure</div>
            {moment(depTime).format('DD-MMM-YY')}
          </span>
        </div>

        <div className='flex items-center space-x-2'>
          <span className='text-xs text-neutral-500 dark:text-neutral-400'>
            <img src={OneWayIcon} alt='One Way Icon' className='w-10 h-auto' />
          </span>
        </div>

        <div className='flex items-center space-x-2'>
          <span className='hidden sm:inline-block'>
            <i className='las la-expand-arrows-alt text-lg'></i>
          </span>
          <span className='text-xs text-neutral-500 dark:text-neutral-400'>
            <div className='text-center font-semibold'>Arrival</div>
            {moment(arrTime).format('DD-MMM-YY')}
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className='flex-grow p-3 sm:pr-6 flex flex-col items-start'>
        <div className='space-y-4 w-full'>
          <div className='inline-flex space-x-3'>
            <Badge
              name={
                <div className='flex items-center'>
                  <i className='text-sm las la-user-friends'></i>
                  <span className='ml-1'>{model}</span>
                </div>
              }
              color='yellow'
            />
            <Badge
              name={
                <div className='flex items-center'>
                  <i className='text-sm las la-share-alt'></i>
                  <span className='ml-1'>{numOfSeats} Seats</span>
                </div>
              }
            />

            {AC && (
              <Badge
                name={
                  <div className='flex items-center'>
                    <i className='text-sm las la-user-friends'></i>
                    <span className='ml-1'>AC</span>
                  </div>
                }
                color='yellow'
              />
            )}
          </div>
          <div className='flex items-center space-x-2'>
            <h2 className='text-lg font-medium capitalize'>
              <span className='line-clamp-2'>{name}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className='w-14 border-b border-neutral-100 dark:border-neutral-800 '></div>
          <div className='flex w-full justify-between items-end'>
            <span className='flex items-center justify-center px-3 py-2 border border-primary-6000 rounded leading-none text-base font-medium text-primary-6000'>
              {`BDT ${fare}.000`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow ${className}`}
      data-nc-id='PropertyCardH'
    >
      <Link
        to={`/bus/${_id}`}
        className='h-full w-full flex flex-col sm:flex-row sm:items-center'
      >
        {renderSliderGallery()}
        {renderContent()}
      </Link>
    </div>
  );
};

export default PropertyCardH;
