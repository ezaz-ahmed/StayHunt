import { FC, useState } from 'react';
import { useHistory } from 'react-router';
import facebookSvg from 'images/Facebook.svg';
import googleSvg from 'images/Google.svg';
import { Helmet } from 'react-helmet';
import Input from 'shared/Input/Input';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { fetchSignUpAsync, addUserInput } from 'app/feature/user/userSlices';

export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: 'Continue with Facebook',
    href: '#',
    icon: facebookSvg,
  },

  {
    name: 'Continue with Google',
    href: '#',
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = '' }) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (name.length < 3) {
      setError('Name should be at least 3 character');
    } else if (phone.length < 11) {
      setError('Phone number is too short');
    } else if (password.length < 4) {
      setError('Password should be at least 4 characters long');
    } else if (password !== confirmPassword) {
      setError("Password doesn't match");
    } else {
      setError('');
      console.log(loading, { name, phone, email, password, confirmPassword });
      addUserInput({ name, phone, email, password });
      dispatch(
        fetchSignUpAsync({
          name,
          phone,
          email,
          password,
          confirmPassword,
        })
      );
      history.push('/phone-verfication');
    }
  };

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id='PageSignUp'>
      <Helmet>
        <title>Sign up | Tickets For Travel</title>
      </Helmet>
      <div className='container mb-24 lg:mb-32'>
        <h2 className='my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Signup
        </h2>
        <div className='max-w-md mx-auto space-y-2'>
          {/* FORM */}
          <form className='grid grid-cols-1 gap-4' onSubmit={handleSubmit}>
            <label className='block'>
              <span className='text-neutral-800 dark:text-neutral-200'>
                Name
              </span>
              <Input
                type='text'
                placeholder='Your name'
                className='mt-1 rounded-md'
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </label>
            <label className='block'>
              <span className='text-neutral-800 dark:text-neutral-200'>
                Email address
              </span>
              <Input
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                type='email'
                placeholder='example@example.com'
                className='mt-1 rounded-md'
              />
            </label>
            <label className='block'>
              <span className='text-neutral-800 dark:text-neutral-200'>
                Phone
              </span>
              <Input
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                type='text'
                placeholder='+8801*********'
                className='mt-1 rounded-md'
              />
            </label>
            <label className='block'>
              <span className='flex justify-between items-center text-neutral-800 dark:text-neutral-200'>
                Password
              </span>
              <Input
                type='password'
                className='mt-1 rounded-md'
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder='****'
              />
            </label>
            <label className='block'>
              <span className='flex justify-between items-center text-neutral-800 dark:text-neutral-200'>
                Confirm Password
              </span>
              <Input
                type='password'
                className='mt-1 rounded-md'
                value={confirmPassword}
                placeholder='****'
                onChange={(ev) => setConfirmPassword(ev.target.value)}
              />
            </label>
            {error && (
              <span className='flex justify-between items-center text-red-400 dark:text-red-400'>
                {error}
              </span>
            )}
            <ButtonPrimary
              type='submit'
              className='my-2 rounded-md'
              loading={loading}
            >
              Continue
            </ButtonPrimary>
          </form>

          {/* ==== */}
          <span className='block text-center text-neutral-700 dark:text-neutral-300'>
            Already have an account? {` `}
            <Link to='/login' className='hover:underline'>
              Sign in
            </Link>
          </span>

          {/* OR */}
          <div className='relative text-center'>
            <span className='relative z-10 inline-block px-4 py-1 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900'>
              OR
            </span>
            <div className='absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800'></div>
          </div>

          <div className='grid gap-3'>
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className='nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]'
              >
                <img
                  className='flex-shrink-0'
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className='flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm'>
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
