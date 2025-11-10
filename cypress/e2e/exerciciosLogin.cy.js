/// <reference types="cypress" />
import "../support/commands";

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visitUrl("login");
        cy.wait(1000);
    });
    it('Teste 1 - Cadastro de usuário', () => {    
        cy.loginDeCadastro();
        cy.preencherFormularioCadastro();

    });  

    it('Teste 2 - Login de usuário com e-mail e senha corretos', () => {
        cy.fixture("elementosLogin.json").then((el) => {
            const senhaCorreta = el.camposCadastroUsuario.senhaUsuario;
            const emailUsuario = el.camposCadastroUsuario.emailUsuario;

            cy.login(emailUsuario, senhaCorreta, true);   
        });              
    });

    it('Teste 3 - Login de usuário com e-mail e senha incorretos', () => {
        cy.fixture("elementosLogin.json").then((el) => {
            const senhaInvalida = el.camposCadastroUsuario.senhaInvalidaUsuario;
            const emailUsuario = el.camposCadastroUsuario.emailUsuario;

            cy.login(emailUsuario, senhaInvalida, false);   
        });
    })

    it('Teste 4 - Logout de usuário', () => { 
        cy.fixture("elementosLogin.json").then((el) => {
            const senhaCorreta = el.camposCadastroUsuario.senhaUsuario;
            const emailUsuario = el.camposCadastroUsuario.emailUsuario;
            
            cy.login(emailUsuario, senhaCorreta, true);
            cy.wait(2000);
            
            //logout
            cy.get('a[href="/logout"]').should('be.visible').click();
            cy.url().should('contain', 'login');
        });
    })

    it('Teste 5 - Cadastro de usuário com e-mail existente no sistema', () => {   
        cy.loginDeCadastroEmailDuplicado();

    });  
})
