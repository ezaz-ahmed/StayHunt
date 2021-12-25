import moment from 'moment';

interface CompletedHotelCardProps {
    bookingId: string;
    bookingDate: string;
    payAmount: string;
    hotelName: string;
    hotelAddress: string;
    numOfRooms: string;
    numOfPersons: string;
    numOfNights: string;
    roomType: string;
}

const CompletedHotelCard = ({
    bookingId,
    bookingDate,
    payAmount,
    hotelName,
    hotelAddress,
    numOfRooms,
    numOfPersons,
    numOfNights,
    roomType,
}: CompletedHotelCardProps) => {
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
        </div>
    );
};

export default CompletedHotelCard;
