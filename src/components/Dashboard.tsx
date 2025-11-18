import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { 
  BookOpen, 
  Calendar, 
  Users, 
  TrendingUp, 
  Bell,
  CheckCircle,
  XCircle,
  Star
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function Dashboard() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const stats = [
    {
      title: t('dashboard.attendance'),
      value: '94.5%',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: t('dashboard.grades'),
      value: '8.7',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('dashboard.classes'),
      value: '12',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: t('dashboard.students'),
      value: '340',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      hideForStudent: true
    }
  ];

  const recentAnnouncements = [
    {
      title: { en: 'Parent-Teacher Meeting', pt: 'Reunião de Pais e Mestres' },
      date: '2025-11-05',
      type: 'important'
    },
    {
      title: { en: 'Mid-Term Exams Schedule', pt: 'Cronograma de Provas do Meio do Período' },
      date: '2025-11-10',
      type: 'academic'
    },
    {
      title: { en: 'School Holiday Notice', pt: 'Aviso de Feriado Escolar' },
      date: '2025-11-15',
      type: 'general'
    }
  ];

  const recentActivity = [
    {
      action: { en: 'Grade posted for Mathematics', pt: 'Nota lançada para Matemática' },
      time: { en: '2 hours ago', pt: 'há 2 horas' }
    },
    {
      action: { en: 'New assignment in Portuguese', pt: 'Nova tarefa em Português' },
      time: { en: '5 hours ago', pt: 'há 5 horas' }
    },
    {
      action: { en: 'Attendance marked for today', pt: 'Frequência marcada para hoje' },
      time: { en: '1 day ago', pt: 'há 1 dia' }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl mb-2">{t('dashboard.welcome')}, {user?.name}!</h1>
        <p className="text-gray-600">{t('dashboard.overview')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          if (stat.hideForStudent && user?.role === 'student') return null;
          
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#002B5B]" />
              {t('dashboard.announcements')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnnouncements.map((announcement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p>{announcement.title[language]}</p>
                      <Badge variant={announcement.type === 'important' ? 'destructive' : 'secondary'}>
                        {announcement.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#002B5B]" />
              {t('dashboard.recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border-l-2 border-[#FFD400] pl-3">
                  <p className="text-sm">{activity.action[language]}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time[language]}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      {user?.role === 'student' && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>{t('academic.performance')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Mathematics', 'Portuguese', 'Science', 'History', 'English'].map((subject, index) => {
                const scores = [85, 92, 78, 88, 95];
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">{subject}</span>
                      <span className="text-sm">{scores[index]}/100</span>
                    </div>
                    <Progress value={scores[index]} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Behavioral Evaluation Summary (Teacher/Admin View) */}
      {(user?.role === 'teacher' || user?.role === 'administrator') && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-[#FFD400]" />
              {t('eval.performanceReport')} - {language === 'pt' ? 'Visão Geral' : 'Overview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl mb-1">😃</div>
                <p className="text-sm text-gray-600">{t('level.excellent')}</p>
                <p className="text-xl">24</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-1">🙂</div>
                <p className="text-sm text-gray-600">{t('level.good')}</p>
                <p className="text-xl">18</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl mb-1">😐</div>
                <p className="text-sm text-gray-600">{t('level.needsImprovement')}</p>
                <p className="text-xl">8</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl mb-1">😞</div>
                <p className="text-sm text-gray-600">{t('level.veryLow')}</p>
                <p className="text-xl">2</p>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Ana Costa', trend: 'improved', emoji: '😃' },
                { name: 'João Silva', trend: 'maintained', emoji: '🙂' },
                { name: 'Maria Santos', trend: 'improved', emoji: '😃' }
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#002B5B] text-white text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{student.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{student.emoji}</span>
                    <Badge variant={student.trend === 'improved' ? 'default' : 'secondary'} className="text-xs">
                      {t(`eval.${student.trend}`)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}