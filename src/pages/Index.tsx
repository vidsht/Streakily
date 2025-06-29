
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { LandingPage } from '@/components/LandingPage';
import { StreakDashboard } from '@/components/StreakDashboard';

const Index = () => {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <StreakDashboard />
      </SignedIn>
    </>
  );
};

export default Index;
