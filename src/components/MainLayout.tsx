import { useState } from 'react';
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  FileText, 
  Settings, 
  User, 
  LogOut,
  Menu,
  X,
  GraduationCap,
  HelpCircle,
  ClipboardCheck
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function MainLayout({ children, currentView, onNavigate }: MainLayoutProps) {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard, roles: ['administrator', 'teacher', 'student', 'parent', 'secretary'] },
    { id: 'academic', label: t('nav.academic'), icon: BookOpen, roles: ['administrator', 'teacher', 'student', 'parent'] },
    { id: 'evaluation', label: t('eval.title'), icon: User, roles: ['administrator', 'teacher'] },
    { id: 'questionbank', label: t('qbank.title'), icon: HelpCircle, roles: ['administrator', 'teacher'] },
    { id: 'simulations', label: t('sim.title'), icon: ClipboardCheck, roles: ['administrator', 'teacher', 'student'] },
    { id: 'communication', label: t('nav.communication'), icon: MessageSquare, roles: ['administrator', 'teacher', 'student', 'parent', 'secretary'] },
    { id: 'reports', label: t('nav.reports'), icon: FileText, roles: ['administrator', 'teacher', 'secretary'] },
    { id: 'admin', label: t('nav.admin'), icon: Settings, roles: ['administrator', 'secretary'] }
  ];

  const visibleMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-[#002B5B] text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-white hover:bg-white/10"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-[#FFD400]" />
                <div>
                  <h1 className="text-xl">AVALIA+</h1>
                  <p className="text-xs text-gray-300 hidden sm:block">Maranhão</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-[#FFD400] text-[#002B5B]">
                    {user?.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r shadow-lg z-40
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64
        `}>
          <nav className="p-4 space-y-2">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-2 ${
                    currentView === item.id 
                      ? 'bg-[#002B5B] text-white hover:bg-[#003D7A]' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
            
            <div className="pt-4 mt-4 border-t space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-gray-100"
                onClick={() => {
                  onNavigate('profile');
                  setSidebarOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                {t('nav.profile')}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                {t('nav.logout')}
              </Button>
            </div>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}