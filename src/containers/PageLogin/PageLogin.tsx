import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import facebookSvg from 'images/Facebook.svg';
import googleSvg from 'images/Google.svg';
import { Helmet } from 'react-helmet';
import Input from 'shared/Input/Input';
import { Link } from 'react-router-dom';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { useAppDispatch } from 'app/hook';
import { fetchLogin } from 'app/feature/user/userApi';
import { addUserDetails } from 'app/feature/user/userSlices';

export interface PageLoginProps {
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

const PageLogin: FC<PageLoginProps> = ({ className = '' }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (identity.length < 3) {
      setError('Email or number invalid');
    } else if (password.length < 4) {
      setError('Password is invalid!');
    } else {
      setError('');
      setLoading(true);
      const data: any = await fetchLogin({ identity, password });
      setLoading(false);
      if (data.status === 'success') {
        dispatch<any>(addUserDetails(data));
        history.push('/author');
      } else {
        setError(data);
      }
    }
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id='PageLogin'>
      <Helmet>
        <title>Login | Tickets For Travel</title>
      </Helmet>
      <div className='container mb-24 lg:mb-32'>
        <h2 className='my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center'>
          Login
        </h2>
        <div className='max-w-md mx-auto space-y-6'>
          {/* FORM */}
          <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit}>
            <label className='block'>
              <span className='text-neutral-800 dark:text-neutral-200'>
                Email or Number
              </span>
              <Input
                type='text'
                value={identity}
                onChange={(ev) => setIdentity(ev.target.value)}
                className='mt-1 rounded-md'
              />
            </label>
            <label className='block'>
              <span className='flex justify-between items-center text-neutral-800 dark:text-neutral-200'>
                Password
                <Link to='/seach-account' className='text-sm hover:underline'>
                  Forgot password?
                </Link>
              </span>
              <Input
                type='password'
                className='mt-1 rounded-md'
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </label>

            <ButtonPrimary
              type='submit'
              className='my-2 rounded-md'
              loading={loading}
            >
              Login
            </ButtonPrimary>

            {error && (
              <span className='flex align-middle justify-center text-red-400 dark:text-red-400'>
                {error}
              </span>
            )}
          </form>

          {/* ==== */}
          <span className='block text-center text-neutral-700 dark:text-neutral-300'>
            New user? {` `}
            <Link to='/signup' className='hover:underline'>
              Create an account
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

export default PageLogin;
