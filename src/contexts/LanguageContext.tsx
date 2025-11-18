import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  // Login Screen
  'login.title': { en: 'Login to your account', pt: 'Entrar na sua conta' },
  'login.user': { en: 'User (CPF/Email)', pt: 'Usuário (CPF/Email)' },
  'login.password': { en: 'Password', pt: 'Senha' },
  'login.button': { en: 'Sign In', pt: 'Entrar' },
  'login.forgot': { en: 'Forgot Password', pt: 'Esqueci minha senha' },
  'login.welcome': { en: 'Welcome to AVALIA+', pt: 'Bem-vindo ao AVALIA+' },
  'login.subtitle': { en: 'Student Evaluation and Performance System', pt: 'Sistema de Avaliação e Desempenho do Aluno' },
  
  // Navigation
  'nav.dashboard': { en: 'Dashboard', pt: 'Painel' },
  'nav.academic': { en: 'Academic', pt: 'Acadêmico' },
  'nav.communication': { en: 'Communication', pt: 'Comunicação' },
  'nav.reports': { en: 'Reports', pt: 'Relatórios' },
  'nav.admin': { en: 'Administration', pt: 'Administração' },
  'nav.profile': { en: 'Profile', pt: 'Perfil' },
  'nav.logout': { en: 'Logout', pt: 'Sair' },
  
  // Dashboard
  'dashboard.welcome': { en: 'Welcome', pt: 'Bem-vindo' },
  'dashboard.overview': { en: 'Overview', pt: 'Visão Geral' },
  'dashboard.attendance': { en: 'Attendance', pt: 'Frequência' },
  'dashboard.grades': { en: 'Grades', pt: 'Notas' },
  'dashboard.announcements': { en: 'Announcements', pt: 'Avisos' },
  'dashboard.calendar': { en: 'Calendar', pt: 'Calendário' },
  'dashboard.students': { en: 'Students', pt: 'Alunos' },
  'dashboard.classes': { en: 'Classes', pt: 'Turmas' },
  'dashboard.average': { en: 'Average', pt: 'Média' },
  'dashboard.present': { en: 'Present', pt: 'Presente' },
  'dashboard.absent': { en: 'Absent', pt: 'Ausente' },
  'dashboard.viewAll': { en: 'View All', pt: 'Ver Tudo' },
  'dashboard.recentActivity': { en: 'Recent Activity', pt: 'Atividade Recente' },
  
  // Academic Module
  'academic.title': { en: 'Academic Management', pt: 'Gestão Acadêmica' },
  'academic.grades': { en: 'Grades', pt: 'Notas' },
  'academic.attendance': { en: 'Attendance', pt: 'Frequência' },
  'academic.reportCard': { en: 'Report Card', pt: 'Boletim' },
  'academic.performance': { en: 'Performance', pt: 'Desempenho' },
  'academic.subject': { en: 'Subject', pt: 'Disciplina' },
  'academic.grade': { en: 'Grade', pt: 'Nota' },
  'academic.status': { en: 'Status', pt: 'Situação' },
  'academic.approved': { en: 'Approved', pt: 'Aprovado' },
  'academic.failed': { en: 'Failed', pt: 'Reprovado' },
  'academic.inProgress': { en: 'In Progress', pt: 'Em Andamento' },
  'academic.registerGrades': { en: 'Register Grades', pt: 'Registrar Notas' },
  'academic.viewReport': { en: 'View Report', pt: 'Ver Relatório' },
  
  // Communication Module
  'comm.title': { en: 'Communication', pt: 'Comunicação' },
  'comm.messages': { en: 'Messages', pt: 'Mensagens' },
  'comm.inbox': { en: 'Inbox', pt: 'Caixa de Entrada' },
  'comm.sent': { en: 'Sent', pt: 'Enviadas' },
  'comm.compose': { en: 'Compose Message', pt: 'Nova Mensagem' },
  'comm.announcements': { en: 'Announcements', pt: 'Avisos' },
  'comm.sendMessage': { en: 'Send Message', pt: 'Enviar Mensagem' },
  'comm.recipient': { en: 'Recipient', pt: 'Destinatário' },
  'comm.subject': { en: 'Subject', pt: 'Assunto' },
  'comm.message': { en: 'Message', pt: 'Mensagem' },
  'comm.send': { en: 'Send', pt: 'Enviar' },
  'comm.cancel': { en: 'Cancel', pt: 'Cancelar' },
  
  // Reports Module
  'reports.title': { en: 'Reports & Analytics', pt: 'Relatórios e Análises' },
  'reports.generate': { en: 'Generate Report', pt: 'Gerar Relatório' },
  'reports.export': { en: 'Export', pt: 'Exportar' },
  'reports.class': { en: 'Class', pt: 'Turma' },
  'reports.teacher': { en: 'Teacher', pt: 'Professor' },
  'reports.student': { en: 'Student', pt: 'Aluno' },
  'reports.period': { en: 'Period', pt: 'Período' },
  'reports.type': { en: 'Report Type', pt: 'Tipo de Relatório' },
  'reports.academicPerformance': { en: 'Academic Performance', pt: 'Desempenho Acadêmico' },
  'reports.attendanceReport': { en: 'Attendance Report', pt: 'Relatório de Frequência' },
  'reports.generalReport': { en: 'General Report', pt: 'Relatório Geral' },
  'reports.exportPDF': { en: 'Export as PDF', pt: 'Exportar como PDF' },
  'reports.exportExcel': { en: 'Export as Excel', pt: 'Exportar como Excel' },
  
  // Profile
  'profile.title': { en: 'User Profile', pt: 'Perfil do Usuário' },
  'profile.personalInfo': { en: 'Personal Information', pt: 'Informações Pessoais' },
  'profile.name': { en: 'Name', pt: 'Nome' },
  'profile.email': { en: 'Email', pt: 'E-mail' },
  'profile.role': { en: 'Role', pt: 'Função' },
  'profile.language': { en: 'Language', pt: 'Idioma' },
  'profile.save': { en: 'Save Changes', pt: 'Salvar Alterações' },
  
  // Evaluation System (NEW)
  'eval.title': { en: 'Student Evaluation', pt: 'Avaliação do Aluno' },
  'eval.studentProfile': { en: 'Student Profile', pt: 'Perfil do Aluno' },
  'eval.uploadPhoto': { en: 'Upload Photo', pt: 'Enviar Foto' },
  'eval.changePhoto': { en: 'Change Photo', pt: 'Alterar Foto' },
  'eval.selectEmoji': { en: 'Select Performance Level', pt: 'Selecionar Nível de Desempenho' },
  'eval.addComments': { en: 'Add Comments', pt: 'Adicionar Comentários' },
  'eval.saveEvaluation': { en: 'Save Evaluation', pt: 'Salvar Avaliação' },
  'eval.viewHistory': { en: 'View History', pt: 'Ver Histórico' },
  'eval.generateReport': { en: 'Generate Report', pt: 'Gerar Relatório' },
  'eval.performanceReport': { en: 'Performance Report', pt: 'Relatório de Desempenho' },
  'eval.evolutionTrend': { en: 'Evolution Trend', pt: 'Tendência de Evolução' },
  'eval.improved': { en: 'Improved', pt: 'Melhorou' },
  'eval.maintained': { en: 'Maintained', pt: 'Manteve' },
  'eval.declined': { en: 'Declined', pt: 'Piorou' },
  'eval.noEvaluation': { en: 'No evaluation yet', pt: 'Sem avaliação ainda' },
  
  // Evaluation Criteria
  'criteria.accessibility': { en: 'Accessibility', pt: 'Acessibilidade' },
  'criteria.participation': { en: 'Participation', pt: 'Participação' },
  'criteria.responsibility': { en: 'Responsibility', pt: 'Responsabilidade' },
  'criteria.sociability': { en: 'Sociability', pt: 'Sociabilidade' },
  'criteria.accessibility.desc': { en: 'Presence and punctuality', pt: 'Presença e pontualidade' },
  'criteria.participation.desc': { en: 'Engagement in classes and activities', pt: 'Engajamento nas aulas e atividades' },
  'criteria.responsibility.desc': { en: 'Completion of tasks and commitments', pt: 'Cumprimento de tarefas e compromissos' },
  'criteria.sociability.desc': { en: 'Respect, cooperation, and coexistence', pt: 'Respeito, convivência e cooperação' },
  
  // Emoji Levels
  'level.veryLow': { en: 'Very Low', pt: 'Muito Baixo' },
  'level.needsImprovement': { en: 'Needs Improvement', pt: 'Precisa Melhorar' },
  'level.good': { en: 'Good', pt: 'Bom' },
  'level.excellent': { en: 'Excellent', pt: 'Excelente' },
  
  // Admin
  'admin.title': { en: 'Administration Panel', pt: 'Painel Administrativo' },
  'admin.users': { en: 'User Management', pt: 'Gestão de Usuários' },
  'admin.classes': { en: 'Class Management', pt: 'Gestão de Turmas' },
  'admin.schedules': { en: 'Schedules', pt: 'Horários' },
  'admin.addUser': { en: 'Add User', pt: 'Adicionar Usuário' },
  'admin.editUser': { en: 'Edit User', pt: 'Editar Usuário' },
  'admin.deleteUser': { en: 'Delete User', pt: 'Excluir Usuário' },
  
  // Roles
  'role.administrator': { en: 'Administrator', pt: 'Administrador' },
  'role.teacher': { en: 'Teacher', pt: 'Professor' },
  'role.student': { en: 'Student', pt: 'Aluno' },
  'role.parent': { en: 'Parent/Guardian', pt: 'Pai/Responsável' },
  'role.secretary': { en: 'Secretary', pt: 'Secretário' },
  
  // Common
  'common.search': { en: 'Search', pt: 'Pesquisar' },
  'common.filter': { en: 'Filter', pt: 'Filtrar' },
  'common.date': { en: 'Date', pt: 'Data' },
  'common.actions': { en: 'Actions', pt: 'Ações' },
  'common.view': { en: 'View', pt: 'Ver' },
  'common.edit': { en: 'Edit', pt: 'Editar' },
  'common.delete': { en: 'Delete', pt: 'Excluir' },
  'common.save': { en: 'Save', pt: 'Salvar' },
  'common.close': { en: 'Close', pt: 'Fechar' },
  'common.loading': { en: 'Loading...', pt: 'Carregando...' },
  'common.noData': { en: 'No data available', pt: 'Nenhum dado disponível' },
  
  // Question Bank Module (NEW)
  'qbank.title': { en: 'Question Bank', pt: 'Banco de Questões' },
  'qbank.addQuestion': { en: 'Add Question', pt: 'Cadastrar Questão' },
  'qbank.myQuestions': { en: 'My Questions', pt: 'Minhas Questões' },
  'qbank.sharedQuestions': { en: 'Shared Questions', pt: 'Questões Compartilhadas' },
  'qbank.subject': { en: 'Subject', pt: 'Disciplina' },
  'qbank.topic': { en: 'Topic', pt: 'Tópico' },
  'qbank.difficulty': { en: 'Difficulty', pt: 'Dificuldade' },
  'qbank.type': { en: 'Question Type', pt: 'Tipo de Questão' },
  'qbank.question': { en: 'Question', pt: 'Questão' },
  'qbank.answer': { en: 'Answer', pt: 'Resposta' },
  'qbank.correctAnswer': { en: 'Correct Answer', pt: 'Resposta Correta' },
  'qbank.explanation': { en: 'Explanation', pt: 'Explicação' },
  'qbank.visibility': { en: 'Visibility', pt: 'Visibilidade' },
  'qbank.private': { en: 'Private', pt: 'Privada' },
  'qbank.shared': { en: 'Shared', pt: 'Compartilhada' },
  
  // Difficulty Levels
  'difficulty.easy': { en: 'Easy', pt: 'Fácil' },
  'difficulty.medium': { en: 'Medium', pt: 'Médio' },
  'difficulty.hard': { en: 'Hard', pt: 'Difícil' },
  
  // Question Types
  'qtype.multipleChoice': { en: 'Multiple Choice', pt: 'Múltipla Escolha' },
  'qtype.trueFalse': { en: 'True or False', pt: 'Verdadeiro ou Falso' },
  'qtype.shortAnswer': { en: 'Short Answer', pt: 'Resposta Curta' },
  
  // Simulation Module (NEW)
  'sim.title': { en: 'Simulations', pt: 'Simulados' },
  'sim.create': { en: 'Create Simulation', pt: 'Criar Simulado' },
  'sim.mySimulations': { en: 'My Simulations', pt: 'Meus Simulados' },
  'sim.active': { en: 'Active', pt: 'Ativo' },
  'sim.scheduled': { en: 'Scheduled', pt: 'Agendado' },
  'sim.finished': { en: 'Finished', pt: 'Finalizado' },
  'sim.name': { en: 'Simulation Name', pt: 'Nome do Simulado' },
  'sim.description': { en: 'Description', pt: 'Descrição' },
  'sim.startDate': { en: 'Start Date', pt: 'Data de Início' },
  'sim.endDate': { en: 'End Date', pt: 'Data de Término' },
  'sim.duration': { en: 'Duration (minutes)', pt: 'Duração (minutos)' },
  'sim.numQuestions': { en: 'Number of Questions', pt: 'Número de Questões' },
  'sim.selectQuestions': { en: 'Select Questions', pt: 'Selecionar Questões' },
  'sim.preview': { en: 'Preview', pt: 'Visualizar' },
  'sim.publish': { en: 'Publish', pt: 'Publicar' },
  'sim.results': { en: 'Results', pt: 'Resultados' },
  'sim.takeTest': { en: 'Take Test', pt: 'Fazer Prova' },
  'sim.submitTest': { en: 'Submit Test', pt: 'Enviar Prova' },
  'sim.timeRemaining': { en: 'Time Remaining', pt: 'Tempo Restante' },
  'sim.score': { en: 'Score', pt: 'Pontuação' },
  'sim.questionsAnswered': { en: 'Questions Answered', pt: 'Questões Respondidas' },
  'sim.classAverage': { en: 'Class Average', pt: 'Média da Turma' },
  'sim.successRate': { en: 'Success Rate', pt: 'Taxa de Acerto' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    return translation ? translation[language] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}