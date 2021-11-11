import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router';
import { FocusedInputShape } from 'react-dates';
import ButtonSubmit from './ButtonSubmit';
import moment from 'moment';
import BusDatesRangeInput from './BusDatesRangeInput';
import BusOriginInput from './BusOriginInput';
import BusDestinationInput from './BusDestinationInput';
import BusDateSingleInput from './BusDateSingleInput';

export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

const BusSearchForm = () => {
  const [dateValue, setdateValue] = useState<moment.Moment | null>(null);

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: dateValue,
    endDate: null,
  });

  const [dateFocused, setDateFocused] = useState<boolean>(false);
  const [pickUpInputValue, setPickUpInputValue] = useState('');

  // const [locationInputValue, setLocationInputValue] = useState<string>(
  //   hotelUserInput?.location.cityName || ''
  // );

  const [fromInputValue, setFromInputValue] = useState<string>();

  const [fieldFocused, setFieldFocused] = useState<
    FocusedInputShape | 'dropOffInput' | null
  >(null);

  const [dropOffLocationType, setDropOffLocationType] = useState<
    'same' | 'different'
  >('same');

  const formSubmitRoundtrip = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log(dateFocused, pickUpInputValue, fieldFocused);
  };

  const formSubmitOneWay = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    console.log(dateFocused, pickUpInputValue, fieldFocused);
  };

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
        <BusOriginInput
          onChange={(e) => setPickUpInputValue(e)}
          onInputDone={() =>
            setFieldFocused(
              dropOffLocationType === 'different' ? 'dropOffInput' : 'startDate'
            )
          }
          placeHolder='From'
          desc='Your Origin'
        />

        <BusDestinationInput
          onChange={(e) => setPickUpInputValue(e)}
          onInputDone={() =>
            setFieldFocused(
              dropOffLocationType === 'different' ? 'dropOffInput' : 'startDate'
            )
          }
          placeHolder='To'
          desc='Your Destination City'
        />

        <BusDateSingleInput
          defaultValue={dateValue}
          onFocusChange={(focus: boolean) => {
            setDateFocused(focus);
          }}
        />

        {/* BUTTON SUBMIT OF FORM */}
        <div className='px-4 py-4'>
          <ButtonSubmit />
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
            <BusOriginInput
              onChange={(e) => setPickUpInputValue(e)}
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

            <BusDestinationInput
              onChange={(e) => setPickUpInputValue(e)}
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
