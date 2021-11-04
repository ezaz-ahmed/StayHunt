import { FC } from 'react';
import { Helmet } from 'react-helmet';
import ButtonPrimary from 'shared/Button/ButtonPrimary';

export interface OtpSignInProps {
  className?: string;
}

const OtpPage: FC<OtpSignInProps> = ({ className = '' }) => {
  const handleSubmit = () => {};

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id='PageSignUp'>
      <Helmet>
        <title>Verification | Tickets For Travel</title>
      </Helmet>
      <div className='container mb-24 space-x-10 lg:mb-32'>
        <h2 className='my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Please enter the 6-digit verification code we sent via SMS
        </h2>
        <div className='max-w-md mx-auto space-y-2'>
          {/* FORM */}
          <form className='grid grid-cols-1 gap-4' onSubmit={handleSubmit}>
            <ButtonPrimary type='submit' className='my-2 rounded-md'>
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
