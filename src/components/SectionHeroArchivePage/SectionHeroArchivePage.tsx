import { FC } from 'react';
import HeroSearchForm, {
  SearchTab,
} from 'components/HeroSearchForm/HeroSearchForm';

export interface SectionHeroArchivePageProps {
  className?: string;
  currentPage:
    | 'Hotel'
    | 'Bus'
    | 'Launch'
    | 'Package Tour'
    | 'Rental Car'
    | 'Flight'
    | 'Train';
  currentTab: SearchTab;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = '',
  currentPage,
  currentTab,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id='SectionHeroArchivePage'
    >
      <div className='z-10 mb-0 w-full'>
        <HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
