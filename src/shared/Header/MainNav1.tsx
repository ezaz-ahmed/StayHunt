import { FC, Fragment } from 'react';
import Avatar from 'react-avatar';
import Logo from 'shared/Logo/Logo';
import Navigation from 'shared/Navigation/Navigation';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import MenuBar from 'shared/MenuBar/MenuBar';
import SwitchDarkMode from 'shared/SwitchDarkMode/SwitchDarkMode';
import { Transition, Menu } from '@headlessui/react';
import { fetchLogoutAsync } from 'app/feature/user/userSlices';
import { useAppSelector, useAppDispatch } from 'app/hook';

export interface MainNav1Props {
  isTop: boolean;
}

const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  const { isLogged, userDetails } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch<any>(fetchLogoutAsync());
  };

  return (
    <div
      className={`nc-MainNav1 relative z-10 ${
        isTop ? 'onTop ' : 'notOnTop backdrop-filter'
      }`}
    >
      <div className='container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8'>
        <div className='flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14'>
          <Logo />
          <Navigation />
        </div>
        <div className='flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1'>
          <div className='hidden items-center xl:flex space-x-1'>
            <SwitchDarkMode />
            <div className='px-1' />
            {isLogged && userDetails ? (
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button className='hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
                    <Avatar
                      name={userDetails.name}
                      round={true}
                      size='50'
                      color='#0260d7'
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='px-1 py-1 '>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-[#0260d7] text-white'
                                : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            My Bookings
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='px-1 py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-[#0260d7] text-white'
                                : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Archive
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? 'bg-[#0260d7] text-white'
                                : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Move
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='px-1 py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-red-700 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            onClick={handleLogout}
                          >
                            <i className='las la-sign-out-alt mr-5'></i>
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <ButtonPrimary href='/signup'>Sign up</ButtonPrimary>
            )}
          </div>
          <div className='flex items-center xl:hidden'>
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
