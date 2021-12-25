import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import moment from 'moment';
import { Dialog, Transition } from '@headlessui/react'
import { fetchCancelBooking } from 'app/feature/booking/bookingApi'
import { useAppSelector } from 'app/hook';

interface UpcomingHotelCardProps {
  bookingId: string;
  bookingDate: string;
  payAmount: string;
  hotelName: string;
  hotelAddress: string;
  numOfRooms: string;
  numOfPersons: string;
  numOfNights: string;
  roomType: string;
  cancelled: boolean;
}

const UpcomingHotelCard = ({
  bookingId,
  bookingDate,
  payAmount,
  hotelName,
  hotelAddress,
  numOfRooms,
  numOfPersons,
  numOfNights,
  roomType,
  cancelled,
}: UpcomingHotelCardProps) => {

  let [isOpen, setIsOpen] = useState(false)
  const { token } = useAppSelector(state => state.user)

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const cancelBooking = async () => {
    closeModal()
    await fetchCancelBooking(bookingId, token)
  }

  return (
    <div className='w-96 mx-auto sm:border border-neutral-200 dark:border-neutral-700 shadow-xl hover:shadow rounded-xl'>
      <div className='text-center text-blue-600 my-2 text-xl font-medium'>
        Booking ID: {bookingId.substr(bookingId.length - 7)}
      </div>
      <hr className='mt-2 border-neutral-200 dark:border-neutral-700' />
      <div className='flex justify-between mx-3 my-2'>
        <div className='text-center mt-2 text-lg pl-2 font-normal'>
          {moment(bookingDate).format('DD MMMM')}
        </div>
        <div className='text-center mt-2 text-lg pr-2 font-normal'>
          BDT {payAmount}.00
        </div>
      </div>

      <div className='text-center font-semibold text-lg'>{hotelName}</div>
      <div className='text-center'>
        <p className='px-6 mt-2 font-light text-sm'>{hotelAddress}</p>

        <div className='mt-4 blcok'>Number of Room: {numOfRooms}</div>
        <div className='block'>Number of Nights: {numOfNights}</div>

        <div className='block'>Room Type: {roomType}</div>
        <div className='block'>Number of Person: {numOfPersons}</div>
      </div>

      <hr className='mt-8 border-neutral-200 dark:border-neutral-700' />

      <div className="flex items-center py-6 px-3">
        <i className="las la-exclamation-circle text-3xl mr-1" />
        <p className='text-center text-sm'>Please read our <Link to='/terms-and-policy' className='hover:underline text-blue-600'>Cancellation and refund policies</Link>  before cancelling your ticket.</p>
      </div>

      <hr className='border-neutral-200 dark:border-neutral-700' />

      {!cancelled && (
        <div className='flex justify-center p-2'>
          <ButtonPrimary onClick={openModal}>Cancel Ticket</ButtonPrimary>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={closeModal}
            >
              <div className="min-h-screen px-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-screen align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-3/12 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Are you sure, you want cancel?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You will lose all of your progress, if you cancel your ticket
                      </p>
                    </div>

                    <div className="mt-5 flex flex-row justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-4"
                        onClick={closeModal}
                      >
                        No
                      </button>

                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={cancelBooking}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>


      )}
    </div>
  );
};

export default UpcomingHotelCard;
