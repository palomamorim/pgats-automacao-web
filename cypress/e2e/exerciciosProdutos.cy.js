/// <reference types="cypress" />
import "../support/commands";

describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visitUrl();        
        cy.get('.logo').should('be.visible');
        cy.contains('Full-Fledged practice website for Automation Engineers'); 
        cy.wait(1000);

        cy.visitUrl('products');
        cy.get('.title.text-center').should('have.text', 'All Products');  
        cy.wait(1000);
       
    });
    it('Teste 8 - Navegue pela página de produtos e verifique no detalhe', () => {  
        cy.acessarInformacoesProduto();

    }); 

    it('Teste 9 - Busque um produto pelo filtro de pesquisa', () => {   
        cy.buscarProdutoPorFiltro('sleeveless');
    });   

});
