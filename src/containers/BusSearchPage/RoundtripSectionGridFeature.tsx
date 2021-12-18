import { Fragment, FC } from 'react';
import { useAppSelector } from 'app/hook';
import moment from 'moment';
import SectionGridFeatureProperty from './SectionGridFeatureProperty';

export interface RoundtripSectionGridFeatureProps {
  variant: 'Bus' | 'Launch';
}

const RoundtripSectionGridFeature: FC<RoundtripSectionGridFeatureProps> = ({
  variant,
}) => {
  const { inputFirstBus, busUserInput } = useAppSelector((state) => state.bus);
  const { inputFirstLaunch, launchUserInput } = useAppSelector(
    (state) => state.launch
  );

  const BusJourneyDetails = () => (
    <div className='ml-4 space-y-14 text-sm'>
      <div className='flex flex-col space-y-2'>
        {inputFirstBus ? (
          <Fragment>
            <span className=' text-neutral-500 dark:text-neutral-400'>
              {moment(busUserInput?.journeyDate).format('MMMM D, YYYY')}
            </span>
            <span className=' font-semibold'>
              {inputFirstBus.busName} {JSON.stringify(inputFirstBus.seats)}
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <span className=' text-neutral-500 dark:text-neutral-400'>
              {moment(busUserInput?.journeyDate).format('MMMM D, YYYY')}
            </span>
            <span className=' font-semibold'>No Bus Is Selected</span>{' '}
          </Fragment>
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        <span className=' text-neutral-500 dark:text-neutral-400'>
          {moment(busUserInput?.returnDate).format('D MMMM, YYYY')}
        </span>
        <span className=' font-semibold'>No Bus Is Selected</span>
      </div>
    </div>
  );

  const LaunchJourneyDetails = () => (
    <div className='ml-4 space-y-14 text-sm'>
      <div className='flex flex-col space-y-2'>
        {inputFirstLaunch ? (
          <Fragment>
            <span className=' text-neutral-500 dark:text-neutral-400'>
              {moment(launchUserInput?.journeyDate).format('MMMM D, YYYY')}
            </span>
            <span className=' font-semibold'>
              {inputFirstLaunch.launchName}
            </span>
          </Fragment>
        ) : (
          <Fragment>
            <span className=' text-neutral-500 dark:text-neutral-400'>
              {moment(launchUserInput?.returnDate).format('MMMM D, YYYY')}
            </span>
            <span className=' font-semibold'>Select A Launch For Journey</span>{' '}
          </Fragment>
        )}
      </div>
      <div className='flex flex-col space-y-2'>
        <span className=' text-neutral-500 dark:text-neutral-400'>
          {moment(busUserInput?.returnDate).format('MMMM D, YYYY')}
        </span>
        <span className=' font-semibold'>Select A Launch For Return</span>
      </div>
    </div>
  );

  const renderSidebarDetail = () => {
    return (
      <div className='listingSection__wrap shadow-xl'>
        <span className='text-2xl font-semibold block'>
          Journey & Return Details
        </span>
        <div className='mt-8 flex'>
          <div className='flex-shrink-0 flex flex-col items-center py-2'>
            <span className='block w-6 h-6 rounded-full border border-neutral-400'></span>
            <span className='block flex-grow border-l border-neutral-400 border-dashed my-1'></span>
            <span className='block w-6 h-6 rounded-full border border-neutral-400'></span>
          </div>
          {variant === 'Bus' && BusJourneyDetails()}
          {variant === 'Launch' && LaunchJourneyDetails()}
        </div>
      </div>
    );
  };

  const renderSection = () => {
    return <SectionGridFeatureProperty variant={variant} />;
  };

  return (
    <div
      className={`nc-ListingStayDetailPage pb-20`}
      data-nc-id='ListingStayDetailPage'
    >
      <main className='mt-11 flex '>
        {/* CONTENT */}
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10'>
          {renderSection()}
        </div>

        {/* SIDEBAR */}
        <div className='hidden lg:block flex-grow'>{renderSidebarDetail()}</div>
      </main>
    </div>
  );
};

export default RoundtripSectionGridFeature;
