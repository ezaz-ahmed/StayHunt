import { FC, Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { StarIcon } from '@heroicons/react/solid';
import { useAppSelector, useAppDispatch } from 'app/hook';
import { ArrowRightIcon } from '@heroicons/react/outline';
import LocationMarker from 'components/AnyReactComponent/LocationMarker';
import CommentListing from 'components/CommentListing/CommentListing';
import FiveStartIconForRate from 'components/FiveStartIconForRate/FiveStartIconForRate';
import GuestsInput from 'components/HeroSearchForm/GuestsInput';
import StayDatesRangeInput from 'components/HeroSearchForm/StayDatesRangeInput';
import { DateRage } from 'components/HeroSearchForm/StaySearchForm';
import StartRating from 'components/StartRating/StartRating';
import GoogleMapReact from 'google-map-react';
import useWindowSize from 'hooks/useWindowResize';
import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import Avatar from 'shared/Avatar/Avatar';
import ButtonCircle from 'shared/Button/ButtonCircle';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import ButtonSecondary from 'shared/Button/ButtonSecondary';
import Input from 'shared/Input/Input';
import NcImage from 'shared/NcImage/NcImage';
import ModalPhotos from 'containers/ListingDetailPage/ModalPhotos';
import { fetchSingleHotelAsync } from 'app/feature/hotel/hotelSlice';

interface HotelDetailsPageProps {
  match?: any;
}

const PHOTOS: string[] = [
  'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/2677398/pexels-photo-2677398.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

const HotelDetailsPage: FC<HotelDetailsPageProps> = ({ match }) => {
  const { hotelUserInput, oneHotel } = useAppSelector((state) => state.hotel);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: hotelUserInput?.checkIn
      ? moment(hotelUserInput.checkIn)
      : moment().add(1, 'days'),
    endDate: hotelUserInput?.checkOut
      ? moment(hotelUserInput.checkOut)
      : moment().add(3, 'days'),
  });

  const { id } = match.params;

  const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
    useState<FocusedInputShape>('startDate');

  useEffect(() => {
    const startDate = selectedDate.startDate?.toISOString();
    const endDate = selectedDate.endDate?.toISOString();
    dispatch(
      fetchSingleHotelAsync({ id: id, checkIn: startDate, checkOut: endDate })
    );
  }, [id]);

  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 375) {
      return 34;
    }
    if (windowSize.width <= 500) {
      return undefined;
    }
    if (windowSize.width <= 1280) {
      return 56;
    }
    return 48;
  };

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    let outArr = Array.from(Array(oneHotel?.starRating), (_, x) => x);

    return (
      <div className='listingSection__wrap !space-y-6'>
        {/* 2 */}
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          {oneHotel?.name}
        </h2>

        {/* 3 */}
        <div className='flex items-center space-x-4'>
          <span className='flex'>
            {outArr.map((o) => (
              <StarIcon key={o} className='w-5 h-5 text-red-500 m-0 p-0' />
            ))}
          </span>

          <span>{oneHotel?.starRating} Star Hotel</span>

          <span>·</span>

          <span>
            <i className='las la-map-marker-alt'></i>
            <span className='ml-1'>{oneHotel?.city.cityName}, Bangladesh</span>
          </span>
        </div>

        {/* 5 */}
        <div className='w-full border-b border-neutral-100 dark:border-neutral-700 py-3' />

        <h2 className='text-2xl font-semibold'>Hotel information</h2>

        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <div className='text-neutral-6000 dark:text-neutral-300'>
          {oneHotel?.description}
        </div>

        <div className='w-full border-b border-neutral-100 dark:border-neutral-700 py-3' />

        <h2 className='text-2xl font-semibold'>Amenities </h2>

        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 '>
          {oneHotel?.amenityGroups.map((item, i) => (
            <div key={i} className='flex items-center space-x-3'>
              <i className={`text-3xl las ${item}`}></i>
              <span className=' '>{item.groupName}</span>
            </div>
          ))}
        </div>

        <div className='w-full border-b border-neutral-100 dark:border-neutral-700 py-3' />

        <h2 className='text-2xl font-semibold'>Location</h2>

        <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
          {oneHotel?.contact.address}
        </span>

        {oneHotel?.contact.center && (
          <div>
            <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />

            <div className='aspect-w-5 aspect-h-5 sm:aspect-h-3'>
              <div className='rounded-xl overflow-hidden'>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: 'AIzaSyDPfBZ1mfJoXWhR7dzYdMvHkfMo8WlQ3Fg',
                  }}
                  defaultZoom={15}
                  yesIWantToUseGoogleMapApiInternals
                  defaultCenter={{
                    lat: 55.9607277,
                    lng: 36.2172614,
                  }}
                >
                  <LocationMarker
                    lat={oneHotel.contact.center.lat}
                    lng={oneHotel.contact.center.lon}
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        )}

        <div className='w-full border-b border-neutral-100 dark:border-neutral-700 py-3' />

        <h2 className='text-2xl font-semibold'>Things to know</h2>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />

        <div>
          <h4 className='text-lg font-semibold'>Cancellation policy</h4>
          <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
            Refund 50% of the booking value when customers cancel the room
            within 48 hours after successful booking and 14 days before the
            check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50%
            refund of the total amount paid (minus the service fee).
          </span>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className='listingSection__wrap'>
        {/* HEADING */}
        <h2 className='text-2xl font-semibold'>Things to know</h2>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />

        {/* CONTENT */}
        <div>
          <h4 className='text-lg font-semibold'>Cancellation policy</h4>
          <span className='block mt-3 text-neutral-500 dark:text-neutral-400'>
            Refund 50% of the booking value when customers cancel the room
            within 48 hours after successful booking and 14 days before the
            check-in time. <br />
            Then, cancel the room 14 days before the check-in time, get a 50%
            refund of the total amount paid (minus the service fee).
          </span>
        </div>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />

        {/* CONTENT */}

        {/* CONTENT */}
        <div>
          <h4 className='text-lg font-semibold'>Special Note</h4>
          <div className='prose sm:prose'>
            <ul className='mt-3 text-neutral-500 dark:text-neutral-400 space-y-2'>
              <li>
                Ban and I will work together to keep the landscape and
                environment green and clean by not littering, not using
                stimulants and respecting people around.
              </li>
              <li>Do not sing karaoke past 11:30</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebar = () => {
    return (
      <div className='listingSection__wrap shadow-xl'>
        {/* PRICE */}
        <div className='flex justify-between'>
          <span className='text-3xl font-semibold'>
            $119
            <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
              /night
            </span>
          </span>
          <StartRating />
        </div>

        {/* FORM */}
        <form className='flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl '>
          <StayDatesRangeInput
            wrapClassName='divide-x divide-neutral-200 dark:divide-neutral-700'
            onChange={(date) => setSelectedDate(date)}
            numberOfMonths={1}
            fieldClassName='p-5'
            defaultValue={selectedDate}
            anchorDirection={windowSize.width > 1400 ? 'left' : 'right'}
          />
          <div className='w-full border-b border-neutral-200 dark:border-neutral-700'></div>
          <GuestsInput
            fieldClassName='p-5'
            defaultValue={
              hotelUserInput?.guest || {
                guestAdults: 1,
                guestChildren: 0,
                guestRooms: 1,
              }
            }
          />
        </form>

        {/* SUM */}
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>$119 x 3 night</span>
            <span>$357</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>$199</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary>Reserve</ButtonPrimary>
      </div>
    );
  };

  return (
    <div
      className={`nc-ListingStayDetailPage`}
      data-nc-id='ListingStayDetailPage'
    >
      {/* SINGLE HEADER */}
      <>
        <header className='container 2xl:px-14 rounded-md sm:rounded-xl'>
          <div className='relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2'>
            <div
              className='col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer'
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
            {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? 'hidden sm:block' : ''
                }`}
              >
                <NcImage
                  containerClassName='aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5'
                  className='object-cover w-full h-full rounded-md sm:rounded-xl '
                  src={item || ''}
                  prevImageHorizontal
                />

                {/* OVERLAY */}
                <div
                  className='absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer'
                  onClick={() => handleOpenModal(index + 1)}
                />
              </div>
            ))}

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
      </>

      {/* MAIn */}
      <main className='container mt-11 flex '>
        {oneHotel ? (
          <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10'>
            {renderSection1()}
            {renderSection8()}
          </div>
        ) : (
          <h1>Loading</h1>
        )}

        {/* SIDEBAR */}
        <div className='hidden lg:block flex-grow'>
          <div className='sticky top-24'>{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default HotelDetailsPage;
