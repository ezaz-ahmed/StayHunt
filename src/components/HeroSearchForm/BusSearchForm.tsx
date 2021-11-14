// My Component

import { useState, useEffect, FormEvent } from 'react';
import { useHistory } from 'react-router';
import { FocusedInputShape } from 'react-dates';
import ButtonSubmit from './ButtonSubmit';
import moment from 'moment';
import BusDatesRangeInput from './BusDatesRangeInput';
import BusCityInput from './BusCityInput';
import BusDateSingleInput from './BusDateSingleInput';

import { fetchBusCitiesAsync, addUserInput } from 'app/feature/bus/busSlice';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { City, BusUserInput } from 'app/feature/bus/busInterfaces';

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const BusSearchForm = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch<any>(fetchBusCitiesAsync());
  }, [dispatch]);

  const { cities, busUserInput } = useAppSelector((state) => state.bus);

  const [userInput, setUserInput] = useState<BusUserInput>();

  const [dateValue, setdateValue] = useState(
    busUserInput?.journeyDate ? moment(busUserInput.journeyDate) : null
  );

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: dateValue,
    endDate: null,
  });

  const [dateFocused, setDateFocused] = useState<boolean>(false);
  const [originInputValue, setOriginInputValue] = useState<string>(
    busUserInput?.fromCity.locName || ''
  );

  const [destinationInputValue, setDestinationInputValue] = useState<string>(
    busUserInput?.toCity.locName || ''
  );

  const [origin, setOrigin] = useState<City>();
  const [destination, setDestination] = useState<City>();

  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | 'dropOffInput' | null
  >(null);

  const [dropOffLocationType, setDropOffLocationType] = useState<
    'same' | 'different'
  >('same');

  const formSubmitRoundtrip = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(dateFocused, fieldFocused);
  };

  const setOriginHandler = (ev: string) => {
    cities.forEach((city: City) => city.locName === ev && setOrigin(city));
  };

  const setDestinationHandler = (ev: string) => {
    cities.forEach((city: City) => city.locName === ev && setDestination(city));
  };

  const formSubmitOneWay = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (origin && destination) {
      setUserInput({
        fromCity: origin,
        toCity: destination,
        journeyDate: dateValue?.toISOString(),
        roundTrip: false,
      });
    }
  };

  useEffect(() => {
    if (userInput?.roundTrip === false) {
      if (userInput?.fromCity && userInput?.toCity && userInput.journeyDate) {
        dispatch(addUserInput(userInput));
        history.push('/bus');
      }
    }
  }, [userInput]);

  const renderRadioBtn = () => {
    return (
      <div className=' py-5 [ nc-hero-field-padding ] flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-10 border-b border-neutral-100 dark:border-neutral-800'>
        <div className='flex  items-center'>
          <input
            id='same-drop-off'
            name='drop-off-type'
            type='radio'
            value='same'
            className='focus:ring-primary-500 h-4 w-4 text-primary-500 border-neutral-300'
            checked={dropOffLocationType === 'same'}
            onChange={(e) =>
              setDropOffLocationType(e.currentTarget.value as 'same')
            }
          />
          <label
            htmlFor='same-drop-off'
            className='ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300'
          >
            One Way
          </label>
        </div>
        <div className='flex items-center'>
          <input
            id='different-drop-off'
            name='drop-off-type'
            value='different'
            type='radio'
            className='focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300'
            checked={dropOffLocationType === 'different'}
            onChange={(e) =>
              setDropOffLocationType(e.currentTarget.value as 'different')
            }
          />
          <label
            htmlFor='different-drop-off'
            className='ml-2 sm:ml-3 block text-sm font-medium text-gray-700 dark:text-neutral-300'
          >
            Round Trip
          </label>
        </div>
      </div>
    );
  };

  const renderOneWayForm = () => {
    return (
      <form className='flex flex-col md:flex-row' onSubmit={formSubmitOneWay}>
        <BusCityInput
          onInputDone={() =>
            setFieldFocused(
              dropOffLocationType === 'different' ? 'dropOffInput' : 'startDate'
            )
          }
          originInputValue={originInputValue}
          city={cities}
          onChange={(ev) => setOriginHandler(ev)}
          placeHolder='From'
          desc='Your Origin'
        />

        <BusCityInput
          onInputDone={() =>
            setFieldFocused(
              dropOffLocationType === 'different' ? 'dropOffInput' : 'startDate'
            )
          }
          originInputValue={destinationInputValue}
          city={cities}
          onChange={(ev) => setDestinationHandler(ev)}
          placeHolder='To'
          desc='Your Destination City'
        />

        <BusDateSingleInput
          defaultValue={dateValue}
          onChange={(date) => setdateValue(date)}
          onFocusChange={(focus: boolean) => {
            setDateFocused(focus);
          }}
        />

        {/* BUTTON SUBMIT OF FORM */}
        <div className=' px-4 py-4'>
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

  const renderRoundTrip = () => {
    return (
      <form
        onSubmit={formSubmitRoundtrip}
        className='w-full relative mt-8 rounded-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900'
      >
        <div className=' flex flex-col md:flex-row md:items-center w-full rounded-full [ nc-divide-field ] '>
          <div className='relative flex flex-col nc-flex-2-auto [ nc-divide-field ] '>
            <BusCityInput
              onChange={(e) => setOriginInputValue(e)}
              city={cities}
              onInputDone={() =>
                setFieldFocused(
                  dropOffLocationType === 'different'
                    ? 'dropOffInput'
                    : 'startDate'
                )
              }
              placeHolder='From'
              desc='Your Origin'
            />

            <BusCityInput
              onChange={(e) => setDestinationInputValue(e)}
              city={cities}
              onInputDone={() =>
                setFieldFocused(
                  dropOffLocationType === 'different'
                    ? 'dropOffInput'
                    : 'startDate'
                )
              }
              placeHolder='To'
              desc='Your Destination City'
            />
          </div>

          <BusDatesRangeInput defaultDateValue={dateRangeValue} />

          <div className='px-4 py-3'>
            <ButtonSubmit />
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className='w-full'>
      <div className='w-full relative mt-8 rounded-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-900'>
        {renderRadioBtn()}
        {dropOffLocationType === 'same' && renderOneWayForm()}
        {dropOffLocationType === 'different' && renderRoundTrip()}
      </div>
    </div>
  );
};

export default BusSearchForm;
