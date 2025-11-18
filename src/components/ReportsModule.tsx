import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FileText, Download, BarChart3, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ReportsModule() {
  const { t, language } = useLanguage();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const classes = [
    { value: '1a', label: { en: '1st Year A', pt: '1º Ano A' } },
    { value: '1b', label: { en: '1st Year B', pt: '1º Ano B' } },
    { value: '2a', label: { en: '2nd Year A', pt: '2º Ano A' } },
    { value: '3a', label: { en: '3rd Year A', pt: '3º Ano A' } }
  ];

  const periods = [
    { value: 'q1', label: { en: '1st Quarter', pt: '1º Trimestre' } },
    { value: 'q2', label: { en: '2nd Quarter', pt: '2º Trimestre' } },
    { value: 'q3', label: { en: '3rd Quarter', pt: '3º Trimestre' } },
    { value: 'q4', label: { en: '4th Quarter', pt: '4º Trimestre' } },
    { value: 'annual', label: { en: 'Annual', pt: 'Anual' } }
  ];

  const reportTypes = [
    { value: 'academic', label: t('reports.academicPerformance') },
    { value: 'attendance', label: t('reports.attendanceReport') },
    { value: 'general', label: t('reports.generalReport') }
  ];

  const recentReports = [
    {
      name: { en: 'Q3 Academic Performance - 1st Year A', pt: 'Desempenho Acadêmico T3 - 1º Ano A' },
      date: '2025-10-25',
      type: 'academic'
    },
    {
      name: { en: 'Monthly Attendance Report - October', pt: 'Relatório de Frequência Mensal - Outubro' },
      date: '2025-10-20',
      type: 'attendance'
    },
    {
      name: { en: 'General Performance Report - All Classes', pt: 'Relatório Geral de Desempenho - Todas as Turmas' },
      date: '2025-10-15',
      type: 'general'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t('reports.title')}</h1>
        <p className="text-gray-600">{t('reports.generate')}</p>
      </div>

      <Tabs defaultValue="generate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generate">{t('reports.generate')}</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-4">
          {/* Generate Report Form */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#002B5B]" />
                {t('reports.generate')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('reports.type')}</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('reports.type')} />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('reports.class')}</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('reports.class')} />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.value} value={cls.value}>
                          {cls.label[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('reports.period')}</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('reports.period')} />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem key={period.value} value={period.value}>
                          {period.label[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-[#002B5B] hover:bg-[#003D7A] gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {t('reports.generate')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview/Results Area */}
          {selectedType && selectedClass && selectedPeriod && (
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Report Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">{t('dashboard.average')}</p>
                      <p className="text-2xl">8.5</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('dashboard.attendance')}</p>
                      <p className="text-2xl">94%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('dashboard.students')}</p>
                      <p className="text-2xl">32</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      {t('reports.exportPDF')}
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      {t('reports.exportExcel')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#002B5B]" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#002B5B]" />
                      <div>
                        <p>{report.name[language]}</p>
                        <p className="text-sm text-gray-600">{report.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        {t('common.view')}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
