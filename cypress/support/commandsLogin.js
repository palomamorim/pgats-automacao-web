import { gerarNumeroAleatorio } from "./helpers";
import { faker } from '@faker-js/faker'

// Command para iniciar processo de cadastro
Cypress.Commands.add('loginDeCadastro', () => {
     cy.fixture("elementosLogin.json").then((el) => {
        const numeracao = gerarNumeroAleatorio(); 
        const loginUsuario = el.camposCadastroUsuario.usuario;

        cy.wait(1000);
        cy.get('[data-qa="signup-name"]').type(el.camposCadastroUsuario.nomeUsuario);
        cy.get('[data-qa="signup-email"]').type(`${loginUsuario}${numeracao}@test.com`);

        cy.contains('button', 'Signup').click();        
    });       
});

// Command para iniciar processo de cadastro (valida e-mail já existente)
Cypress.Commands.add('loginDeCadastroEmailDuplicado', () => {
     cy.fixture("elementosLogin.json").then((el) => {       
        cy.wait(1000);
        cy.get('[data-qa="signup-name"]').type(faker.person.fullName());
        cy.get('[data-qa="signup-email"]').type(el.camposCadastroUsuario.emailUsuario);

        cy.contains('button', 'Signup').click();    
        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!');       
    });       
});

// Command de preenchimento do formulário de criação de usuário
Cypress.Commands.add('preencherFormularioCadastro', () => {   
     cy.fixture("elementosLogin.json").then((el) => {
        cy.get('#id_gender1').check();

        cy.get('input#password').type(el.camposCadastroUsuario.senhaUsuario, {log: false});

        cy.get('select[data-qa=days]').select('2');
        cy.get('select[data-qa=months]').select('February');
        cy.get('select[data-qa=years]').select('1993');

        cy.get('input[type=checkbox]#newsletter').check();
        cy.get('input[type=checkbox]#optin').check();

        cy.get('input#first_name').type(el.camposCadastroUsuario.primeiroNome);
        cy.get('input#last_name').type(el.camposCadastroUsuario.sobrenome);
        cy.get('input#company').type(faker.company.name());
            cy.get('input#address1').type('Av. Amarelinha, 2050');
        cy.get('select#country').select('United States');
        cy.get('input#state').type(faker.location.state());
        cy.get('input#city').type(faker.location.city());
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('523 125 856');

        // Act
        cy.get('[data-qa="create-account"]').click();

        // Assert
        cy.url().should('includes', 'account_created');
        cy.contains('b', 'Account Created!');
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
     });    
});

// Command para login do usuário
Cypress.Commands.add('login', (emailUsuario, senhaUsuario, validacao = true) => {
    cy.fixture("elementosLogin.json").then((el) => {

        cy.get('[data-qa="login-email"]').type(emailUsuario);
        cy.get('[data-qa="login-password"]').type(senhaUsuario);

        cy.get('[data-qa="login-button"').click();

        // valida = true para login correto e valida = false para login incorreto
        if(!validacao){
            cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!'); 

        } else {
            cy.get('i.fa-user').parent().should('contain', el.camposCadastroUsuario.primeiroNome);
            cy.contains('b', el.camposCadastroUsuario.primeiroNome);  
        }
    });    
})

// Command para excluir cadastro
Cypress.Commands.add('excluirCadastro', () => {
    cy.get('a[href="/delete_account"]').click();    
    cy.get('h2[data-qa="account-deleted"]').should('contain', 'Account Deleted!');
    cy.contains('Account Deleted!');
      
});