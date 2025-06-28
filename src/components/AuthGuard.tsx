
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  );
};
