// My Component

import { useState, useEffect } from 'react';
import LocationInput from './LocationInput';
import GuestsInput from './GuestsInput';
import { FocusedInputShape } from 'react-dates';
import StayDatesRangeInput from './StayDatesRangeInput';
import ButtonSubmit from './ButtonSubmit';
import moment from 'moment';

import { fetchHotelLocationAsync } from 'app/feature/hotel/hotelSlice';
import { useAppDispatch } from 'app/hook';

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const HotelSearchForm = () => {
  const dispatch = useAppDispatch();
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [locationInputValue, setLocationInputValue] = useState('');
  const [guestValue, setGuestValue] = useState({});

  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchHotelLocationAsync());
  }, [dispatch]);

  const renderForm = () => {
    return (
      <form className='w-full relative mt-8 flex flex-col md:flex-row md:items-center rounded-3xl lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900 divide-y divide-neutral-200 md:divide-y-0'>
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
          onInputDone={() => setDateFocused('startDate')}
        />
        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onFocusChange={(focus) => setDateFocused(focus)}
          onChange={(data) => setDateRangeValue(data)}
        />
        <GuestsInput
          defaultValue={guestValue}
          onChange={(data) => setGuestValue(data)}
        />
        {/* BUTTON SUBMIT OF FORM */}
        <div className='px-4 py-4 lg:py-0'>
          <ButtonSubmit />
        </div>
      </form>
    );
  };

  return renderForm();
};

export default HotelSearchForm;
