import { faker } from '@faker-js/faker'

// Command para iniciar processo de cadastro
Cypress.Commands.add('cadastrarAssinatura', () => {
    const primeiroNome = faker.person.firstName();
    const sobrenome = faker.person.lastName();

    // Rolagem da página
    cy.get('footer').scrollIntoView();    
    // campo de assinatura
    cy.get('.single-widget h2').should('have.text', 'Subscription');
            
    cy.get('#susbscribe_email').type(`${primeiroNome}_${sobrenome}@test.com`);    
    cy.get('#subscribe').click();
    
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!');

});