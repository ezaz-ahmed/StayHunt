import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { fetchAllBooking } from 'app/feature/booking/bookingApi';
import { useAppSelector } from 'app/hook';

const CompletedTabPanel = () => {
  const { token } = useAppSelector((state) => state.user);

  const [data, setData] = useState([]);

  const fetchCancelledBooking = async (type: any) => {
    const response: any = await fetchAllBooking(type, token);
    setData(response);
  };

  useEffect(() => {
    fetchCancelledBooking('completed');
  }, []);

  return (
    <Tab.Panel className=''>
      <div className='mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2'>
        {data.length === 0 ? <p>No Data</p> : <p>{JSON.stringify(data)}</p>}
      </div>
    </Tab.Panel>
  );
};

export default CompletedTabPanel;
