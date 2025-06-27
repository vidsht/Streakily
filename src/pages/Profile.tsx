
import { UserProfile } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-red-900 dark:to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        
        <div className="bg-white/70 dark:bg-black/40 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-none border-0 bg-transparent"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
