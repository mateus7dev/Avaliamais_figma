import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { BookOpen, Plus, Edit, Trash2, Search, Filter, Share2, Lock } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";

interface Question {
  id: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'multipleChoice' | 'trueFalse' | 'shortAnswer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  shared: boolean;
  author: string;
}

export function QuestionBank() {
  const { t, language } = useLanguage();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const [formData, setFormData] = useState<Partial<Question>>({
    subject: '',
    topic: '',
    difficulty: 'medium',
    type: 'multipleChoice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
    shared: false
  });

  const [questions] = useState<Question[]>([
    {
      id: '1',
      subject: language === 'pt' ? 'Matemática' : 'Mathematics',
      topic: language === 'pt' ? 'Álgebra' : 'Algebra',
      difficulty: 'medium',
      type: 'multipleChoice',
      question: language === 'pt' 
        ? 'Qual é o valor de x na equação 2x + 5 = 15?' 
        : 'What is the value of x in the equation 2x + 5 = 15?',
      options: ['3', '5', '7', '10'],
      correctAnswer: '5',
      explanation: language === 'pt' ? '2x = 10, então x = 5' : '2x = 10, so x = 5',
      shared: true,
      author: 'Prof. João Santos'
    },
    {
      id: '2',
      subject: language === 'pt' ? 'Português' : 'Portuguese',
      topic: language === 'pt' ? 'Gramática' : 'Grammar',
      difficulty: 'easy',
      type: 'trueFalse',
      question: language === 'pt'
        ? 'O substantivo é a classe de palavras que nomeia seres e objetos.'
        : 'A noun is the class of words that names beings and objects.',
      correctAnswer: language === 'pt' ? 'Verdadeiro' : 'True',
      shared: false,
      author: 'Prof. Maria Silva'
    },
    {
      id: '3',
      subject: language === 'pt' ? 'Ciências' : 'Science',
      topic: language === 'pt' ? 'Biologia' : 'Biology',
      difficulty: 'hard',
      type: 'multipleChoice',
      question: language === 'pt'
        ? 'Qual é a função das mitocôndrias nas células?'
        : 'What is the function of mitochondria in cells?',
      options: language === 'pt'
        ? ['Fotossíntese', 'Produção de energia', 'Síntese de proteínas', 'Armazenamento']
        : ['Photosynthesis', 'Energy production', 'Protein synthesis', 'Storage'],
      correctAnswer: language === 'pt' ? 'Produção de energia' : 'Energy production',
      explanation: language === 'pt'
        ? 'As mitocôndrias são responsáveis pela respiração celular e produção de ATP.'
        : 'Mitochondria are responsible for cellular respiration and ATP production.',
      shared: true,
      author: 'Prof. Ana Lima'
    }
  ]);

  const subjects = [
    { value: 'mathematics', label: { pt: 'Matemática', en: 'Mathematics' } },
    { value: 'portuguese', label: { pt: 'Português', en: 'Portuguese' } },
    { value: 'science', label: { pt: 'Ciências', en: 'Science' } },
    { value: 'history', label: { pt: 'História', en: 'History' } },
    { value: 'geography', label: { pt: 'Geografia', en: 'Geography' } }
  ];

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(formData.options || ['', '', '', ''])];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500',
      hard: 'bg-red-500'
    };
    return <Badge className={colors[difficulty as keyof typeof colors]}>{t(`difficulty.${difficulty}`)}</Badge>;
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
    const matchesSubject = filterSubject === 'all' || q.subject.toLowerCase().includes(filterSubject.toLowerCase());
    return matchesSearch && matchesDifficulty && matchesSubject;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t('qbank.title')}</h1>
          <p className="text-gray-600">{t('qbank.myQuestions')}</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-[#002B5B] hover:bg-[#003D7A] gap-2">
              <Plus className="h-4 w-4" />
              {t('qbank.addQuestion')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('qbank.addQuestion')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Subject and Topic */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('qbank.subject')}</Label>
                  <Select 
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('qbank.subject')} />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(s => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label[language]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('qbank.topic')}</Label>
                  <Input 
                    placeholder={t('qbank.topic')}
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  />
                </div>
              </div>

              {/* Difficulty and Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t('qbank.difficulty')}</Label>
                  <Select 
                    value={formData.difficulty}
                    onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">{t('difficulty.easy')}</SelectItem>
                      <SelectItem value="medium">{t('difficulty.medium')}</SelectItem>
                      <SelectItem value="hard">{t('difficulty.hard')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t('qbank.type')}</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multipleChoice">{t('qtype.multipleChoice')}</SelectItem>
                      <SelectItem value="trueFalse">{t('qtype.trueFalse')}</SelectItem>
                      <SelectItem value="shortAnswer">{t('qtype.shortAnswer')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Question Text */}
              <div>
                <Label>{t('qbank.question')}</Label>
                <Textarea 
                  placeholder={t('qbank.question')}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Options (for Multiple Choice) */}
              {formData.type === 'multipleChoice' && (
                <div className="space-y-2">
                  <Label>Options / Opções</Label>
                  {formData.options?.map((option, index) => (
                    <Input
                      key={index}
                      placeholder={`${language === 'pt' ? 'Opção' : 'Option'} ${String.fromCharCode(65 + index)}`}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                  ))}
                </div>
              )}

              {/* Correct Answer */}
              <div>
                <Label>{t('qbank.correctAnswer')}</Label>
                {formData.type === 'trueFalse' ? (
                  <RadioGroup 
                    value={formData.correctAnswer}
                    onValueChange={(value) => setFormData({ ...formData, correctAnswer: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="true" />
                      <Label htmlFor="true">{language === 'pt' ? 'Verdadeiro' : 'True'}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="false" />
                      <Label htmlFor="false">{language === 'pt' ? 'Falso' : 'False'}</Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <Input 
                    placeholder={t('qbank.correctAnswer')}
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                  />
                )}
              </div>

              {/* Explanation */}
              <div>
                <Label>{t('qbank.explanation')} ({language === 'pt' ? 'Opcional' : 'Optional'})</Label>
                <Textarea 
                  placeholder={t('qbank.explanation')}
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                  rows={2}
                />
              </div>

              {/* Visibility */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  {formData.shared ? <Share2 className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  <div>
                    <Label>{t('qbank.visibility')}</Label>
                    <p className="text-sm text-gray-600">
                      {formData.shared ? t('qbank.shared') : t('qbank.private')}
                    </p>
                  </div>
                </div>
                <Switch 
                  checked={formData.shared}
                  onCheckedChange={(checked) => setFormData({ ...formData, shared: checked })}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                  {t('comm.cancel')}
                </Button>
                <Button 
                  className="bg-[#002B5B] hover:bg-[#003D7A]"
                  onClick={() => setShowAddDialog(false)}
                >
                  {t('common.save')}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder={t('qbank.difficulty')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'pt' ? 'Todas' : 'All'}</SelectItem>
                <SelectItem value="easy">{t('difficulty.easy')}</SelectItem>
                <SelectItem value="medium">{t('difficulty.medium')}</SelectItem>
                <SelectItem value="hard">{t('difficulty.hard')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger>
                <SelectValue placeholder={t('qbank.subject')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'pt' ? 'Todas' : 'All'}</SelectItem>
                {subjects.map(s => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Tabs defaultValue="my" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my">{t('qbank.myQuestions')}</TabsTrigger>
          <TabsTrigger value="shared">{t('qbank.sharedQuestions')}</TabsTrigger>
        </TabsList>

        <TabsContent value="my">
          <Card className="border-0 shadow-md">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('qbank.question')}</TableHead>
                    <TableHead>{t('qbank.subject')}</TableHead>
                    <TableHead>{t('qbank.topic')}</TableHead>
                    <TableHead>{t('qbank.difficulty')}</TableHead>
                    <TableHead>{t('qbank.type')}</TableHead>
                    <TableHead className="text-right">{t('common.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQuestions.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell className="max-w-md">
                        <div className="flex items-start gap-2">
                          {q.shared ? <Share2 className="h-4 w-4 text-blue-500 mt-1" /> : <Lock className="h-4 w-4 text-gray-400 mt-1" />}
                          <span className="line-clamp-2">{q.question}</span>
                        </div>
                      </TableCell>
                      <TableCell>{q.subject}</TableCell>
                      <TableCell>{q.topic}</TableCell>
                      <TableCell>{getDifficultyBadge(q.difficulty)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{t(`qtype.${q.type}`)}</Badge>
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

        <TabsContent value="shared">
          <Card className="border-0 shadow-md">
            <CardContent className="p-8 text-center text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t('qbank.sharedQuestions')}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
