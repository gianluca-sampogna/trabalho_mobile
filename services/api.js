// Configuração do Firebase Authentication (Projeto na nuvem: trab-mobile-uvv-gs26)
const FIREBASE_API_KEY = 'AIzaSyCPLtMaggKsO8uMA5R9_8ecNOxcVQsSUCE';
const FIREBASE_AUTH_BASE_URL = 'https://identitytoolkit.googleapis.com/v1';

// API RESTful Pública para operações de CRUD
const PUBLIC_CRUD_API_URL = 'https://dummyjson.com';

let categoriesCache = ['Desenvolvimento', 'Design', 'Testes', 'Gestão', 'Infraestrutura'];
let tasksCache = null;
let reportsCache = null;
let notificationsCache = null;
let feedbacksCache = null;
let registeredFirebaseUsersCount = 0;

function mapFirebaseError(errorCode) {
  switch (errorCode) {
    case 'EMAIL_EXISTS':
      return 'Este e-mail já está cadastrado na nuvem.';
    case 'INVALID_EMAIL':
      return 'O formato do e-mail é inválido.';
    case 'WEAK_PASSWORD : Password should be at least 6 characters':
    case 'WEAK_PASSWORD':
      return 'A senha deve ter pelo menos 6 caracteres.';
    case 'INVALID_LOGIN_CREDENTIALS':
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
      return 'E-mail ou senha incorretos.';
    default:
      return errorCode || 'Ocorreu um erro na comunicação com o servidor.';
  }
}

