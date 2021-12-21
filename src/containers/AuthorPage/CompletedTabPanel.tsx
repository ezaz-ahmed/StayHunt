import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { fetchAllBooking } from 'app/feature/booking/bookingApi';
import { useAppSelector } from 'app/hook';

const CompletedTabPanel = () => {
  const { token } = useAppSelector((state) => state.user);

  const [data, setData] = useState([]);

  const fetchCompletedBooking = async (type: any) => {
    const response: any = await fetchAllBooking(type, token);
    setData(response);
  };

  useEffect(() => {
    fetchCompletedBooking('completed');
  }, []);

  return (
    <Tab.Panel className=''>
      <div className='mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2'>
        {data.length === 0 ? <p>No Data</p> : data.map(
          (card: any) => (
            <div className='broder'>
              {/* {card.variant === 'hotel' ?
                  <UpcomingHotelCard
                    key={card._id}
                    bookingId={card._id}
                    bookingDate={card.bookingDate}
                    payAmount={card.payAmount}
                    hotelName={card.hotelName}
                    hotelAddress={card.hotelAddress}
                    numOfRooms={card.numOfRooms}
                    numOfPersons={card.numOfPersons}
                    numOfNights={card.numOfNights}
                    roomType={card.roomType}
                    cancelled={card.cancelled}
                  />
                  : <span>
                    {JSON.stringify(card)}
                  </span>
                } */}

              {JSON.stringify(card)}
            </div>
          )
        )}
      </div>
    </Tab.Panel>
  );
};

export default CompletedTabPanel;
