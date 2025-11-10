import { faker } from '@faker-js/faker'

Cypress.Commands.add('acessarInformacoesProduto', () => {
    cy.visitUrl('products');
    cy.get('.title.text-center').should('have.text', 'All Products');  
    cy.wait(1000);

    // verifica se listagem de produtos está aparecendo na tela
    cy.get('.features_items').should('be.visible');
    // clica no primeiro produto que aparece na lista
    cy.get('a[href="/product_details/1"]').should('be.visible').click();

    // verifica informações sobre produto
    cy.get('.product-information h2').should('be.visible');
    cy.get('.product-information p').contains('Category').should('be.visible');
    cy.get('.product-information span span').should('be.visible');
    cy.get('.product-information p').contains('Availability').should('be.visible');
    cy.get('.product-information p').contains('Condition').should('be.visible');
    cy.get('.product-information p').contains('Brand').should('be.visible');              
});

Cypress.Commands.add('buscarProdutoPorFiltro', (procurarPor) => {  
    cy.visitUrl('products');
    cy.get('.title.text-center').should('have.text', 'All Products');  
    cy.wait(1000);

    // Filtro de pesquisa
    cy.get('#search_product').type(procurarPor);
    cy.get('#submit_search').click();
    
    cy.get('.title.text-center').should('have.text', 'Searched Products');
    cy.get('.features_items').should('be.visible');    
                        
    cy.get('.productinfo').each(($product) => {
        const produtoPesquisado = $product.find('p').first().text();
        cy.log('Produto encontrado:', produtoPesquisado);
        cy.wrap($product).should('be.visible');   
    });  
})

Cypress.Commands.add('adicionarProdutoCarrinho', () => { 
    cy.fixture("elementosLogin.json").then((el) => {     
        // Filtro de pesquisa
        cy.buscarProdutoPorFiltro('sleeveless');

        cy.get('.single-products').eq(0).scrollIntoView().trigger('mouseover').within(() => {
            cy.get('.overlay-content').should('be.visible');
            cy.get('.productinfo.text-center > a').should('be.visible').click();        
        });
        cy.get('.modal-footer').should('be.visible');
        cy.get('button.btn-success.close-modal').click();

        cy.get('.single-products').eq(1).scrollIntoView().trigger('mouseover').within(() => {
            cy.get('.overlay-content').should('be.visible');
            cy.get('.productinfo.text-center > a').should('be.visible').click();        
        });
        cy.get('.modal-content').within(() => {
        cy.contains('View Cart').click();
        })

        cy.contains('Proceed To Checkout').click();
        
        // Verifica dados entrega
        cy.get('#address_delivery').should('be.visible');
        cy.get('#address_invoice').should('be.visible');
        cy.get('#cart_info').should('be.visible');
        
        // Validar que endereços contêm os dados corretos
        cy.get('#address_delivery').should('contain', el.camposCadastroUsuario.primeiroNome);
        cy.get('#address_delivery').should('contain', el.camposCadastroUsuario.endereco);

        cy.get('textarea[name="message"]').type('Caso não tenha a cor selecionada, cancele o item');
        cy.contains('Place Order').click();

        //Dados bancários
        cy.get('input[data-qa="name-on-card"]').type(el.camposCadastroUsuario.primeiroNome);
        cy.get('input[data-qa="card-number"]').type('8559874523634587');
        cy.get('input[data-qa="cvc"]').type('989');
        cy.get('input[data-qa="expiry-month"]').type('01');
        cy.get('input[data-qa="expiry-year"]').type('2033');    
        cy.get('button[data-qa="pay-button"]').click();    
       
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
    });
    
})


