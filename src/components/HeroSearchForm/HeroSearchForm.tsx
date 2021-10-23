import { FC, useState } from "react";
import "react-dates/initialize";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import StaySearchForm from "./StaySearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";
import HotelSearchForm from './HotelSearchForm';

export type SearchTab =
  | 'Hotel'
  | 'Bus'
  | 'Launch'
  | 'Package Tour'
  | 'Rental Car'
  | 'Flight'
  | 'Train';

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?:
    | 'Hotel'
    | 'Bus'
    | 'Launch'
    | 'Package Tour'
    | 'Rental Car'
    | 'Flight'
    | 'Train';
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = '',
  currentTab = 'Hotel',
  currentPage,
}) => {
  const tabs: SearchTab[] = [
    'Hotel',
    'Bus',
    'Launch',
    'Package Tour',
    'Rental Car',
    'Flight',
    'Train',
  ];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
      <ul className='ml-0 md:ml-16 xl:ml-4 lg:ml-2 flex space-x-2 xl:space-x-7 lg:justify-center md:space-x-10 sm:space-x-8'>
        {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => setTabActive(tab)}
              className={`flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? ''
                  : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-100'
              } `}
              key={tab}
            >
              {active && (
                <span className='block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2' />
              )}
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    switch (tabActive) {
      case 'Hotel':
        return <HotelSearchForm />;
      case 'Bus':
        return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
      case 'Launch':
        return <RentalCarSearchForm haveDefaultValue={isArchivePage} />;
      case 'Package Tour':
        return <ExperiencesSearchForm haveDefaultValue={isArchivePage} />;
      case 'Rental Car':
        return <RentalCarSearchForm haveDefaultValue={isArchivePage} />;
      case 'Flight':
        return <StaySearchForm haveDefaultValue={isArchivePage} />;
      case 'Train':
        return <RentalCarSearchForm haveDefaultValue={isArchivePage} />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id='HeroSearchForm'
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
