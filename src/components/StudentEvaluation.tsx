import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  Upload, 
  User, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  FileText,
  Calendar
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

type EmojiLevel = 'veryLow' | 'needsImprovement' | 'good' | 'excellent';
type Criterion = 'accessibility' | 'participation' | 'responsibility' | 'sociability';

interface Student {
  id: string;
  name: string;
  photo?: string;
  class: string;
  studentId: string;
}

interface Evaluation {
  criterion: Criterion;
  level: EmojiLevel;
  emoji: string;
  comments?: string;
  date: string;
}

interface EvaluationHistory {
  criterion: Criterion;
  previous?: EmojiLevel;
  current: EmojiLevel;
  trend: 'improved' | 'maintained' | 'declined' | 'new';
}

const emojiLevels = {
  veryLow: { emoji: '😞', value: 1 },
  needsImprovement: { emoji: '😐', value: 2 },
  good: { emoji: '🙂', value: 3 },
  excellent: { emoji: '😃', value: 4 }
};

const criteriaList: Criterion[] = ['accessibility', 'participation', 'responsibility', 'sociability'];

export function StudentEvaluation() {
  const { t, language } = useLanguage();
  const [selectedStudent, setSelectedStudent] = useState<Student>({
    id: '1',
    name: 'Ana Costa',
    class: '1º Ano A',
    studentId: '2025001',
    photo: undefined
  });

  const [evaluations, setEvaluations] = useState<Record<Criterion, { level: EmojiLevel; comments: string }>>({
    accessibility: { level: 'good', comments: '' },
    participation: { level: 'excellent', comments: 'Very engaged in all activities!' },
    responsibility: { level: 'good', comments: '' },
    sociability: { level: 'excellent', comments: 'Works well with peers.' }
  });

  const [previousEvaluations] = useState<Record<Criterion, EmojiLevel>>({
    accessibility: 'needsImprovement',
    participation: 'good',
    responsibility: 'needsImprovement',
    sociability: 'good'
  });

  const handleEmojiSelect = (criterion: Criterion, level: EmojiLevel) => {
    setEvaluations(prev => ({
      ...prev,
      [criterion]: { ...prev[criterion], level }
    }));
  };

  const handleCommentChange = (criterion: Criterion, comments: string) => {
    setEvaluations(prev => ({
      ...prev,
      [criterion]: { ...prev[criterion], comments }
    }));
  };

  const getTrend = (criterion: Criterion): 'improved' | 'maintained' | 'declined' | 'new' => {
    const previous = previousEvaluations[criterion];
    const current = evaluations[criterion].level;
    
    if (!previous) return 'new';
    
    const prevValue = emojiLevels[previous].value;
    const currValue = emojiLevels[current].value;
    
    if (currValue > prevValue) return 'improved';
    if (currValue < prevValue) return 'declined';
    return 'maintained';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improved':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declined':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'maintained':
        return <Minus className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getAverageScore = () => {
    const sum = criteriaList.reduce((acc, criterion) => {
      return acc + emojiLevels[evaluations[criterion].level].value;
    }, 0);
    return (sum / criteriaList.length).toFixed(1);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedStudent(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t('eval.title')}</h1>
        <p className="text-gray-600">{t('eval.studentProfile')}</p>
      </div>

      <Tabs defaultValue="evaluate" className="space-y-4">
        <TabsList>
          <TabsTrigger value="evaluate">{t('eval.title')}</TabsTrigger>
          <TabsTrigger value="report">{t('eval.performanceReport')}</TabsTrigger>
        </TabsList>

        {/* Evaluation Tab */}
        <TabsContent value="evaluate" className="space-y-6">
          {/* Student Profile Card */}
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-32 w-32 border-4 border-[#FFD400]">
                    {selectedStudent.photo ? (
                      <AvatarImage src={selectedStudent.photo} alt={selectedStudent.name} />
                    ) : (
                      <AvatarFallback className="bg-[#002B5B] text-white text-3xl">
                        {selectedStudent.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <label htmlFor="photo-upload">
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                    />
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => document.getElementById('photo-upload')?.click()}
                      type="button"
                    >
                      <Upload className="h-4 w-4" />
                      {selectedStudent.photo ? t('eval.changePhoto') : t('eval.uploadPhoto')}
                    </Button>
                  </label>
                </div>
                
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl">{selectedStudent.name}</h2>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{selectedStudent.class}</Badge>
                    <Badge variant="outline">ID: {selectedStudent.studentId}</Badge>
                  </div>
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t('dashboard.average')}</p>
                      <p className="text-2xl">{getAverageScore()}/4.0</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('common.date')}</p>
                      <p className="text-sm">{new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation Criteria Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criteriaList.map((criterion) => (
              <Card key={criterion} className="border-0 shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg">{t(`criteria.${criterion}`)}</h3>
                      <p className="text-sm text-gray-600 font-normal">
                        {t(`criteria.${criterion}.desc`)}
                      </p>
                    </div>
                    {getTrendIcon(getTrend(criterion))}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Emoji Selection */}
                  <div>
                    <Label className="text-sm mb-2 block">{t('eval.selectEmoji')}</Label>
                    <div className="flex gap-2 justify-between">
                      {(Object.keys(emojiLevels) as EmojiLevel[]).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => handleEmojiSelect(criterion, level)}
                          className={`flex-1 p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                            evaluations[criterion].level === level
                              ? 'border-[#002B5B] bg-blue-50 shadow-md'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          title={t(`level.${level}`)}
                        >
                          <div className="text-3xl mb-1">{emojiLevels[level].emoji}</div>
                          <div className="text-xs">{t(`level.${level}`)}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  <div>
                    <Label className="text-sm mb-2 block">{t('eval.addComments')}</Label>
                    <Textarea
                      placeholder={t('eval.addComments')}
                      value={evaluations[criterion].comments}
                      onChange={(e) => handleCommentChange(criterion, e.target.value)}
                      rows={2}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              {t('eval.viewHistory')}
            </Button>
            <Button className="bg-[#002B5B] hover:bg-[#003D7A] gap-2">
              {t('eval.saveEvaluation')}
            </Button>
          </div>
        </TabsContent>

        {/* Performance Report Tab */}
        <TabsContent value="report" className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-[#002B5B] text-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('eval.performanceReport')} - {selectedStudent.name}
                </CardTitle>
                <Badge className="bg-[#FFD400] text-[#002B5B]">
                  {new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Student Info */}
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="h-20 w-20 border-2 border-[#FFD400]">
                  {selectedStudent.photo ? (
                    <AvatarImage src={selectedStudent.photo} alt={selectedStudent.name} />
                  ) : (
                    <AvatarFallback className="bg-[#002B5B] text-white text-xl">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h3 className="text-xl">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.class} • ID: {selectedStudent.studentId}</p>
                </div>
              </div>

              {/* Overall Performance */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('dashboard.average')}</p>
                  <p className="text-3xl">{getAverageScore()}</p>
                  <p className="text-xs text-gray-500">/ 4.0</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('eval.improved')}</p>
                  <p className="text-3xl text-green-500">
                    {criteriaList.filter(c => getTrend(c) === 'improved').length}
                  </p>
                  <p className="text-xs text-gray-500">{t('criteria.accessibility')}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('eval.declined')}</p>
                  <p className="text-3xl text-red-500">
                    {criteriaList.filter(c => getTrend(c) === 'declined').length}
                  </p>
                  <p className="text-xs text-gray-500">{t('criteria.accessibility')}</p>
                </div>
              </div>

              {/* Detailed Criteria Report */}
              <div className="space-y-4">
                <h3 className="font-semibold">{t('eval.evolutionTrend')}</h3>
                {criteriaList.map((criterion) => {
                  const current = evaluations[criterion];
                  const trend = getTrend(criterion);
                  const currentValue = emojiLevels[current.level].value;
                  const percentage = (currentValue / 4) * 100;

                  return (
                    <div key={criterion} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4>{t(`criteria.${criterion}`)}</h4>
                          {getTrendIcon(trend)}
                          <Badge variant={
                            trend === 'improved' ? 'default' : 
                            trend === 'declined' ? 'destructive' : 
                            'secondary'
                          } className="text-xs">
                            {t(`eval.${trend}`)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{emojiLevels[current.level].emoji}</span>
                          <span className="text-sm">{t(`level.${current.level}`)}</span>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2 mb-2" />
                      {current.comments && (
                        <p className="text-sm text-gray-600 italic mt-2">"{current.comments}"</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Export Buttons */}
              <div className="flex gap-2 justify-end pt-4 border-t">
                <Button variant="outline">{t('reports.exportPDF')}</Button>
                <Button variant="outline">{t('reports.exportExcel')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