export const api = {
  // ==========================================
  // 1. AUTENTICAÇÃO E PERFIL NA NUVEM (Firebase Auth REST)
  // ==========================================
  registerUser: async ({ name, email, password }) => {
    const signUpRes = await fetch(
      `${FIREBASE_AUTH_BASE_URL}/accounts:signUp?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          returnSecureToken: true,
        }),
      }
    );

    const signUpData = await signUpRes.json();
    if (!signUpRes.ok) {
      throw new Error(mapFirebaseError(signUpData?.error?.message));
    }

    if (name) {
      await fetch(
        `${FIREBASE_AUTH_BASE_URL}/accounts:update?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken: signUpData.idToken,
            displayName: name.trim(),
            returnSecureToken: true,
          }),
        }
      );
    }

    registeredFirebaseUsersCount += 1;

    return {
      uid: signUpData.localId,
      email: signUpData.email,
      name: name.trim(),
      idToken: signUpData.idToken,
    };
  },

  loginUser: async (email, password) => {
    const res = await fetch(
      `${FIREBASE_AUTH_BASE_URL}/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw new Error(mapFirebaseError(data?.error?.message));
    }

    return {
      uid: data.localId,
      email: data.email,
      name: data.displayName || data.email.split('@')[0],
      idToken: data.idToken,
    };
  },

  updateUserProfile: async ({ idToken, name, email }) => {
    if (idToken) {
      const res = await fetch(
        `${FIREBASE_AUTH_BASE_URL}/accounts:update?key=${FIREBASE_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken,
            displayName: name.trim(),
            returnSecureToken: true,
          }),
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(mapFirebaseError(errData?.error?.message));
      }
    }
    return { name: name.trim(), email: email.trim() };
  },

  // ==========================================
  // 2. CRUD DE TAREFAS (DummyJSON /todos)
  // ==========================================
  getTasks: async () => {
    if (tasksCache !== null) {
      return [...tasksCache];
    }

    const res = await fetch(`${PUBLIC_CRUD_API_URL}/todos?limit=6`);
    if (!res.ok) {
      throw new Error('Falha ao buscar tarefas da API pública.');
    }
    const data = await res.json();

    tasksCache = (data.todos || []).map((item, index) => ({
      id: String(item.id),
      title: item.todo,
      category: categoriesCache[index % categoriesCache.length],
      status: item.completed ? 'Concluído' : 'Pendente',
    }));

    return [...tasksCache];
  },

  addTask: async (task) => {
    await api.getTasks();

    const res = await fetch(`${PUBLIC_CRUD_API_URL}/todos/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: task.title,
        completed: task.status === 'Concluído',
        userId: 1,
      }),
    });

    if (!res.ok) {
      throw new Error('Falha ao criar tarefa na API pública.');
    }

    const created = await res.json();
    const newTask = {
      id: String(Date.now()),
      remoteId: created.id,
      title: task.title,
      category: task.category || 'Desenvolvimento',
      status: task.status || 'Pendente',
    };

    tasksCache = [newTask, ...tasksCache];
    return newTask;
  },

  updateTask: async (id, updatedFields) => {
    await api.getTasks();

    const numericId = Number(id) <= 150 ? Number(id) : 1;
    const res = await fetch(`${PUBLIC_CRUD_API_URL}/todos/${numericId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: updatedFields.title,
        completed: updatedFields.status === 'Concluído',
      }),
    });

    if (!res.ok) {
      throw new Error('Falha ao atualizar tarefa na API pública.');
    }

    tasksCache = tasksCache.map((t) =>
      t.id === String(id) ? { ...t, ...updatedFields } : t
    );

    return tasksCache.find((t) => t.id === String(id));
  },

  deleteTask: async (id) => {
    await api.getTasks();

    const numericId = Number(id) <= 150 ? Number(id) : 1;
    const res = await fetch(`${PUBLIC_CRUD_API_URL}/todos/${numericId}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Falha ao excluir tarefa na API pública.');
    }

    tasksCache = tasksCache.filter((t) => t.id !== String(id));
    return true;
  },

  // ==========================================
  // 3. CRUD DE CATEGORIAS (DummyJSON /posts + Estado)
  // ==========================================
  getCategories: async () => {
    return [...categoriesCache];
  },

  addCategory: async (name) => {
    await fetch(`${PUBLIC_CRUD_API_URL}/posts/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: name, userId: 1 }),
    });
    const trimmed = name.trim();
    if (!categoriesCache.includes(trimmed)) {
      categoriesCache = [...categoriesCache, trimmed];
    }
    return [...categoriesCache];
  },

  deleteCategory: async (name) => {
    await fetch(`${PUBLIC_CRUD_API_URL}/posts/1`, { method: 'DELETE' });
    categoriesCache = categoriesCache.filter((c) => c !== name);
    return [...categoriesCache];
  },

  // ==========================================
  // 4. CRUD DE RELATÓRIOS (DummyJSON /posts)
  // ==========================================
  getReports: async () => {
    if (reportsCache !== null) {
      return [...reportsCache];
    }
    const res = await fetch(`${PUBLIC_CRUD_API_URL}/posts?limit=3`);
    const data = await res.json();
    reportsCache = (data.posts || []).map((p) => ({
      id: String(p.id),
      title: p.title,
    }));
    return [...reportsCache];
  },

  addReport: async (title) => {
    await api.getReports();
    await fetch(`${PUBLIC_CRUD_API_URL}/posts/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, userId: 1 }),
    });
    const newItem = { id: String(Date.now()), title: title.trim() };
    reportsCache = [newItem, ...reportsCache];
    return [...reportsCache];
  },

  deleteReport: async (id) => {
    await api.getReports();
    await fetch(`${PUBLIC_CRUD_API_URL}/posts/1`, { method: 'DELETE' });
    reportsCache = reportsCache.filter((r) => r.id !== String(id));
    return [...reportsCache];
  },

  // ==========================================
  // 5. CRUD DE NOTIFICAÇÕES (DummyJSON /comments)
  // ==========================================
  getNotifications: async () => {
    if (notificationsCache !== null) {
      return [...notificationsCache];
    }
    const res = await fetch(`${PUBLIC_CRUD_API_URL}/comments?limit=3`);
    const data = await res.json();
    notificationsCache = (data.comments || []).map((c) => ({
      id: String(c.id),
      text: c.body,
      read: false,
    }));
    return [...notificationsCache];
  },

  addNotification: async (text) => {
    await api.getNotifications();
    await fetch(`${PUBLIC_CRUD_API_URL}/comments/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: text, postId: 1, userId: 1 }),
    });
    const newItem = { id: String(Date.now()), text: text.trim(), read: false };
    notificationsCache = [newItem, ...notificationsCache];
    return [...notificationsCache];
  },

  toggleNotificationRead: async (id) => {
    await api.getNotifications();
    await fetch(`${PUBLIC_CRUD_API_URL}/comments/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: 'Updated status' }),
    });
    notificationsCache = notificationsCache.map((n) =>
      n.id === String(id) ? { ...n, read: !n.read } : n
    );
    return [...notificationsCache];
  },

  deleteNotification: async (id) => {
    await api.getNotifications();
    await fetch(`${PUBLIC_CRUD_API_URL}/comments/1`, { method: 'DELETE' });
    notificationsCache = notificationsCache.filter((n) => n.id !== String(id));
    return [...notificationsCache];
  },

  // ==========================================
  // 6. CRUD DE FEEDBACKS / SOBRE (DummyJSON /quotes)
  // ==========================================
  getFeedbacks: async () => {
    if (feedbacksCache !== null) {
      return [...feedbacksCache];
    }
    const res = await fetch(`${PUBLIC_CRUD_API_URL}/quotes?limit=2`);
    const data = await res.json();
    feedbacksCache = (data.quotes || []).map((q) => ({
      id: String(q.id),
      text: q.quote,
    }));
    return [...feedbacksCache];
  },

  addFeedback: async (text) => {
    await api.getFeedbacks();
    await fetch(`${PUBLIC_CRUD_API_URL}/posts/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: text, userId: 1 }),
    });
    const newItem = { id: String(Date.now()), text: text.trim() };
    feedbacksCache = [newItem, ...feedbacksCache];
    return [...feedbacksCache];
  },

  deleteFeedback: async (id) => {
    await api.getFeedbacks();
    await fetch(`${PUBLIC_CRUD_API_URL}/posts/1`, { method: 'DELETE' });
    feedbacksCache = feedbacksCache.filter((f) => f.id !== String(id));
    return [...feedbacksCache];
  },

  // ==========================================
  // 7. DASHBOARD STATS (GET)
  // ==========================================
  getUsersCount: async () => {
    try {
      const res = await fetch(`${PUBLIC_CRUD_API_URL}/users?limit=1`);
      const data = await res.json();
      return (data.total || 0) + registeredFirebaseUsersCount;
    } catch {
      return 2 + registeredFirebaseUsersCount;
    }
  },

  getCategoryStats: async () => {
    const tasks = await api.getTasks();
    return tasks.reduce((acc, task) => {
      const cat = task.category || 'Outros';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});
  },
};
