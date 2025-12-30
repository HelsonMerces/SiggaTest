describe('CRUD Web - Fluxos E2E', () => {

  beforeEach(() => {
    // Garante ambiente limpo entre os testes
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('Teste 1 - Login, criar item, validar, excluir e logout', () => {
    // 🔐 Login
    cy.get('#email').type('qa@test.com');
    cy.get('#password').type('123456');
    cy.get('#login-btn').click();
    
    // ⏱️ pausa visual pós login
    cy.contains('Dashboard').should('be.visible');
    cy.wait(1500);
    
    // ➕ Criar item
    cy.get('#item-name')
      .type('Item Único')
      .should('have.value', 'Item Único');
    
    cy.get('#add-item-btn').click();
    
    // ✅ Validar item criado
    cy.contains('Item Único').should('be.visible');
    
    // ❌ Excluir item
    cy.contains('Item Único')
      .parent()
      .find('button')
      .click();
    
    // ✅ Validar exclusão
    cy.contains('Item Único').should('not.exist');
    
    // 🚪 Logout
    cy.get('#logout-btn').click();
    
    // ✅ Validação pós logout
    cy.contains('Login').should('be.visible');
    cy.get('#email').should('have.value', '');
    cy.get('#password').should('have.value', '');
  });

  it('Teste 2 - Persistência: criar 2 itens, excluir 1, logout e validar após novo login', () => {
  // 🔐 Login
  cy.get('#email').type('qa@test.com');
  cy.get('#password').type('123456');
  cy.get('#login-btn').click();

  cy.contains('Dashboard').should('be.visible');
  cy.wait(1500);

  // ➕ Criar Item A
  cy.get('#item-name').type('Item A');
  cy.get('#add-item-btn').click();

  // ➕ Criar Item B
  cy.get('#item-name').type('Item B');
  cy.get('#add-item-btn').click();

  // ✅ Validar os dois itens
  cy.contains('Item A').should('be.visible');
  cy.contains('Item B').should('be.visible');

  // ❌ Excluir apenas o Item A
  cy.contains('Item A')
    .parent()
    .find('button')
    .click();

  // ✅ Validar exclusão e persistência parcial
  cy.contains('Item A').should('not.exist');
  cy.contains('Item B').should('be.visible');

  // 🚪 Logout
  cy.get('#logout-btn').click();
  cy.contains('Login').should('be.visible');

  // 🔁 Login novamente
  cy.get('#email').type('qa@test.com');
  cy.get('#password').type('123456');
  cy.get('#login-btn').click();

  cy.contains('Dashboard').should('be.visible');
  cy.wait(1500);

  // ✅ Validar que Item B persistiu
  cy.contains('Item B').should('be.visible');
  cy.contains('Item A').should('not.exist');

  // 🚪 Logout final (FECHAMENTO DO TESTE)
  cy.get('#logout-btn').click();
  cy.contains('Login').should('be.visible');
});

it('Teste 3 - Não deve permitir login com email inválido', () => {
  cy.visit('/');

  // ❌ Email inválido (somente números)
  cy.get('#email').type('123456');
  cy.get('#password').type('123456');

  cy.get('#login-btn').click();

  // ✅ Valida mensagem de erro
  cy.contains('Email inválido. Use um email @test.com')
    .should('be.visible');

  // ✅ Garante que não entrou no sistema
  cy.contains('Dashboard').should('not.be.visible');
})
it('Teste 4 - Não deve permitir login com senha menor que 3 caracteres', () => {
  cy.visit('/');

  // 🔐 Email válido
  cy.get('#email').type('qa@test.com');

  // ❌ Senha inválida (menos de 3 caracteres)
  cy.get('#password').type('12');

  // 👉 Tenta logar
  cy.get('#login-btn').click();

  // ✅ Valida mensagem de erro da senha
  cy.contains('A senha deve conter no mínimo 3 caracteres.')
    .should('be.visible');

  // ✅ Garante que não entrou no sistema
  cy.contains('Dashboard').should('not.be.visible');
});
});