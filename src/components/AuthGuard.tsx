
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
        {/* This will trigger navigation but we need to do it in useEffect */}
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  );
};
