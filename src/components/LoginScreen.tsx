import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { LanguageToggle } from "./LanguageToggle";
import { GraduationCap, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

export function LoginScreen() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (!success) {
      setError(t('login.forgot'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #002B5B 0%, #004080 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageToggle />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 shadow-2xl z-10 border-0">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex justify-center">
            <div className="bg-[#002B5B] p-4 rounded-full">
              <GraduationCap className="h-12 w-12 text-[#FFD400]" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">{t('login.welcome')}</CardTitle>
            <CardDescription className="mt-2">
              {t('login.subtitle')}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Invalid credentials. Try: admin@avaliaplus.ma.gov.br / admin123
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.user')}</Label>
              <Input
                id="email"
                type="text"
                placeholder="exemplo@avaliaplus.ma.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#002B5B] hover:bg-[#003D7A] text-white"
            >
              {t('login.button')}
            </Button>

            <Button 
              type="button" 
              variant="link" 
              className="w-full text-[#002B5B]"
            >
              {t('login.forgot')}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs space-y-1">
            <p className="font-semibold text-gray-700">Demo Accounts:</p>
            <p>Admin: admin@avaliaplus.ma.gov.br / admin123</p>
            <p>Teacher: teacher@avaliaplus.ma.gov.br / teacher123</p>
            <p>Student: student@avaliaplus.ma.gov.br / student123</p>
            <p>Parent: parent@avaliaplus.ma.gov.br / parent123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}