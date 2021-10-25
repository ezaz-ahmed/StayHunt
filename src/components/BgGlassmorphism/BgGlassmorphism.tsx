import { FC } from "react";

export interface BgGlassmorphismProps {
  className?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = 'absolute inset-x-0 md:top-10 min-h-0 pl-20 py-32 flex overflow-hidden z-0',
}) => {
  return (
    <div
      className={`nc-BgGlassmorphism ${className}`}
      data-nc-id='BgGlassmorphism'
    >
      <span className='block bg-[#2485f3] dark:bg-[#04abb1] pl-36 w-full h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-10'></span>
    </div>
  );
};

export default BgGlassmorphism;
