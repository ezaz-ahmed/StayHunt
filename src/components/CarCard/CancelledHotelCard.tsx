import { useState } from 'react'
import { useAppSelector } from 'app/hook';
import moment from 'moment';
import ButtonPrimary from 'shared/Button/ButtonPrimary';

import ButtonSecondary from 'shared/Button/ButtonSecondary';
import ModalRefund from 'containers/ListingDetailPage/ModalRefund';

interface CancelledHotelCardProps {
    bookingId: string;
    bookingDate: string;
    payAmount: string;
    hotelName: string;
    hotelAddress: string;
    numOfRooms: string;
    numOfPersons: string;
    numOfNights: string;
    roomType: string;
    refundStatus?: undefined;
}

const CancelledHotelCard = ({
    bookingId,
    bookingDate,
    payAmount,
    hotelName,
    hotelAddress,
    numOfRooms,
    numOfPersons,
    numOfNights,
    roomType,
    refundStatus,
}: CancelledHotelCardProps) => {

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
        // await fetchCancelBooking(bookingId, token)
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
                <p className='px-6 text-center mt-2 font-light text-sm'>{hotelAddress}</p>

                <div className='mt-4'>Number of Room: {numOfRooms}</div>
                <div>Number of Nights: {numOfNights}</div>
                <div>Room Type: {roomType}</div>
                <div className='mb-4'>Number of Person: {numOfPersons}</div>
            </div>

            <hr className='border-neutral-200 dark:border-neutral-700' />

            <div className='flex justify-center p-2'>
                {refundStatus ?
                    <ButtonSecondary>{refundStatus}</ButtonSecondary> :
                    <ButtonPrimary onClick={openModal}>Request A Refund</ButtonPrimary>
                }

                <ModalRefund
                    isOpen={isOpen}
                    onClose={closeModal}
                    bookingId={bookingId}
                />
            </div>
        </div>
    );
};

export default CancelledHotelCard;
