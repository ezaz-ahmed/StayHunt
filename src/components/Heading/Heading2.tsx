import { FC } from 'react';

export interface Heading2Props {
  heading?: string;
  className?: string;
}

const Heading2: FC<Heading2Props> = ({ className = '', heading }) => {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className='text-4xl font-semibold'>{heading}</h2>
    </div>
  );
};

export default Heading2;
