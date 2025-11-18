import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  FileText, 
  Plus, 
  Play, 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3,
  Calendar as CalendarIcon,
  Eye
} from "lucide-react";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface Simulation {
  id: string;
  name: string;
  description: string;
  subject: string;
  startDate: string;
  endDate: string;
  duration: number;
  numQuestions: number;
  status: 'scheduled' | 'active' | 'finished';
  participants: number;
  avgScore?: number;
}

interface StudentSimulation extends Simulation {
  completed: boolean;
  score?: number;
  questionsAnswered?: number;
}

export function SimulationsModule() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Teacher simulations
  const [simulations] = useState<Simulation[]>([
    {
      id: '1',
      name: language === 'pt' ? 'Simulado de Matemática - Q1' : 'Mathematics Simulation - Q1',
      description: language === 'pt' ? 'Avaliação do primeiro trimestre' : 'First quarter assessment',
      subject: language === 'pt' ? 'Matemática' : 'Mathematics',
      startDate: '2025-11-01',
      endDate: '2025-11-15',
      duration: 60,
      numQuestions: 20,
      status: 'active',
      participants: 28,
      avgScore: 7.5
    },
    {
      id: '2',
      name: language === 'pt' ? 'Prova de Português' : 'Portuguese Test',
      description: language === 'pt' ? 'Gramática e interpretação de texto' : 'Grammar and text interpretation',
      subject: language === 'pt' ? 'Português' : 'Portuguese',
      startDate: '2025-11-20',
      endDate: '2025-11-25',
      duration: 90,
      numQuestions: 30,
      status: 'scheduled',
      participants: 0
    },
    {
      id: '3',
      name: language === 'pt' ? 'Simulado de Ciências' : 'Science Simulation',
      description: language === 'pt' ? 'Biologia e Química' : 'Biology and Chemistry',
      subject: language === 'pt' ? 'Ciências' : 'Science',
      startDate: '2025-10-15',
      endDate: '2025-10-20',
      duration: 45,
      numQuestions: 15,
      status: 'finished',
      participants: 30,
      avgScore: 8.2
    }
  ]);

  // Student simulations
  const [studentSimulations] = useState<StudentSimulation[]>([
    {
      id: '1',
      name: language === 'pt' ? 'Simulado de Matemática - Q1' : 'Mathematics Simulation - Q1',
      description: language === 'pt' ? 'Avaliação do primeiro trimestre' : 'First quarter assessment',
      subject: language === 'pt' ? 'Matemática' : 'Mathematics',
      startDate: '2025-11-01',
      endDate: '2025-11-15',
      duration: 60,
      numQuestions: 20,
      status: 'active',
      participants: 28,
      completed: false
    },
    {
      id: '3',
      name: language === 'pt' ? 'Simulado de Ciências' : 'Science Simulation',
      description: language === 'pt' ? 'Biologia e Química' : 'Biology and Chemistry',
      subject: language === 'pt' ? 'Ciências' : 'Science',
      startDate: '2025-10-15',
      endDate: '2025-10-20',
      duration: 45,
      numQuestions: 15,
      status: 'finished',
      participants: 30,
      completed: true,
      score: 8.5,
      questionsAnswered: 15
    }
  ]);

  const mockQuestions = [
    {
      id: 1,
      question: language === 'pt' 
        ? 'Qual é o valor de x na equação 3x + 7 = 22?' 
        : 'What is the value of x in the equation 3x + 7 = 22?',
      options: ['3', '5', '7', '15']
    },
    {
      id: 2,
      question: language === 'pt'
        ? 'Qual é a raiz quadrada de 144?'
        : 'What is the square root of 144?',
      options: ['10', '11', '12', '13']
    },
    {
      id: 3,
      question: language === 'pt'
        ? 'Quanto é 25% de 200?'
        : 'How much is 25% of 200?',
      options: ['25', '50', '75', '100']
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-500', label: t('sim.active') },
      scheduled: { color: 'bg-blue-500', label: t('sim.scheduled') },
      finished: { color: 'bg-gray-500', label: t('sim.finished') }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  if (activeTest) {
    // Student Test Taking Interface
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Header with Timer */}
        <Card className="border-0 shadow-md bg-[#002B5B] text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl mb-1">{language === 'pt' ? 'Simulado de Matemática - Q1' : 'Mathematics Simulation - Q1'}</h2>
                <p className="text-sm text-gray-300">
                  {language === 'pt' ? 'Questão' : 'Question'} {currentQuestion + 1} {language === 'pt' ? 'de' : 'of'} {mockQuestions.length}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-[#FFD400]" />
                  <span className="text-2xl">{formatTime(timeRemaining)}</span>
                </div>
                <p className="text-xs text-gray-300">{t('sim.timeRemaining')}</p>
              </div>
            </div>
            <Progress value={progress} className="mt-4 h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'pt' ? 'Questão' : 'Question'} {currentQuestion + 1}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg">{mockQuestions[currentQuestion].question}</p>

            <RadioGroup 
              value={answers[mockQuestions[currentQuestion].id]}
              onValueChange={(value) => handleAnswerSelect(mockQuestions[currentQuestion].id, value)}
            >
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {String.fromCharCode(65 + index)}. {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline"
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                {language === 'pt' ? 'Anterior' : 'Previous'}
              </Button>
              
              {currentQuestion < mockQuestions.length - 1 ? (
                <Button 
                  className="bg-[#002B5B] hover:bg-[#003D7A]"
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                >
                  {language === 'pt' ? 'Próxima' : 'Next'}
                </Button>
              ) : (
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    setActiveTest(null);
                    setCurrentQuestion(0);
                    setAnswers({});
                  }}
                >
                  {t('sim.submitTest')}
                </Button>
              )}
            </div>

            {/* Question Navigator */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">{language === 'pt' ? 'Navegação rápida' : 'Quick navigation'}</p>
              <div className="flex flex-wrap gap-2">
                {mockQuestions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-lg border-2 transition-colors ${
                      currentQuestion === index 
                        ? 'border-[#002B5B] bg-[#002B5B] text-white' 
                        : answers[mockQuestions[index].id]
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Teacher View
  if (user?.role === 'teacher' || user?.role === 'administrator') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">{t('sim.title')}</h1>
            <p className="text-gray-600">{t('sim.mySimulations')}</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#002B5B] hover:bg-[#003D7A] gap-2">
                <Plus className="h-4 w-4" />
                {t('sim.create')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{t('sim.create')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t('sim.name')}</Label>
                  <Input placeholder={t('sim.name')} />
                </div>
                <div>
                  <Label>{t('sim.description')}</Label>
                  <Textarea placeholder={t('sim.description')} rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('qbank.subject')}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('qbank.subject')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">{language === 'pt' ? 'Matemática' : 'Mathematics'}</SelectItem>
                        <SelectItem value="port">{language === 'pt' ? 'Português' : 'Portuguese'}</SelectItem>
                        <SelectItem value="sci">{language === 'pt' ? 'Ciências' : 'Science'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t('sim.numQuestions')}</Label>
                    <Input type="number" defaultValue={20} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>{t('sim.startDate')}</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>{t('sim.endDate')}</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>{t('sim.duration')}</Label>
                    <Input type="number" defaultValue={60} />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    {t('comm.cancel')}
                  </Button>
                  <Button className="bg-[#002B5B] hover:bg-[#003D7A]" onClick={() => setShowCreateDialog(false)}>
                    {t('sim.publish')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">{language === 'pt' ? 'Todos' : 'All'}</TabsTrigger>
            <TabsTrigger value="active">{t('sim.active')}</TabsTrigger>
            <TabsTrigger value="scheduled">{t('sim.scheduled')}</TabsTrigger>
            <TabsTrigger value="finished">{t('sim.finished')}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {simulations.map((sim) => (
              <Card key={sim.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg">{sim.name}</h3>
                        {getStatusBadge(sim.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{sim.description}</p>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">{language === 'pt' ? 'Início' : 'Start'}</p>
                            <p className="text-sm">{sim.startDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">{t('sim.duration')}</p>
                            <p className="text-sm">{sim.duration} min</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">{language === 'pt' ? 'Questões' : 'Questions'}</p>
                            <p className="text-sm">{sim.numQuestions}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-500">{language === 'pt' ? 'Participantes' : 'Participants'}</p>
                            <p className="text-sm">{sim.participants}</p>
                          </div>
                        </div>
                      </div>
                      {sim.avgScore && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg inline-block">
                          <span className="text-sm text-gray-600">{t('sim.classAverage')}: </span>
                          <span className="text-lg">{sim.avgScore.toFixed(1)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        {t('sim.results')}
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <BarChart3 className="h-4 w-4" />
                        {language === 'pt' ? 'Análise' : 'Analysis'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Student View
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t('sim.title')}</h1>
        <p className="text-gray-600">{language === 'pt' ? 'Minhas Provas e Simulados' : 'My Tests and Simulations'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studentSimulations.map((sim) => (
          <Card key={sim.id} className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg mb-2">{sim.name}</CardTitle>
                  {getStatusBadge(sim.status)}
                </div>
                {sim.completed && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{sim.description}</p>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">{language === 'pt' ? 'Início' : 'Start'}</p>
                  <p>{sim.startDate}</p>
                </div>
                <div>
                  <p className="text-gray-500">{t('sim.duration')}</p>
                  <p>{sim.duration} min</p>
                </div>
                <div>
                  <p className="text-gray-500">{language === 'pt' ? 'Questões' : 'Questions'}</p>
                  <p>{sim.numQuestions}</p>
                </div>
                {sim.score && (
                  <div>
                    <p className="text-gray-500">{t('sim.score')}</p>
                    <p className="text-lg text-green-600">{sim.score.toFixed(1)}</p>
                  </div>
                )}
              </div>

              {!sim.completed && sim.status === 'active' && (
                <Button 
                  className="w-full bg-[#002B5B] hover:bg-[#003D7A] gap-2"
                  onClick={() => setActiveTest(sim.id)}
                >
                  <Play className="h-4 w-4" />
                  {t('sim.takeTest')}
                </Button>
              )}

              {sim.completed && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    ✓ {language === 'pt' ? 'Prova concluída' : 'Test completed'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
