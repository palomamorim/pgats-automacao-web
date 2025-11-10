/// <reference types="cypress" />
import "../support/commands";

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visitUrl();        
        cy.get('.logo').should('be.visible');
        cy.contains('Full-Fledged practice website for Automation Engineers'); 
        cy.wait(1000);

        cy.visitUrl('login');
    });
    
    it('Teste 15 - Cadastro de usuário', () => {  
        //Criar conta e valida nome usuário
        cy.loginDeCadastro();
        cy.preencherFormularioCadastro();

        cy.adicionarProdutoCarrinho();
        //cy.excluirCadastro();





    });  
  
})
