import JoinLayout from "@/components/layouts/JoinLayout";
import Link from "next/link";
import { RegisterForm } from "@/components/Forms/Join/RegisterForm";
import { createUserAction } from "@/utils/actions";

const SignUpPage = () => {
  return (
    <JoinLayout>
      <div className="w-3/4">
        <h3 className="mb-5 text-4xl">Sing Up</h3>
        <div>
          <RegisterForm action={createUserAction} />
        </div>
        <div className="mt-2.5 text-center">
          <Link href="/join/sign-in">Back</Link>
        </div>
      </div>
    </JoinLayout>
  );
};

export default SignUpPage;
