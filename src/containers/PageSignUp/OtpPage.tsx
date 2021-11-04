import { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import OtpInput from 'react-otp-input';
// import { useAppSelector } from 'app/hook';

export interface OtpSignInProps {
  className?: string;
}

const OtpPage: FC<OtpSignInProps> = ({ className = '' }) => {
  const [otpInput, setOtpInput] = useState('');
  // const { userId } = useAppSelector((state) => state.user);
  const handleSubmit = () => {
    console.log(otpInput);
  };

  const handleChange = (otp: any) => setOtpInput(otp);

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id='PageSignUp'>
      <Helmet>
        <title>Verification | Tickets For Travel</title>
      </Helmet>
      <div className='container my-52 space-x-10 lg:mb-32'>
        <h3 className='my-20 flex items-center text-3xl leading-[115%] md:text-3xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Please enter the 6-digit verification code we sent via SMS
        </h3>

        <div className='grid place-items-center pb-15'>
          <OtpInput
            value={otpInput}
            onChange={handleChange}
            numInputs={6}
            inputStyle={{
              width: '3.5rem',
              height: '3.5rem',
            }}
            shouldAutoFocus={true}
            separator={<span className='mx-3'>-</span>}
          />

          <ButtonPrimary className='my-5 rounded-md' onClick={handleSubmit}>
            Verify
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
