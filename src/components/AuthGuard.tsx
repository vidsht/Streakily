
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  );
};
