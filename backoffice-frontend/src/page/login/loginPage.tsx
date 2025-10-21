import { useState } from 'react';
import fullLogo from '../../assets/icons/full-logo.svg'
import CustomInput from '../../components/input/customInput';
import { useLogin } from '../../hooks/auth/useLogin';

export interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ username: '', password: '' });
  const [formMessage, setFormMessage] = useState<string>('')

  const {mutateAsync: login} = useLogin()

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const response = await login(form);
    if(!response) return
    setFormMessage(response.message);
  };

  
  return (
    <div className='flex h-screen items-center justify-center bg-[#F1F4F9]'>
      <div className='h-fit w-[440px] rounded-2xl bg-white px-5 pt-[38px] pb-6'>
        <img
          src={fullLogo}
          alt='login-form-logo'
          className='mx-auto mb-7'
        />
        <form
          className='flex flex-col gap-6'
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className='text-body1_r text-subtext1 mb-2'
              htmlFor='username'
            >
              ID
            </label>
            <CustomInput
              value={form.username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder='Enter ID'
            />
          </div>
          <div>
            <label
              className='text-body1_r text-subtext1 mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <CustomInput
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder='Enter Password'
              type='password'
            />
          </div>
          {formMessage && <p className='text-red-700'>{formMessage}</p>}
          <button
            type='submit'
            className='text-background text-body1_sb bg-primary mx-auto mt-2 w-[109px] rounded-lg px-[22px] py-[12.5px]'
          >
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}
