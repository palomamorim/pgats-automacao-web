import "./commandsLogin"
import "./commandsContato"
import "./commandsProdutos"
import "./commandsAssinatura"

// Command para acessar a home de Automation Exercises e suas subpaginas
Cypress.Commands.add('visitUrl', (pagina) => {
    const baseUrl = Cypress.config('baseUrl');
    const fullUrl = `${baseUrl}/${pagina}`;
    cy.visit(fullUrl, {failOnStatusCOde: false});

});
