import { Tab } from '@headlessui/react';
import { useQuery } from 'react-query';
import { useAppSelector } from 'app/hook';

import { fetchAllBooking } from 'app/feature/booking/bookingApi';

const UpcomingTabPanel = () => {
  const { token } = useAppSelector((state) => state.user);

  const { isLoading, isError, data, error } = useQuery('Upcoming', () => () => {
    fetchAllBooking('upcoming', token);
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error}</span>;
  }

  return (
    <Tab.Panel className=''>
      <div className='mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2'>
        {JSON.stringify(data)}
      </div>
    </Tab.Panel>
  );
};

export default UpcomingTabPanel;
