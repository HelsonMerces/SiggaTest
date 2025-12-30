const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const emailError = document.getElementById('email-error');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const passwordError = document.getElementById('password-error');

const itemNameInput = document.getElementById('item-name');
const addItemBtn = document.getElementById('add-item-btn');
const itemList = document.getElementById('item-list');

// ---------- Sessão ----------
function isLogged() {
  return localStorage.getItem('logged') === 'true';
}

function showApp() {
  loginSection.style.display = 'none';
  appSection.style.display = 'block';
}

function showLogin() {
  loginSection.style.display = 'block';
  appSection.style.display = 'none';
}

// ---------- Login ----------
loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // regex simples para validar @test.com
  const emailValido = /^[a-zA-Z0-9._%+-]+@test\.com$/.test(email);

  // valida email
  if (!emailValido) {
    emailError.style.display = 'block';
    return;
  } else {
    emailError.style.display = 'none';
  }

  // valida senha (mínimo 3 caracteres)
  if (password.length < 3) {
    passwordError.style.display = 'block';
    return;
  } else {
    passwordError.style.display = 'none';
  }

  // login ok
  localStorage.setItem('logged', 'true');
  showApp();
  renderItems();
});

// ---------- Logout ----------
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('logged');

  emailInput.value = '';
  passwordInput.value = '';
  emailError.style.display = 'none';
  passwordError.style.display = 'none';

  showLogin();
});

// ---------- CRUD ----------
function getItems() {
  return JSON.parse(localStorage.getItem('items') || '[]');
}

function saveItems(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

function renderItems() {
  itemList.innerHTML = '';
  getItems().forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item}</span>
      <button data-index="${index}">Excluir</button>
    `;
    itemList.appendChild(li);
  });
}

addItemBtn.addEventListener('click', () => {
  if (!itemNameInput.value) return;

  const items = getItems();
  items.push(itemNameInput.value);
  saveItems(items);

  itemNameInput.value = '';
  renderItems();
});

itemList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const index = event.target.dataset.index;
    const items = getItems();
    items.splice(index, 1);
    saveItems(items);
    renderItems();
  }
});

// ---------- Init ----------
if (isLogged()) {
  showApp();
  renderItems();
} else {
  showLogin();
}
