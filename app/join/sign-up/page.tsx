import JoinLayout from '@/components/layouts/JoinLayout';
import { SignForm } from '@/components/join/SignForm';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <JoinLayout>
      <div className="w-3/4">
        <h3 className="mb-5 text-4xl">Sing Up</h3>
        <div>
          <SignForm />
        </div>
        <div className="mt-2.5 text-center">
          <Link href="/join/sign-in">Back</Link>
        </div>
      </div>
    </JoinLayout>
  );
};

export default SignUpPage;
