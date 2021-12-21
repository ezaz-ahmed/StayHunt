import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Label from "components/Label/Label";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import { fetchResetPassword } from 'app/feature/user/userApi';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { addUserDetails } from 'app/feature/user/userSlices';

const AccountPass = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const history = useHistory();
  const { userId } = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()

  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);

  const otp = parameters.get('otp');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true)
    if (password !== passwordConfirm) {
      setError("Password Doesn't match")
      setLoading(false)
    }

    const data: any = await fetchResetPassword({ userId, otp, password, passwordConfirm })
    setLoading(false)

    if (data.status === 'success') {
      dispatch<any>(addUserDetails(data));
      history.push('/author');
    } else {
      setError(data);
    }
  }

  return (
    <div>
      <CommonLayout>
        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
          {/* HEADING */}
          <h2 className="text-3xl font-semibold">Update your password</h2>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className=" max-w-xl space-y-6">

            {!otp && <div>
              <Label>Current password</Label>
              <Input type="password" className="mt-1.5" />
            </div>}

            <div>
              <Label>New password</Label>
              <Input type="password" className="mt-1.5" value={password} onChange={(ev) => setPassword(ev.target.value)} />
            </div>
            <div>
              <Label>Confirm password</Label>
              <Input type="password" className="mt-1.5" value={passwordConfirm} onChange={(ev) => setPasswordConfirm(ev.target.value)} />
            </div>
            <div className="pt-2">
              <ButtonPrimary loading={loading} >Update password</ButtonPrimary>
            </div>

            <div className="pt-2">
              {error && (
                <span className='text-red-400 dark:text-red-400'>{error}</span>
              )}


            </div>
          </div>
        </form>
      </CommonLayout>
    </div>
  );
};

export default AccountPass;
