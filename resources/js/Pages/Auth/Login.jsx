/* eslint-disable prettier/prettier */
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PasswordInput from '@/Components/PasswordInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import logBg from '../../../images/loginBg.png';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout bgImage={logBg}>
            <Head title="Log in" />

            {status && (
                <div className="text-green-600 mb-4 text-sm font-medium">
                    {status}
                </div>
            )}
            <div className="mb-8 mt-8 flex-col space-y-2">
                <h1 className='font-GSemibold text-allBlack'> Log in </h1>
                <p className='font-GRegular text-paleBlack'> Log into an account</p>
            </div>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt- 2" />
                </div>

                {/* <div className="mt-6">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div> */}

                <div className="mt-6">
                    <InputLabel htmlFor="password" value="Password" />
                    <PasswordInput
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="current-password"
                    />

                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {/* {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )} */}

                    {/* <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton> */}
                    <button className="confirmBtn" disabled={processing}>Log in</button>
                </div>
            </form>
            <div className="my-4 flex items-end justify-end justify-items-center space-x-4 text-sm text-gray-600">
                <p className='font-GRegular text-paleBlack'>Dont have an account?</p>
                <Link href={route('register')} className="underlinedLink">
                    Register
                </Link>
            </div>
        </GuestLayout>
    );
}
