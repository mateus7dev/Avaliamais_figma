import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { User, Mail, Shield, Globe } from "lucide-react";

export function UserProfile() {
  const { t, language, toggleLanguage } = useLanguage();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t('profile.title')}</h1>
        <p className="text-gray-600">{t('profile.personalInfo')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-[#002B5B] text-white text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl mb-1">{user.name}</h3>
                <Badge variant="secondary">{t(`role.${user.role}`)}</Badge>
              </div>
              <div className="w-full pt-4 border-t space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Shield className="h-4 w-4" />
                  <span>{user.cpf}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-[#002B5B]" />
              {t('profile.personalInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('profile.name')}</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('profile.email')}</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
              <div className="space-y-2">
                <Label>CPF</Label>
                <Input defaultValue={user.cpf} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">{t('profile.role')}</Label>
                <Input id="role" defaultValue={t(`role.${user.role}`)} disabled />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#002B5B]" />
                {t('profile.language')}
              </h3>
              <div className="flex items-center gap-4">
                <Button
                  variant={language === 'pt' ? 'default' : 'outline'}
                  onClick={() => language === 'en' && toggleLanguage()}
                  className={language === 'pt' ? 'bg-[#002B5B] hover:bg-[#003D7A]' : ''}
                >
                  🇧🇷 Português
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  onClick={() => language === 'pt' && toggleLanguage()}
                  className={language === 'en' ? 'bg-[#002B5B] hover:bg-[#003D7A]' : ''}
                >
                  🇺🇸 English
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline">{t('comm.cancel')}</Button>
              <Button className="bg-[#002B5B] hover:bg-[#003D7A]">
                {t('profile.save')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
