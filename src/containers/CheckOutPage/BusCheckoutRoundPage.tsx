import { FC, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PencilAltIcon } from '@heroicons/react/outline';
import Input from 'shared/Input/Input';
import Label from 'components/Label/Label';
import Textarea from 'shared/Textarea/Textarea';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import NcModal from 'shared/NcModal/NcModal';
import { useAppSelector } from 'app/hook';
import { fetchPaymentBus } from 'app/feature/bus/busApi';
import SomethingWrong from 'containers/Page404/SomethingWrong';
import TwoWayIcon from 'images/extra/two-way.svg';

export interface BusCheckOutPageProps {
  className?: string;
}

const BusCheckOutRound: FC<BusCheckOutPageProps> = ({ className = '' }) => {
  const { inputFirstBus, inputSecendBus } = useAppSelector(
    (state) => state.bus
  );
  const { userDetails } = useAppSelector((state) => state.user);
  const [name, setName] = useState(userDetails.name || '');
  const [email, setEmail] = useState(userDetails.email || '');
  const [phone, setPhone] = useState(userDetails.phone) || '';
  const [message, setMessage] = useState('');
  const [check, setCheck] = useState(true);
  const { token } = useAppSelector((state) => state.user);



  const serviceCharge = 50;
  const totalTicketsPrice = inputFirstBus.amount + inputSecendBus.amount;
  const vat = Math.ceil(totalTicketsPrice * 0.15);
  const totalAmountToPay = totalTicketsPrice + serviceCharge + vat;



  const handlePaymentSubmit = () => {
    const dataForBody = {
      journey: {
        bus: inputFirstBus.bus,
        busName: inputFirstBus.busName,
        startingPoint: inputFirstBus.startingPoint.locId,
        endingPoint: inputFirstBus.endingPoint.locId,
        cusName: name,
        cusEmail: email,
        cusPhone: phone,
        amount: inputFirstBus.amount,
        depDate: inputFirstBus.depDate,
        depTime: inputFirstBus.depTime,
        arrTime: inputFirstBus.arrTime,
        seats: inputFirstBus.seats,
        boardingPoint: inputFirstBus.boardingPoint,
        droppingPoint: inputFirstBus.boardingPoint,
        specialNote: 'Thanks Bhai',
      },
      returnJourney: {
        bus: inputSecendBus.bus,
        busName: inputSecendBus.busName,
        startingPoint: inputSecendBus.startingPoint.locId,
        endingPoint: inputSecendBus.endingPoint.locId,
        cusName: name,
        cusEmail: email,
        cusPhone: phone,
        amount: inputSecendBus.amount,
        depDate: inputSecendBus.depDate,
        depTime: inputSecendBus.depTime,
        arrTime: inputSecendBus.arrTime,
        seats: inputSecendBus.seats,
        boardingPoint: inputSecendBus.boardingPoint,
        droppingPoint: inputSecendBus.boardingPoint,
        specialNote: 'Thanks Bhai',
      },
      returnStatus: true,
      medium: 'web',
      totalAmount: totalAmountToPay,
    };

    getData(dataForBody);
  };

  const getData = async (body: any) => {
    const busSSL: any = await fetchPaymentBus(body, token);

    if (busSSL.status === 'success') window.location.replace(busSSL.data);
    else if (busSSL.status === 'error') {
      console.log(busSSL.message);
    }
  };

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
          <div className='ml-4 space-y-14 text-sm'>
            <div className='flex flex-col space-y-2'>
              {inputFirstBus && (
                <Fragment>
                  <span className='text-lg font-semibold'>
                    {inputFirstBus.startingPoint.locName} to{' '}
                    {inputFirstBus.endingPoint.locName}
                  </span>
                  <span className=' text-neutral-500 dark:text-neutral-400'>
                    {moment(inputFirstBus?.depDate).format('MMMM d, YYYY')}
                  </span>
                  <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
                    <span className='font-semibold'>
                      {inputFirstBus.busName}
                    </span>
                    <span className='font-semibold'>
                      {inputFirstBus.fare}/seats
                    </span>
                  </div>
                  <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
                    <span>Selected Seats</span>
                    <span>{inputFirstBus.seats.join(', ')}</span>
                  </div>
                  <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
                    <span>Price</span>
                    <span>{inputFirstBus.amount}</span>
                  </div>
                </Fragment>
              )}
            </div>

            <div className='border-b border-neutral-200 dark:border-neutral-700'></div>

            <div className='flex flex-col space-y-2'>
              {inputSecendBus && (
                <Fragment>
                  <span className='text-lg font-semibold'>
                    {inputSecendBus.startingPoint.locName} to{' '}
                    {inputSecendBus.endingPoint.locName}
                  </span>
                  <span className=' text-neutral-500 dark:text-neutral-400'>
                    {moment(inputSecendBus?.depDate).format('MMMM d, YYYY')}
                  </span>
                  <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
                    <span className='font-semibold'>
                      {inputSecendBus.busName}
                    </span>
                    <span className='font-semibold'>
                      {inputSecendBus.fare}/seats
                    </span>
                  </div>
                  <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
                    <span>Selected Seats</span>
                    <span>{inputSecendBus.seats.join(', ')}</span>
                  </div>
                  <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
                    <span>Price</span>
                    <span>{inputSecendBus.amount}</span>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSidebarPrice = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8'>
        <div className='flex flex-col space-y-4'>
          <h3 className='text-2xl font-semibold'>Price details</h3>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Ticket Price</span>
            <span>BDT {totalTicketsPrice}</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>VAT(15%)</span>
            <span>BDT {vat}</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>BDT {serviceCharge}</span>
          </div>

          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Discount</span>
            <span>BDT 0.00</span>
          </div>

          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>

          <div className='flex justify-between font-semibold'>
            <span>Total Amouth</span>
            <span>BDT {totalAmountToPay}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8'>
        <h2 className='text-3xl lg:text-4xl font-semibold'>
          Confirm and payment
        </h2>
        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
        <div>
          <div>
            <span className='flex align-middle text-4xl font-semibold'>
              {inputFirstBus.startingPoint.locName}{' '}
              <img
                src={TwoWayIcon}
                alt='Two Way Icon'
                className='w-11 h-auto mx-4'
              />
              {inputFirstBus.endingPoint.locName}
            </span>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className='block lg:hidden underline  mt-1 cursor-pointer'
                >
                  View bus details
                </span>
              )}
              renderContent={renderSidebarDetail}
            />

            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className='block lg:hidden underline  mt-1 cursor-pointer'
                >
                  View price details
                </span>
              )}
              renderContent={renderSidebarPrice}
            />
          </div>

          <div className='mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700'>
            <div className='flex-1 p-5 flex justify-between space-x-5'>
              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Date</span>
                <span className='mt-1.5 text-lg font-semibold'>
                  {moment(inputFirstBus.depDate).format('DD, MMM')}
                </span>
              </div>
              <PencilAltIcon className='w-6 h-6 text-neutral-300 dark:text-neutral-6000' />
            </div>
            <div className='flex-1 p-5 flex justify-between space-x-5'>
              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Guests</span>
                <span className='mt-1.5 text-lg font-semibold'>
                  {moment(inputSecendBus.depDate).format('DD, MMM')}
                </span>
              </div>
              <PencilAltIcon className='w-6 h-6 text-neutral-300 dark:text-neutral-6000' />
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-2xl font-semibold'>User Details</h3>
          <div className='mt-6'>
            <div className='w-14 border-b border-neutral-200 my-5'></div>

            <div className='space-y-2'>
              <Label>Name</Label>
              <Input
                placeholder='Your Name'
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label>Email </Label>
              <Input
                type='email'
                placeholder='example@gmail.com'
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label>Phone Number </Label>
              <Input
                placeholder='01*********'
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <Label>Special Note </Label>
              <Textarea
                placeholder='...'
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
              />
            </div>
            <div className='space-y-2'>
              <input
                type='checkbox'
                className='form-checkbox'
                checked={check}
                onChange={() => setCheck(!check)}
              />
              <span className='ml-2'>
                I've read{' '}
                <Link to='/terms-and-conditions'>
                  <span className='underline'>terms & conditions</span>
                </Link>
              </span>
            </div>
            <div className='pt-4'>
              <ButtonPrimary onClick={handlePaymentSubmit}>
                Pay with SSLCommerz
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return inputFirstBus && inputSecendBus ? (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id='CheckOutPage'>
      <main className='container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-3/5 xl:w-2/3 lg:pr-10 lg:space-y-10'>
          {renderMain()}
        </div>

        <div className='hidden lg:block flex-grow'>
          {renderSidebarDetail()}
          <div className='mt-10 sticky top-24'>{renderSidebarPrice()}</div>
        </div>
      </main>
    </div>
  ) : (
    <SomethingWrong />
  );
};

export default BusCheckOutRound;
