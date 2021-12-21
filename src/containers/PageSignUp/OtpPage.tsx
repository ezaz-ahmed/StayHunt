import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import OtpInput from 'react-otp-input';
import { useAppSelector, useAppDispatch } from 'app/hook';
import { fetchConfirmUser, fetchCheckResetOTP } from 'app/feature/user/userApi';
import { addUserDetails } from 'app/feature/user/userSlices';

export interface OtpSignInProps {
  className?: string;
}

const OtpPage: FC<OtpSignInProps> = ({ className = '' }) => {

  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);

  const type = parameters.get('type');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [otp, setOtp] = useState('');
  const { userId } = useAppSelector((state) => state.user);

  const handleSubmit = async () => {
    setLoading(true);

    if (type === 'forget-password') {
      const data: any = await fetchCheckResetOTP({ userId, otp })
      setLoading(false);

      if (data.status === 'success') {
        history.push(`/account-password?otp=${otp}`);
      } else {
        setError(data);
      }
    }

    if (type === 'signup') {
      const data: any = await fetchConfirmUser({ userId, otp });
      setLoading(false)

      if (data.status === 'success') {
        dispatch<any>(addUserDetails(data));
        history.push('/author');
      } else {
        setError(data);
      }
    }
  };

  const handleChange = (otp: any) => setOtp(otp);

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
            value={otp}
            onChange={handleChange}
            numInputs={6}
            inputStyle={{
              width: '4rem',
              height: '4rem',
              color: '#000',
            }}
            shouldAutoFocus={true}
            separator={<span className='mx-3'>-</span>}
          />

          <ButtonPrimary
            className='my-5 rounded-md'
            onClick={handleSubmit}
            loading={loading}
          >
            Verify
          </ButtonPrimary>

          {error && (
            <span className='text-red-400 dark:text-red-400'>{error}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
