import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BookOpen, FileText, TrendingUp, Calendar, Star } from "lucide-react";
import { Progress } from "./ui/progress";

export function AcademicModule() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const subjects = [
    { 
      name: { en: 'Mathematics', pt: 'Matemática' }, 
      grades: [8.5, 9.0, 7.8, 8.2],
      average: 8.4,
      attendance: 95,
      status: 'approved'
    },
    { 
      name: { en: 'Portuguese', pt: 'Português' }, 
      grades: [9.2, 8.8, 9.5, 9.0],
      average: 9.1,
      attendance: 97,
      status: 'approved'
    },
    { 
      name: { en: 'Science', pt: 'Ciências' }, 
      grades: [7.5, 8.0, 7.2, 7.8],
      average: 7.6,
      attendance: 92,
      status: 'inProgress'
    },
    { 
      name: { en: 'History', pt: 'História' }, 
      grades: [8.8, 9.2, 8.5, 9.0],
      average: 8.9,
      attendance: 98,
      status: 'approved'
    },
    { 
      name: { en: 'English', pt: 'Inglês' }, 
      grades: [9.5, 9.8, 9.2, 9.6],
      average: 9.5,
      attendance: 100,
      status: 'approved'
    },
    { 
      name: { en: 'Physical Education', pt: 'Educação Física' }, 
      grades: [10, 9.8, 9.5, 10],
      average: 9.8,
      attendance: 96,
      status: 'approved'
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return <Badge className="bg-green-500">{t('academic.approved')}</Badge>;
    } else if (status === 'failed') {
      return <Badge variant="destructive">{t('academic.failed')}</Badge>;
    } else {
      return <Badge variant="secondary">{t('academic.inProgress')}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t('academic.title')}</h1>
        <p className="text-gray-600">{t('academic.performance')}</p>
      </div>

      <Tabs defaultValue="grades" className="space-y-4">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="grades" className="gap-2">
            <BookOpen className="h-4 w-4" />
            {t('academic.grades')}
          </TabsTrigger>
          <TabsTrigger value="attendance" className="gap-2">
            <Calendar className="h-4 w-4" />
            {t('academic.attendance')}
          </TabsTrigger>
          <TabsTrigger value="report" className="gap-2">
            <FileText className="h-4 w-4" />
            {t('academic.reportCard')}
          </TabsTrigger>
          <TabsTrigger value="evaluation" className="gap-2">
            <Star className="h-4 w-4" />
            {t('eval.title')}
          </TabsTrigger>
        </TabsList>

        {/* Grades Tab */}
        <TabsContent value="grades" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#002B5B]" />
                {t('academic.grades')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('academic.subject')}</TableHead>
                    <TableHead className="text-center">Q1</TableHead>
                    <TableHead className="text-center">Q2</TableHead>
                    <TableHead className="text-center">Q3</TableHead>
                    <TableHead className="text-center">Q4</TableHead>
                    <TableHead className="text-center">{t('dashboard.average')}</TableHead>
                    <TableHead className="text-center">{t('academic.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.name[language]}</TableCell>
                      {subject.grades.map((grade, i) => (
                        <TableCell key={i} className="text-center">{grade.toFixed(1)}</TableCell>
                      ))}
                      <TableCell className="text-center">{subject.average.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(subject.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {user?.role === 'teacher' && (
            <Button className="bg-[#002B5B] hover:bg-[#003D7A]">
              {t('academic.registerGrades')}
            </Button>
          )}
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>{t('academic.attendance')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjects.map((subject, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span>{subject.name[language]}</span>
                      <span className="text-sm">{subject.attendance}%</span>
                    </div>
                    <Progress 
                      value={subject.attendance} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Card Tab */}
        <TabsContent value="report" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-[#002B5B] text-white">
              <CardTitle className="text-center">
                {t('academic.reportCard')} - 2025
              </CardTitle>
              <p className="text-center text-sm">{user?.name}</p>
            </CardHeader>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('academic.subject')}</TableHead>
                    <TableHead className="text-center">{t('dashboard.average')}</TableHead>
                    <TableHead className="text-center">{t('academic.attendance')}</TableHead>
                    <TableHead className="text-center">{t('academic.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.name[language]}</TableCell>
                      <TableCell className="text-center">{subject.average.toFixed(1)}</TableCell>
                      <TableCell className="text-center">{subject.attendance}%</TableCell>
                      <TableCell className="text-center">{getStatusBadge(subject.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t('dashboard.average')} {t('common.view')}</p>
                    <p className="text-2xl">8.7</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('academic.attendance')} {t('common.view')}</p>
                    <p className="text-2xl">96%</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline">{t('reports.exportPDF')}</Button>
                <Button className="bg-[#002B5B] hover:bg-[#003D7A]">{t('academic.viewReport')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Evaluation Tab (NEW) */}
        <TabsContent value="evaluation" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-[#FFD400]" />
                {t('eval.title')} - {t('eval.performanceReport')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-gray-600 mb-4">
                  {user?.role === 'teacher' 
                    ? language === 'pt' 
                      ? 'Acesse o módulo de avaliação por aluno para registrar desempenho comportamental e acadêmico.'
                      : 'Access the student evaluation module to record behavioral and academic performance.'
                    : language === 'pt'
                      ? 'Visualize suas avaliações comportamentais e de participação.'
                      : 'View your behavioral and participation evaluations.'
                  }
                </p>
                <Button className="bg-[#002B5B] hover:bg-[#003D7A]">
                  {t('eval.viewHistory')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}