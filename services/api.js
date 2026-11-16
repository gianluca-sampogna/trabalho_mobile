// Mock API service for CRUD operations
let mockTasks = [
  { id: '1', title: 'Implementar Navegação', category: 'Desenvolvimento', status: 'Pendente' },
  { id: '2', title: 'Criar Telas Obrigatórias', category: 'Design', status: 'Concluído' },
  { id: '3', title: 'Testar i18n Context', category: 'Testes', status: 'Pendente' },
];

let mockUsers = [
  { id: '1', name: 'Daniel Alves', email: 'daniel@uvv.br' },
  { id: '2', name: 'Ana Silva', email: 'ana@uvv.br' },
];

export const api = {
  getTasks: async () => mockTasks,
  addTask: async (task) => {
    const newTask = { id: String(Date.now()), ...task };
    mockTasks.push(newTask);
    return newTask;
  },
  deleteTask: async (id) => {
    mockTasks = mockTasks.filter(t => t.id !== id);
    return true;
  },
  getUsersCount: async () => mockUsers.length,
  getCategoryStats: async () => ({
    Desenvolvimento: 5,
    Design: 3,
    Testes: 4,
  })
};
