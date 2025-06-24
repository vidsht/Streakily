
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="text-center space-y-8 p-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Welcome to Streakily
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Build lasting habits across all areas of your life
              </p>
            </div>
            <div className="space-y-4">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full max-w-sm">
                  Get Started
                </Button>
              </SignInButton>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track habits • Build streaks • Achieve goals
              </p>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Streakily
                  </h1>
                </div>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </SignedIn>
    </>
  );
};
