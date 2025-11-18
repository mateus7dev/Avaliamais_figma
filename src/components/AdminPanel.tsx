import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Users, Calendar, BookOpen, Plus, Search, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function AdminPanel() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    { id: 1, name: 'João Santos', role: 'teacher', email: 'joao@avaliaplus.ma.gov.br', status: 'active' },
    { id: 2, name: 'Ana Costa', role: 'student', email: 'ana@avaliaplus.ma.gov.br', status: 'active' },
    { id: 3, name: 'Carlos Oliveira', role: 'parent', email: 'carlos@avaliaplus.ma.gov.br', status: 'active' },
    { id: 4, name: 'Maria Silva', role: 'administrator', email: 'maria@avaliaplus.ma.gov.br', status: 'active' }
  ];

  const classes = [
    { id: 1, name: '1º Ano A', students: 28, teacher: 'Prof. João Santos', schedule: 'Mon-Fri 08:00-12:00' },
    { id: 2, name: '1º Ano B', students: 30, teacher: 'Prof. Ana Lima', schedule: 'Mon-Fri 08:00-12:00' },
    { id: 3, name: '2º Ano A', students: 32, teacher: 'Prof. Pedro Costa', schedule: 'Mon-Fri 13:00-17:00' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t('admin.title')}</h1>
          <p className="text-gray-600">{t('nav.admin')}</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            {t('admin.users')}
          </TabsTrigger>
          <TabsTrigger value="classes" className="gap-2">
            <BookOpen className="h-4 w-4" />
            {t('admin.classes')}
          </TabsTrigger>
          <TabsTrigger value="schedules" className="gap-2">
            <Calendar className="h-4 w-4" />
            {t('admin.schedules')}
          </TabsTrigger>
        </TabsList>

        {/* Users Management */}
        <TabsContent value="users" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#002B5B]" />
                  {t('admin.users')}
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#002B5B] hover:bg-[#003D7A] gap-2">
                      <Plus className="h-4 w-4" />
                      {t('admin.addUser')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('admin.addUser')}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>{t('profile.name')}</Label>
                        <Input placeholder={t('profile.name')} />
                      </div>
                      <div>
                        <Label>{t('profile.email')}</Label>
                        <Input type="email" placeholder={t('profile.email')} />
                      </div>
                      <div>
                        <Label>{t('profile.role')}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('profile.role')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="administrator">{t('role.administrator')}</SelectItem>
                            <SelectItem value="teacher">{t('role.teacher')}</SelectItem>
                            <SelectItem value="student">{t('role.student')}</SelectItem>
                            <SelectItem value="parent">{t('role.parent')}</SelectItem>
                            <SelectItem value="secretary">{t('role.secretary')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline">{t('comm.cancel')}</Button>
                        <Button className="bg-[#002B5B] hover:bg-[#003D7A]">{t('common.save')}</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t('common.search')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('profile.name')}</TableHead>
                    <TableHead>{t('profile.role')}</TableHead>
                    <TableHead>{t('profile.email')}</TableHead>
                    <TableHead>{t('academic.status')}</TableHead>
                    <TableHead className="text-right">{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{t(`role.${user.role}`)}</Badge>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Management */}
        <TabsContent value="classes">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#002B5B]" />
                  {t('admin.classes')}
                </CardTitle>
                <Button className="bg-[#002B5B] hover:bg-[#003D7A] gap-2">
                  <Plus className="h-4 w-4" />
                  Add Class
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Class</TableHead>
                    <TableHead>{t('dashboard.students')}</TableHead>
                    <TableHead>{t('reports.teacher')}</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead className="text-right">{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell>{cls.name}</TableCell>
                      <TableCell>{cls.students}</TableCell>
                      <TableCell>{cls.teacher}</TableCell>
                      <TableCell>{cls.schedule}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schedules */}
        <TabsContent value="schedules">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#002B5B]" />
                {t('admin.schedules')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Schedule management coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}