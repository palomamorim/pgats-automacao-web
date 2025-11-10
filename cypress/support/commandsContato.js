// Command para passar nome e email (iniciar novo cadastro)
Cypress.Commands.add('preencherFormularioContato', () => {
    cy.fixture("elementosLogin.json").then((el) => {

        cy.visitUrl("contact_us");
        cy.wait(1000);

        cy.get('[data-qa="name"]').type(el.camposCadastroUsuario.nomeUsuario);
        cy.get('[data-qa="email"]').type(el.camposCadastroUsuario.emailUsuario);
        cy.get('[data-qa="subject"]').type("Produto com valor divergente ao fechar carrinho");
        cy.get('[data-qa="message"]').type("O produto 'Blue Top' aparece com o valor de Rs. 500 na página de Produtos, mas ao encerrar carrinho aparece com o valor Rs. 600");
    
        cy.fixture("arquivoContato.png").as('imagem');        
        cy.get('input[type=file]').selectFile('@imagem');

        cy.get('[data-qa="submit-button"]').click();

        cy.get('.status').should('be.visible');
        cy.get('.status').should('have.text','Success! Your details have been submitted successfully.');
    
    })            
});
