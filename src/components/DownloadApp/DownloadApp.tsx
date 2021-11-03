import Heading from 'components/Heading/Heading';
import { FC } from 'react';
import Mockup from 'images/extra/mockup.png';
import AppStore from 'images/extra/app-store.svg';
import PlayStore from 'images/extra/play-store.svg';

export interface DoownloadAppProps {
  className?: string;
}

const DownloadApp: FC<DoownloadAppProps> = ({ className = '' }) => {
  return (
    <div
      className={`nc-SectionClientSay relative ${className} `}
      data-nc-id='SectionClientSay'
    >
      <div className='flex justify-between h-96 align-middle'>
        <div className='pt-20'>
          <Heading desc='Book Hotel, Bus, Launch'>Tickets For Travel</Heading>

          <div className='flex'>
            <a
              href='https://www.apple.com/app-store'
              className='mx-2 hover:box-shadow hover:opacity-80'
            >
              <img src={AppStore} alt='Apple-Store logo' />
            </a>

            <a
              href='https://play.google.com/store/apps/details?id=com.tickets4travel.tickets4travel'
              className='mx-2 hover:box-shadow hover:opacity-80'
            >
              <img src={PlayStore} alt='Play-Store logo' />
            </a>
          </div>
        </div>

        <div className='overflow-hidden'>
          <img src={Mockup} alt='Mockup' width={375} height={230} />
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
