import { FC, Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { StarIcon } from '@heroicons/react/solid';
import { useAppSelector, useAppDispatch } from 'app/hook';
import LocationMarker from 'components/AnyReactComponent/LocationMarker';
import StayDatesRangeInput from 'components/HeroSearchForm/StayDatesRangeInput';
import { DateRage } from 'components/HeroSearchForm/StaySearchForm';
import GoogleMapReact from 'google-map-react';
import useWindowSize from 'hooks/useWindowResize';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import NcImage from 'shared/NcImage/NcImage';
import ModalPhotos from 'containers/ListingDetailPage/ModalPhotos';
import {
  fetchSingleHotelAsync,
  addFinalInput,
} from 'app/feature/hotel/hotelSlice';
import Page404 from 'containers/Page404/Page404';
import HotelCardH from 'components/HotelCardH/HotelCardH';
import HotelGuestInput from 'components/HeroSearchForm/HotelGuestInput';
import { Guests } from 'app/feature/hotel/hotelInterfaces';
import SomethingWrong from 'containers/Page404/SomethingWrong';

interface HotelDetailsPageProps {
  match?: any;
}

const HotelDetailsPage: FC<HotelDetailsPageProps> = ({ match }) => {
  const { hotelUserInput, oneHotel, status } = useAppSelector(
    (state) => state.hotel
  );
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRooom, setSelectedRooom] = useState(0);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);
  let night = 2;

  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: hotelUserInput?.checkIn
      ? moment(hotelUserInput.checkIn)
      : moment().add(1, 'days'),
    endDate: hotelUserInput?.checkOut
      ? moment(hotelUserInput.checkOut)
      : moment().add(3, 'days'),
  });

  const [guestValue, setGuestValue] = useState<Guests>({
    guestAdults: hotelUserInput?.guest.guestAdults || 1,
    guestChildren: hotelUserInput?.guest.guestChildren || 0,
    guestRooms: hotelUserInput?.guest.guestRooms || 1,
  });

  const { id } = match.params;

  useEffect(() => {
    const startDate = selectedDate.startDate?.toISOString();
    const endDate = selectedDate.endDate?.toISOString();
    dispatch<any>(
      fetchSingleHotelAsync({ id: id, checkIn: startDate, checkOut: endDate })
    );
  }, [id]);

  const serviceCharge = 0;

  if (selectedDate.endDate) {
    night = selectedDate.endDate.diff(selectedDate.startDate, 'days');
  }

  const handleOpenModal = (index: number) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  let changableAmount = 0;
  let vat = 0;
  let totalAmount = 0;

  if (oneHotel) {
    changableAmount = oneHotel.room[selectedRooom].costPerNight * night;
    vat = Math.ceil(changableAmount * 0.15);
    totalAmount = changableAmount + serviceCharge + vat;
  }

  const windowSize = useWindowSize();

  const handleCloseModal = () => setIsOpen(false);

  const renderSection1 = () => {
    let outArr = Array.from(Array(oneHotel?.starRating), (_, x) => x);

    return oneHotel ? (
      <div className='listingSection__wrap !space-y-6'>
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-semibold'>
          {oneHotel.name}
        </h2>

        <div className='flex items-center space-x-4'>
          <span className='flex'>
            {outArr.map((o) => (
              <StarIcon key={o} className='w-5 h-5 text-red-500 m-0 p-0' />
            ))}
          </span>

          <span>
            {oneHotel.starRating} Star {oneHotel.kind}
          </span>

          <span>·</span>

          <span>
            <i className='las la-map-marker-alt'></i>
            <span className='ml-1'>{oneHotel.city.cityName}, Bangladesh</span>
          </span>
        </div>

        <div className='w-full border-b border-neutral-100 dark:border-neutral-700 py-1' />

        <h2 className='text-2xl font-semibold'>Hotel information</h2>

        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <div className='text-neutral-6000 dark:text-neutral-300'>
          {oneHotel.description}
        </div>
      </div>
    ) : (
      <Fragment></Fragment>
    );
  };

  const renderSection2 = () => {
    return oneHotel ? (
      <div className='listingSection__wrap !space-y-6'>
        <h2 className='text-2xl font-semibold'>Hotel Amenities</h2>

        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 '>
          {oneHotel.amenityGroups.map((item, i) => (
            <div key={i} className='flex items-center space-x-3'>
              <i className={`text-3xl las ${item}`}></i>
              <span className=' '>{item.groupName}</span>
            </div>
          ))}
        </div>

        <div className='w-full border-b border-neutral-100 dark:border-neutral-700 py-3' />

        <h2 className='text-2xl font-semibold'>Location</h2>

        <span className='block mt-2 text-neutral-500 dark:text-neutral-400'>
          {oneHotel.contact.address}
        </span>

        <div>
          <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />
        </div>

        {oneHotel.contact.center && (
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
                    lat: 21.424994853918378,
                    lng: 91.97605516458776,
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
    ) : (
      <Fragment></Fragment>
    );
  };

  const renderRoom = () => {
    return (
      <div className='listingSection__wrap shadow-xl'>
        <h2 className='text-2xl font-semibold'>Select Your Room</h2>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700' />

        {oneHotel?.room.map((item, index) => (
          <div key={item._id}>
            <HotelCardH
              index={index}
              data={item}
              selected={selectedRooom}
              onSelectedChange={setSelectedRooom}
            />
          </div>
        ))}
      </div>
    );
  };

  const reserveBtnClick = () => {
    dispatch(
      addFinalInput({
        checkin: selectedDate.startDate?.toISOString(),
        checkout: selectedDate.endDate?.toISOString(),
        adult: guestValue.guestAdults,
        children: guestValue.guestChildren,
        totalGuest: guestValue.guestAdults + guestValue.guestChildren,
        room: oneHotel?.room[selectedRooom],
        night: night,
        serviceCharge: serviceCharge,
        amount: changableAmount,
        vat: vat,
        totalAmount: totalAmount,
      })
    );

    if (
      totalAmount !== 0 &&
      selectedDate.startDate !== null &&
      selectedDate.endDate !== null
    ) {
      history.push('/hotel/checkout');
    }
  };

  const renderSidebar = () => {
    return (
      <div className='listingSection__wrap shadow-xl'>
        <span className='font-semibold text-3xl'>
          {oneHotel?.room[selectedRooom].type}
        </span>
        <div className='flex justify-between'>
          <span className='text-2xl'>
            BDT {oneHotel?.room[selectedRooom].costPerNight}
            <span className='ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400'>
              /night
            </span>
          </span>
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
          <HotelGuestInput
            fieldClassName='p-5'
            defaultValue={guestValue}
            onChange={(data) => setGuestValue(data)}
          />
        </form>

        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>
              {oneHotel?.room[selectedRooom].costPerNight} x {night} nights
            </span>
            <span>BDT {changableAmount}</span>
          </div>

          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>VAT(15%)</span>
            <span>BDT {vat}</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>BDT {serviceCharge}</span>
          </div>
          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total</span>
            <span>BDT {totalAmount}</span>
          </div>
        </div>

        <ButtonPrimary onClick={reserveBtnClick}>Reserve</ButtonPrimary>
      </div>
    );
  };

  const renderPhotoSection = () => {
    let PHOTOS: string[] = [];

    if (oneHotel?.images) {
      PHOTOS = oneHotel?.images;
    }

    return (
      <Fragment>
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
    oneHotel ? (
      <div
        className={`nc-ListingStayDetailPage pb-20`}
        data-nc-id='ListingStayDetailPage'
      >
        {renderPhotoSection()}

        <main className='container mt-11 flex '>
          <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10'>
            {renderSection1()}
            {renderRoom()}
            {renderSection2()}
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

export default HotelDetailsPage;
