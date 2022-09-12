describe('Check myDPO Page', () => {
    const URL = `${Cypress.config("baseUrl")}/login`;

    it('Check if the site is available', () => {
            // open webpage
            cy.visit(URL);
            // get input element
            cy.get('input').should('contain', '');
            // get button element
            cy.get('button').should('contain', 'Sign in');
            // validate url are the same
            cy.url().should('eq', URL);
    });

    it('Check if the email is invalid for authorization', () => {
        cy.fixture('user').then((userFixture) => {
            // open webpage
            cy.visit(URL);
            // get input element
            cy.get('input').type(userFixture.invalidEmail);
            // get button element
            cy.get('button').click();
            // validate message error
            cy.get('.go1415219401').should('have.text', 'The submitted user is not registered in the app!');
        });
    });

    it('Check if the email is valid for authorization', () => {
        cy.fixture('user').then((userFixture) => {
            // open webpage
            cy.visit(URL);
            // get input element
            cy.get('input').type(userFixture.email);
            // get button element
            cy.get('button').click();
            // validate message
            cy.get("h1").should("contain","Check your mailbox!");
            // validate redirection
            cy.location('pathname').should(
                'contains',
                `/check-mailbox`
            )
        });
    });
});
