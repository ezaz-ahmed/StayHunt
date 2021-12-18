import { FC, Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import Avatar from 'react-avatar';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { useAppSelector } from 'app/hook';

import UpcomingTabPanel from './UpcomingTabPanel';
import CancelledTabPanel from './CanceledTabPanel';
import CompletedTabPanel from './CompletedTabPanel';
export interface AuthorPageProps {
  className?: string;
}

const AuthorPage: FC<AuthorPageProps> = ({ className = '' }) => {
  const history = useHistory();

  const {
    userDetails: {
      avatar,
      name,
      email,
      phone,
      emailVerified,
      phoneVerified,
      createdAt,
    },
  } = useAppSelector((state) => state.user);

  let [categories] = useState(['Upcoming', 'Completed', 'Cancelled']);

  const renderSidebar = () => {
    return (
      <div className=' w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8'>
        <Avatar
          name={name}
          src={avatar}
          round={true}
          size='140'
          color='#0260d7'
        />
        {/* ---- */}
        <div className='space-y-3 text-center flex flex-col items-center'>
          <h2 className='text-3xl font-semibold'>{name}</h2>

          <span
            className='hover:underline cursor-pointer'
            onClick={() => history.push('/edit/profile')}
          >
            Edit Profile
          </span>
        </div>

        {/* ---- */}
        <div className='border-b border-neutral-200 dark:border-neutral-700 w-14'></div>

        {/* ---- */}
        <div className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-neutral-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
              />
            </svg>
            <span className='text-neutral-6000 dark:text-neutral-300'>
              {email}{' '}
              <span className='ml-4 cursor-pointer'>
                {emailVerified ? (
                  <i className='las la-check-circle' />
                ) : (
                  <i className='las la-exclamation-triangle' />
                )}
              </span>
            </span>
          </div>
          <div className='flex items-center space-x-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-neutral-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
              />
            </svg>
            <span className='text-neutral-6000 dark:text-neutral-300'>
              {phone}{' '}
              <span className='ml-4 cursor-pointer'>
                {phoneVerified ? (
                  <i className='las la-check-circle' />
                ) : (
                  <i className='las la-exclamation-triangle' />
                )}
              </span>
            </span>
          </div>

          <div className='flex items-center space-x-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6 text-neutral-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
            <span className='text-neutral-6000 dark:text-neutral-300'>
              Joined in {moment(createdAt).format('MMMM D, YYYY')}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection1 = () => {
    return (
      <div className='listingSection__wrap'>
        <div>
          <h2 className='text-2xl font-semibold'>{name}'s Bookings</h2>
        </div>
        <div className='w-14 border-b border-neutral-200 dark:border-neutral-700'></div>

        <div>
          <Tab.Group>
            <Tab.List className='flex space-x-1 overflow-x-auto'>
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? 'bg-secondary-900 text-secondary-50 '
                          : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <UpcomingTabPanel />
              <CompletedTabPanel />
              <CancelledTabPanel />
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id='AuthorPage'>
      <Helmet>
        <title>Login | TicketsForTravel</title>
      </Helmet>
      <main className='container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row'>
        <div className='block flex-grow mb-24 lg:mb-0'>
          <div className='lg:sticky lg:top-24'>{renderSidebar()}</div>
        </div>
        <div className='w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0'>
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
