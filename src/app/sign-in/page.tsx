import Link from 'next/link';

import { CardCompact } from '@/components/card-compact';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import { passwordForgotPath, signUpPath } from '@/paths';

const SignInPage = () => {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8">
        <CardCompact
          title="Sign In"
          description="Sign in to your account"
          className="animate-fade-in-from-top w-full max-w-[420px]"
          content={<SignInForm />}
          footer={
            <>
              <Link
                className="text-muted-foreground hover:text-primary text-sm"
                href={signUpPath()}
              >
                No account yet?
              </Link>

              <Link
                className="text-muted-foreground hover:text-primary text-sm"
                href={passwordForgotPath()}
              >
                Forgot password?
              </Link>
            </>
          }
        />
      </div>
    </>
  );
};
export default SignInPage;
