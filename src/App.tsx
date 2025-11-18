import { useState } from "react";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LoginScreen } from "./components/LoginScreen";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./components/Dashboard";
import { AcademicModule } from "./components/AcademicModule";
import { CommunicationModule } from "./components/CommunicationModule";
import { ReportsModule } from "./components/ReportsModule";
import { AdminPanel } from "./components/AdminPanel";
import { UserProfile } from "./components/UserProfile";
import { StudentEvaluation } from "./components/StudentEvaluation";
import { QuestionBank } from "./components/QuestionBank";
import { SimulationsModule } from "./components/SimulationsModule";

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState("dashboard");

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "academic":
        return <AcademicModule />;
      case "evaluation":
        return <StudentEvaluation />;
      case "questionbank":
        return <QuestionBank />;
      case "simulations":
        return <SimulationsModule />;
      case "communication":
        return <CommunicationModule />;
      case "reports":
        return <ReportsModule />;
      case "admin":
        return <AdminPanel />;
      case "profile":
        return <UserProfile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <MainLayout
      currentView={currentView}
      onNavigate={setCurrentView}
    >
      {renderView()}
    </MainLayout>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}