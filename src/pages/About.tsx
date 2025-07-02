import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Target, 
  Trophy, 
  Medal, 
  Star, 
  Award, 
  Zap, 
  Timer, 
  Palette, 
  Smartphone, 
  Moon, 
  Sun,
  Github,
  Quote,
  Heart,
  BookOpen,
  Code,
  Lightbulb
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 relative overflow-hidden">
      {/* Modern background pattern */}
      <div className="fixed inset-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                 linear-gradient(45deg, rgba(147, 51, 234, 0.05) 25%, transparent 25%),
                 linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%)
               `,
               backgroundSize: '500px 500px, 400px 400px, 300px 300px, 60px 60px, 60px 60px'
             }}>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border-b border-purple-100 dark:border-purple-500/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-purple-800 rounded-full flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent font-mono">
                Streakily
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" onClick={() => window.history.back()}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-[rgb(145,50,231)] dark:text-white font-mono tracking-wider">
            About Streakily
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Inspired by Jerry Seinfeld's legendary "Don't Break the Chain" method, Streakily is designed to help you build better habits and conquer procrastination. By making consistency fun and rewarding, it turns daily habit tracking into a simple, motivating experience.
          </p>
        </div>

        {/* What It Is Section */}
        <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-purple-100 dark:border-purple-500/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[rgb(145,50,231)] dark:text-white font-mono flex items-center gap-3">
              <BookOpen className="h-8 w-8" />
              What It Is
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Streakily is an open source productivity tool that combines habit tracking, gamified achievements, and progress visualization. It supports multiple habits and streaks, allowing you to customize your approach to personal growth. Featuring beautiful calendars and achievement badges, it offers a clear view of your accomplishments over time.
            </p>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-[rgb(145,50,231)] dark:text-white font-mono text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-blue-100 dark:border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Calendar className="h-5 w-5" />
                  Visual Habit Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Mark daily accomplishments and keep your streak alive with beautiful calendar visualizations</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-green-100 dark:border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Target className="h-5 w-5" />
                  Multi-Habit Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Create multiple streaks and track different habits simultaneously</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-purple-100 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Trophy className="h-5 w-5" />
                  Achievement System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Unlock badges and celebrate milestones with our gamified achievement system</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-pink-100 dark:border-pink-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                  <Palette className="h-5 w-5" />
                  Customizable Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Personalize your experience with beautiful gradient themes and colors</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-orange-100 dark:border-orange-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                  <Smartphone className="h-5 w-5" />
                  Responsive Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Fully responsive UI that works seamlessly on mobile, tablet, and desktop</p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-yellow-100 dark:border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <div className="flex items-center gap-1">
                    <Sun className="h-4 w-4" />
                    <Moon className="h-4 w-4" />
                  </div>
                  Dark/Light Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">Built-in theme support for comfortable viewing in any lighting</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievement Badges Section */}
        <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-yellow-100 dark:border-yellow-500/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[rgb(145,50,231)] dark:text-white font-mono flex items-center gap-3">
              <Trophy className="h-8 w-8" />
              Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Unlock beautiful badges as you progress on your habit journey. Each achievement celebrates your dedication and consistency.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <Medal className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300">Milestone Badges</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-400">7, 14, 30, 50, 100+ day streaks</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-300">Goal Completion</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">Complete your target duration</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <div>
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300">Consistency Rewards</h4>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Perfect weeks and dedication</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Me Section */}
        <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-pink-100 dark:border-pink-500/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[rgb(145,50,231)] dark:text-white font-mono flex items-center gap-3">
              <Heart className="h-8 w-8" />
              About the Creator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Hi, I'm Vidushi Tiwari! 👋</h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a 4th year Computer Science student at Madhav Institute of Technology and Science, passionate about creating tools that help people build better habits and achieve their goals. Streakily combines my love for productivity and technology to offer a simple yet powerful tool for personal growth.
                </p>
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Fun Facts About Me:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                    <li>I believe in the power of small, consistent actions to create big changes</li>
                    <li>Coffee enthusiast ☕ - it fuels my coding sessions</li>
                    <li>Love experimenting with new UI/UX design patterns</li>
                    <li>Open source advocate - sharing knowledge makes us all better</li>
                    <li>Always looking for ways to gamify everyday activities</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Badge variant="outline" className="text-center justify-center">
                  <Code className="h-4 w-4 mr-1" />
                  Student Developer
                </Badge>
                <Badge variant="outline" className="text-center justify-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  MITS 2026
                </Badge>
                <Badge variant="outline" className="text-center justify-center">
                  <Target className="h-4 w-4 mr-1" />
                  Habit Builder
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* The Seinfeld Strategy */}
        <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-red-100 dark:border-red-500/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-[rgb(145,50,231)] dark:text-white font-mono flex items-center gap-3">
              <Quote className="h-8 w-8" />
              The Seinfeld Strategy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The story behind this method comes from Brad Isaac, a young comedian who met Jerry Seinfeld backstage and asked for advice. Seinfeld told him that to be a better comic, he needed to create better jokes - and the way to create better jokes was to write every day.
            </p>
            <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-800 dark:text-gray-200 italic leading-relaxed">
                "He told me to get a big wall calendar that has a whole year on one page and hang it on a prominent wall. The next step was to get a big red magic marker. He said for each day that I do my task of writing, I get to put a big red X over that day. After a few days you'll have a chain. Just keep at it and the chain will grow longer every day. You'll like seeing that chain, especially when you get a few weeks under your belt. Your only job is to not break the chain."
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">Why It Works</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The Seinfeld Strategy works because it shifts focus from individual performances to the process itself. Instead of worrying about how inspired you are or how brilliant your work is that day, you simply focus on showing up and not breaking the chain.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-semibold text-gray-800 dark:text-gray-200">Key Principles:</h5>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Choose a meaningful but sustainable daily task</li>
                    <li>Focus on the process, not the results</li>
                    <li>Build the chain one day at a time</li>
                    <li>Never break the chain</li>
                  </ul>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Zap className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>        {/* Footer */}
        <div className="text-center space-y-6 py-8">
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.open('https://github.com/vidsht/Streakily', '_blank')}
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Built with ❤️ by Vidushi Tiwari • Open Source
          </p>
        </div>
      </main>
    </div>
  );
};
