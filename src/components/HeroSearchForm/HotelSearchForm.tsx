// My Component

import { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router';
import HotelGuestInput from './HotelGuestInput';
import HotelLocationInput from './HotelLocationInputForm';
import { FocusedInputShape } from 'react-dates';
import HotelDatesRangeInput from './HotelDatesRangeInput';
import moment from 'moment';

import {
  fetchHotelLocationAsync,
  fetchAllHotelAsync,
  addUserInput,
} from 'app/feature/hotel/hotelSlice';
import { useAppDispatch, useAppSelector } from 'app/hook';
import {
  HotelUserInput,
  Location,
  Guests,
} from 'app/feature/hotel/hotelInterfaces';

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const HotelSearchForm = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const { locations, hotelUserInput } = useAppSelector((state) => state.hotel);

  useEffect(() => {
    dispatch<any>(fetchHotelLocationAsync());
  }, [dispatch]);

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: hotelUserInput?.checkIn ? moment(hotelUserInput.checkIn) : null,
    endDate: hotelUserInput?.checkOut ? moment(hotelUserInput.checkOut) : null,
  });

  const [locationInputValue, setLocationInputValue] = useState<string>(
    hotelUserInput?.location.cityName || ''
  );

  const [guestValue, setGuestValue] = useState<Guests>({
    guestAdults: hotelUserInput?.guest.guestAdults || 1,
    guestChildren: hotelUserInput?.guest.guestChildren || 0,
    guestRooms: hotelUserInput?.guest.guestRooms || 1,
  });
  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  const [userInput, setUserInput] = useState<HotelUserInput>();

  const formatFormData = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    locations.forEach(
      (loc: Location) =>
        loc.cityName === locationInputValue &&
        setUserInput({
          location: loc,
          checkIn: dateRangeValue.startDate?.toISOString(),
          checkOut: dateRangeValue.endDate?.toISOString(),
          guest: guestValue,
        })
    );
  };

  useEffect(() => {
    if (
      userInput?.location &&
      userInput.checkIn &&
      userInput.checkOut &&
      userInput.guest
    ) {
      dispatch(addUserInput(userInput));
      dispatch<any>(fetchAllHotelAsync(userInput));
      history.push('/hotel');
    }
  }, [userInput]);

  return (
    <form
      onSubmit={(ev) => formatFormData(ev)}
      className='w-full relative mt-8 flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-2xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 md:divide-y-0'
    >
      {locations && (
        <HotelLocationInput
          locationInputValue={locationInputValue}
          locations={locations}
          onChange={(ev) => setLocationInputValue(ev)}
          onInputDone={() => setDateFocused('startDate')}
        />
      )}

      <HotelDatesRangeInput
        defaultValue={dateRangeValue}
        defaultFocus={dateFocused}
        onFocusChange={(focus) => setDateFocused(focus)}
        onChange={(data) => setDateRangeValue(data)}
      />

      <HotelGuestInput
        defaultValue={guestValue}
        onChange={(data) => setGuestValue(data)}
      />

      <div className=' px-4 py-4 lg:py-0'>
        <button
          className='h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none'
          type='submit'
        >
          <span className='mr-3 md:hidden'>Search</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default HotelSearchForm;
