
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <>
      <SignedOut>
        {/* Redirect to introduction page */}
        {navigate('/intro')}
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  );
};
