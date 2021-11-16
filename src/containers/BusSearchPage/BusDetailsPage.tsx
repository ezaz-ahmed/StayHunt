import { FC, Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { useAppSelector, useAppDispatch } from 'app/hook';
import HotelDatesRangeInput from 'components/HeroSearchForm/HotelDatesRangeInput';
import { DateRage } from 'components/HeroSearchForm/StaySearchForm';
import useWindowSize from 'hooks/useWindowResize';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import NcImage from 'shared/NcImage/NcImage';
import ModalPhotos from 'containers/ListingDetailPage/ModalPhotos';
import Badge from 'shared/Badge/Badge';
import Page404 from 'containers/Page404/Page404';
import { fetchSingleBuslAsync } from 'app/feature/bus/busSlice';
import SomethingWrong from 'containers/Page404/SomethingWrong';
// import BusDateSingleInput

interface HotelDetailsPageProps {
  match?: any;
}

const BusDetailsPage: FC<HotelDetailsPageProps> = ({ match }) => {
  const { busUserInput, oneBus, status } = useAppSelector((state) => state.bus);

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: busUserInput?.journeyDate
      ? moment(busUserInput.journeyDate)
      : moment().add(1, 'days'),
    endDate: busUserInput?.returnDate
      ? moment(busUserInput.returnDate)
      : moment().add(3, 'days'),
  });

  const { id } = match.params;

  console.log(oneBus, '⭕');

  useEffect(() => {
    const depDate = selectedDate.startDate?.toISOString();
    dispatch<any>(
      fetchSingleBuslAsync({
        id,
        depDate: depDate,
        fromLocId: busUserInput?.fromCity.locId,
        toLocId: busUserInput?.toCity.locId,
      })
    );
  }, [id]);

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const windowSize = useWindowSize();

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    return oneBus ? (
      <div className='listingSection__wrap !space-y-6'>
        <div className='flex justify-between items-center'>
          <Badge color='yellow' name={oneBus.model} />
        </div>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          {oneBus.name}
        </h2>

        <div className='flex items-center space-x-4'>
          <span>
            <i className='las la-fan'></i>
            <span className='ml-1'>BDT {oneBus.fare}.000</span>
          </span>

          <span>·</span>

          <span>
            <i className='las la-fan'></i>
            <span className='ml-1'>{oneBus.AC ? 'AC' : 'Non - AC'}</span>
          </span>
        </div>

        <div className='w-full border-b border-neutral-100 dark:border-neutral-700 py-1' />

        <h2 className='text-2xl font-semibold'>Select Your Seat</h2>

        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <div className='text-neutral-6000 dark:text-neutral-300'>
          "Seat List"
        </div>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  };

  const renderSidebar = () => {
    return (
      <div className='listingSection__wrap shadow-xl'>
        <div className='flex justify-between'>
          <span className='text-2xl'>
            BDT {oneBus?.fare}
            <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
              /seat
            </span>
          </span>
        </div>

        {/* FORM */}

        <form className='flex border divide-x divide-neutral-200 dark:divide-neutral-700 border-neutral-200 dark:border-neutral-700 rounded-3xl '>
          <div className='flex-1'></div>
        </form>

        <form className='flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl '>
          <HotelDatesRangeInput
            wrapClassName='divide-x divide-neutral-200 dark:divide-neutral-700'
            onChange={(date) => setSelectedDate(date)}
            numberOfMonths={1}
            fieldClassName='p-5'
            defaultValue={selectedDate}
            anchorDirection={windowSize.width > 1400 ? 'left' : 'right'}
          />
        </form>

        <ButtonPrimary>Reserve</ButtonPrimary>
      </div>
    );
  };

  const renderPhotoSection = () => {
    let PHOTOS: string[] = [];

    if (oneBus?.images) {
      PHOTOS = oneBus?.images;
    }

    return (
      <Fragment>
        <header className='container 2xl:px-14 rounded-md sm:rounded-xl'>
          <div className='relative grid grid-cols-4 gap-1 sm:gap-2'>
            <div
              className='col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
              onClick={() => handleOpenModal(0)}
            >
              <NcImage
                containerClassName='absolute inset-0'
                className='object-cover w-full h-full rounded-md sm:rounded-xl'
                src={PHOTOS[0]}
                prevImageHorizontal
              />
              <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
            </div>

            {/*  */}
            <div
              className='col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
              onClick={() => handleOpenModal(1)}
            >
              <NcImage
                containerClassName='absolute inset-0'
                className='object-cover w-full h-full rounded-md sm:rounded-xl'
                src={PHOTOS[1]}
                prevImageHorizontal
              />
              <div className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity'></div>
            </div>

            {/*  */}
            {PHOTOS.filter((_, i) => i >= 2 && i < PHOTOS.length).map(
              (item, index) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 2 ? 'block' : ''
                  }`}
                >
                  <NcImage
                    containerClassName='aspect-w-4 aspect-h-3'
                    className='object-cover w-full h-full rounded-md sm:rounded-xl '
                    src={item || ''}
                    prevImageHorizontal
                  />

                  {/* OVERLAY */}
                  <div
                    className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
                    onClick={() => handleOpenModal(index + 2)}
                  />
                </div>
              )
            )}

            <div
              className='absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10'
              onClick={() => handleOpenModal(0)}
            >
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
                  d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                />
              </svg>
              <span className='ml-2 text-neutral-800 text-sm font-medium'>
                Show all photos
              </span>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotos
          imgs={PHOTOS}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
        />
      </Fragment>
    );
  };

  return status === 'loading' ? (
    <h1>Loading</h1>
  ) : status === 'idle' ? (
    oneBus ? (
      <div
        className={`nc-ListingStayDetailPage pb-20`}
        data-nc-id='ListingStayDetailPage'
      >
        {renderPhotoSection()}

        <main className='container mt-11 flex '>
          <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10'>
            {renderSection1()}
            {renderSection1()}
            {renderSection1()}
          </div>

          <div className='hidden lg:block flex-grow'>
            <div className='sticky top-24'>{renderSidebar()}</div>
          </div>
        </main>
      </div>
    ) : (
      <SomethingWrong />
    )
  ) : (
    <Page404 />
  );
};

export default BusDetailsPage;
