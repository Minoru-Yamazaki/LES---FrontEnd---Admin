context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8082')
    })

    it('.type() - type into a DOM element', () => {
        // https://on.cypress.io/type
        cy.get('#txtEmail')
            .type('minoru.rhcp@gmail.com').should('have.value', 'minoru.rhcp@gmail.com');

        cy.get('#txtPwd')
            .type('Humdois!').should('have.value', 'Humdois!');

        cy.get('#btnContinuar') ////*[@id="lnkDashDashboard"]/i
            .click();

        cy.get('#lnkDashBoard').click();

        cy.get('#dataInicial')
            .type('2020-10-01').should('have.value', '2020-10-01');

        cy.get('#dataFinal')
            .type('2021-10-31').should('have.value', '2021-10-31');

        cy.get('#pesquisar').click();
    })

})