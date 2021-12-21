import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { useAppDispatch } from 'app/hook';
import { fetchIdentity } from 'app/feature/user/userApi';
import { addUserIdForVerification } from 'app/feature/user/userSlices';
import Input from 'shared/Input/Input';

export interface SearchAccountProps {
    className?: string;
}

const SearchAccount: FC<SearchAccountProps> = ({ className = '' }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();
    const dispatch = useAppDispatch();

    const [identity, setIdentity] = useState('')

    const handleSubmit = async () => {
        setLoading(true);

        const data: any = await fetchIdentity({ identity });

        setLoading(false);

        if (data.status === 'success') {
            dispatch<any>(addUserIdForVerification(data.data.userId));
            history.push('/verfication?type=forget-password');
        } else {
            setError(data);
        }
    };

    return (
        <div className={`nc-PageSignUp  ${className}`} data-nc-id='PageSignUp'>
            <Helmet>
                <title>Confirm Identity | Tickets For Travel</title>
            </Helmet>
            <div className='container my-52 space-x-10'>
                <p className='flex items-center text-xl  text-neutral-900 dark:text-neutral-100 justify-center'>
                    Enter your email address or mobile number to search for your account
                </p>

                <div className='grid place-items-center mt-5'>
                    <div className="w-96">
                        <Input
                            type='text'
                            value={identity}
                            placeholder='Email or phone number'
                            onChange={(ev) => setIdentity(ev.target.value)}
                            className='mt-1 rounded-md'
                        />
                    </div>

                    <ButtonPrimary
                        className='my-5 rounded-md'
                        onClick={handleSubmit}
                        loading={loading}
                    >
                        Search Account
                    </ButtonPrimary>

                    {error && (
                        <span className='text-red-400 dark:text-red-400'>{error}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchAccount;
