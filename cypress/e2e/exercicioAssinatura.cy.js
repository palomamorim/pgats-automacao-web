/// <reference types="cypress" />
import "../support/commands";

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visitUrl();        
        cy.get('.logo').should('be.visible');
        cy.contains('Full-Fledged practice website for Automation Engineers'); 
        cy.wait(1000);
       
    });
    it('Teste 10 - Cadastrar assinatura', () => {        
        cy.cadastrarAssinatura();

    }); 

});