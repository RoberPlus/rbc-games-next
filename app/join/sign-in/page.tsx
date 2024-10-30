import { LoginForm } from '@/components/join/Form/LoginForm';
import JoinLayout from '@/components/layouts/JoinLayout';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <JoinLayout>
      <div className="w-3/4">
        <h3 className="mb-5 text-4xl">Sing In</h3>
        <div>
          <LoginForm />
        </div>
        <div className="mt-2.5 text-center">
          <Link href="/join/sign-up">Dont have an account?</Link>
        </div>
      </div>
    </JoinLayout>
  );
};

export default SignInPage;
