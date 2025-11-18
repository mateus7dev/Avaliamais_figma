import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { MessageSquare, Send, Inbox, Mail, Bell } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function CommunicationModule() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [showCompose, setShowCompose] = useState(false);

  const messages = [
    {
      from: { en: 'Prof. João Santos', pt: 'Prof. João Santos' },
      subject: { en: 'Assignment Submission', pt: 'Entrega de Trabalho' },
      preview: { en: 'Please submit your assignment by Friday...', pt: 'Por favor, envie seu trabalho até sexta-feira...' },
      date: '2025-10-28',
      unread: true
    },
    {
      from: { en: 'School Administration', pt: 'Administração Escolar' },
      subject: { en: 'Parent Meeting Schedule', pt: 'Cronograma de Reunião de Pais' },
      preview: { en: 'The parent-teacher meeting is scheduled for...', pt: 'A reunião de pais e mestres está agendada para...' },
      date: '2025-10-27',
      unread: true
    },
    {
      from: { en: 'Maria Silva', pt: 'Maria Silva' },
      subject: { en: 'Grade Report Available', pt: 'Boletim Disponível' },
      preview: { en: 'Your quarterly grades are now available...', pt: 'Suas notas do trimestre já estão disponíveis...' },
      date: '2025-10-26',
      unread: false
    }
  ];

  const announcements = [
    {
      title: { en: 'School Holiday Notice', pt: 'Aviso de Feriado Escolar' },
      content: { 
        en: 'The school will be closed on November 15th for National Proclamation Day.', 
        pt: 'A escola estará fechada no dia 15 de novembro pelo Dia da Proclamação da República.' 
      },
      date: '2025-10-30',
      priority: 'high'
    },
    {
      title: { en: 'New Cafeteria Menu', pt: 'Novo Cardápio da Cantina' },
      content: { 
        en: 'Check out our updated cafeteria menu with healthier options.', 
        pt: 'Confira nosso cardápio atualizado com opções mais saudáveis.' 
      },
      date: '2025-10-28',
      priority: 'normal'
    },
    {
      title: { en: 'Sports Tournament Registration', pt: 'Inscrição para Torneio Esportivo' },
      content: { 
        en: 'Registration is now open for the inter-school sports tournament.', 
        pt: 'As inscrições para o torneio esportivo inter-escolar estão abertas.' 
      },
      date: '2025-10-25',
      priority: 'normal'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t('comm.title')}</h1>
          <p className="text-gray-600">{t('comm.messages')}</p>
        </div>
        <Dialog open={showCompose} onOpenChange={setShowCompose}>
          <DialogTrigger asChild>
            <Button className="bg-[#002B5B] hover:bg-[#003D7A] gap-2">
              <Send className="h-4 w-4" />
              {t('comm.compose')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('comm.sendMessage')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="recipient">{t('comm.recipient')}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={t('comm.recipient')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Prof. João Santos</SelectItem>
                    <SelectItem value="admin">Maria Silva - {t('role.administrator')}</SelectItem>
                    <SelectItem value="coordinator">{t('role.secretary')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">{t('comm.subject')}</Label>
                <Input id="subject" placeholder={t('comm.subject')} />
              </div>
              <div>
                <Label htmlFor="message">{t('comm.message')}</Label>
                <Textarea id="message" rows={6} placeholder={t('comm.message')} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowCompose(false)}>
                  {t('comm.cancel')}
                </Button>
                <Button className="bg-[#002B5B] hover:bg-[#003D7A]" onClick={() => setShowCompose(false)}>
                  {t('comm.send')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="inbox" className="gap-2">
            <Inbox className="h-4 w-4" />
            {t('comm.inbox')}
          </TabsTrigger>
          <TabsTrigger value="sent" className="gap-2">
            <Mail className="h-4 w-4" />
            {t('comm.sent')}
          </TabsTrigger>
          <TabsTrigger value="announcements" className="gap-2">
            <Bell className="h-4 w-4" />
            {t('comm.announcements')}
          </TabsTrigger>
        </TabsList>

        {/* Inbox Tab */}
        <TabsContent value="inbox" className="space-y-2">
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors ${
                    message.unread ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="h-4 w-4 text-[#002B5B]" />
                        <span className={message.unread ? 'font-semibold' : ''}>
                          {message.from[language]}
                        </span>
                        {message.unread && <Badge variant="destructive">New</Badge>}
                      </div>
                      <p className={message.unread ? 'font-semibold' : ''}>
                        {message.subject[language]}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {message.preview[language]}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sent Tab */}
        <TabsContent value="sent">
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center text-gray-500">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t('common.noData')}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-4">
          {announcements.map((announcement, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className={`h-5 w-5 ${announcement.priority === 'high' ? 'text-red-500' : 'text-[#002B5B]'}`} />
                    {announcement.title[language]}
                  </CardTitle>
                  {announcement.priority === 'high' && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">{announcement.content[language]}</p>
                <p className="text-xs text-gray-500">{announcement.date}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
