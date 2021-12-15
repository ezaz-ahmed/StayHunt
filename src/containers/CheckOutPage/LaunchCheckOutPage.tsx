import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PencilAltIcon } from '@heroicons/react/outline';
import Input from 'shared/Input/Input';
import Label from 'components/Label/Label';
import Textarea from 'shared/Textarea/Textarea';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import NcImage from 'shared/NcImage/NcImage';
import NcModal from 'shared/NcModal/NcModal';
import { useAppSelector } from 'app/hook';
import { fetchPaymentLaunch } from 'app/feature/launch/launchAPI';
import SomethingWrong from 'containers/Page404/SomethingWrong';

export interface LaunchCheckOutPageProps {
  className?: string;
}

const LaunchCheckOut: FC<LaunchCheckOutPageProps> = ({ className = '' }) => {
  const { launchFinalInput, oneLaunch } = useAppSelector(
    (state) => state.launch
  );
  const { userDetails } = useAppSelector((state) => state.user);
  const [btnDisalbe, setBtnDisalbe] = useState(true);
  const [name, setName] = useState(userDetails.name || '');
  const [email, setEmail] = useState(userDetails.email || '');
  const [phone, setPhone] = useState(userDetails.phone) || '';
  const [message, setMessage] = useState('');
  const [check, setCheck] = useState(true);
  const { token } = useAppSelector((state) => state.user);

  const validEmail = () => {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (check && name.length >= 3 && validEmail() && phone.length === 11) {
      setBtnDisalbe(false);
    } else {
      setBtnDisalbe(true);
    }
  }, [name, validEmail, phone, check]);

  const handlePaymentSubmit = () => {
    const dataForBody = {
      journey: {
        launch: launchFinalInput.launch,
        cabin: launchFinalInput.cabin,
        numOfCabins: launchFinalInput.numOfCabins,
        amount: launchFinalInput.totalAmount,
        adults: launchFinalInput.adults,
        children: launchFinalInput.children,
        startingPoint: launchFinalInput.startingPoint.locId,
        endingPoint: launchFinalInput.endingPoint.locId,
        cusName: name,
        cusEmail: email,
        cusPhone: phone,
        depDate: launchFinalInput.depDate,
        depTime: launchFinalInput.depTime,
        arrTime: launchFinalInput.arrTime,
        boardingPoint: launchFinalInput.boardingPoint,
        droppingPoint: launchFinalInput.droppingPoint,
      },
      returnStatus: false,
      medium: 'web',
      totalAmount: launchFinalInput.totalAmount,
    };

    getData(dataForBody);
  };

  const getData = async (body: any) => {
    const hotelSSL: any = await fetchPaymentLaunch(body, token);

    if (hotelSSL.status === 'success') window.location.replace(hotelSSL.data);
    else if (hotelSSL.status === 'error') {
      console.log(hotelSSL.message);
    }
  };

  const renderSidebar = () => {
    return (
      <div className='w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8'>
        <span className='text-2xl text-center'>{oneLaunch?.name}</span>
        <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
        <div className='flex flex-col sm:flex-row sm:items-center'>
          <div className='flex-shrink-0 w-full sm:w-40'>
            <div className=' aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden'>
              <NcImage src={oneLaunch.images[0]} />
            </div>
          </div>
          <div className='py-5 sm:px-5 space-y-3'>
            <div>
              <span className='text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1'>
                <i className='las la-map-marker-alt'></i>
                <span className='ml-1'>{oneLaunch?.companyName}</span>
              </span>
            </div>

            <div className='w-10 border-b border-neutral-200  dark:border-neutral-700'></div>
          </div>
        </div>
        <div className='flex flex-col space-y-4'>
          <h3 className='text-2xl font-semibold'>Price detail</h3>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>total cabin price</span>
            <span>BDT {launchFinalInput.amount}</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>VAT(15%)</span>
            <span>BDT {launchFinalInput.vat}</span>
          </div>
          <div className='flex justify-between text-neutral-6000 dark:text-neutral-300'>
            <span>Service charge</span>
            <span>BDT {launchFinalInput.serviceCharge}</span>
          </div>

          <div className='border-b border-neutral-200 dark:border-neutral-700'></div>
          <div className='flex justify-between font-semibold'>
            <span>Total Amount</span>
            <span>BDT {launchFinalInput.totalAmount}</span>
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
            <h3 className='text-2xl font-semibold'>
              {launchFinalInput.startingPoint.locName} to{' '}
              {launchFinalInput.endingPoint.locName}
            </h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className='block lg:hidden underline  mt-1 cursor-pointer'
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
            />
          </div>
          <div className='mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700'>
            <div className='flex-1 p-5 flex justify-between space-x-5'>
              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Date</span>
                <span className='mt-1.5 text-lg font-semibold'>
                  {moment(launchFinalInput.depTime).utc().format('DD, MMM')} -{' '}
                  {moment(launchFinalInput.arrTime)
                    .utc()
                    .format('DD, MMM, YYYY')}
                </span>
              </div>
              <PencilAltIcon className='w-6 h-6 text-neutral-300 dark:text-neutral-6000' />
            </div>
            <div className='flex-1 p-5 flex justify-between space-x-5'>
              <div className='flex flex-col'>
                <span className='text-sm text-neutral-400'>Guests</span>
                <span className='mt-1.5 text-lg font-semibold'>
                  {launchFinalInput.adults + launchFinalInput.children} Persons
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
                <Link to='/terms-and-condition'>
                  <span className='underline'>terms & condition</span>
                </Link>
              </span>
            </div>
            <div className='pt-4'>
              {btnDisalbe ? (
                <ButtonPrimary className='cursor-not-allowed opacity-50'>
                  Pay with SSLCommerz
                </ButtonPrimary>
              ) : (
                <ButtonPrimary onClick={handlePaymentSubmit}>
                  Pay with SSLCommerz
                </ButtonPrimary>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return launchFinalInput ? (
    <div className={`nc-CheckOutPage ${className}`} data-nc-id='CheckOutPage'>
      <main className='container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-3/5 xl:w-2/3 lg:pr-10 '>{renderMain()}</div>
        <div className='hidden lg:block flex-grow'>{renderSidebar()}</div>
      </main>
    </div>
  ) : (
    <SomethingWrong />
  );
};

export default LaunchCheckOut;
