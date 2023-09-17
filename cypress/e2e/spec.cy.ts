describe('template spec', () => {
	const testUrl = 'http://localhost:3000/react-burger/';

	beforeEach(() => {
		cy.viewport(1440, 900);
		cy.visit(testUrl);
	});

	it('adding todos', () => {
		cy.get('input[type="text"]').type('TestMessage1{enter}');
		cy.contains('TestMessage1');
		cy.get('input[type="text"]').type('TestMessage2{enter}');
		cy.contains('TestMessage2');
	});

	it('checking and unchecking todo', () => {
		cy.get('input[type="text"]').type('TestMessage1{enter}');
		cy.contains('TestMessage1');
		cy.get('input[type="radio"]').click().should('be.checked');
		cy.get('input[type="radio"]').click().should('not.be.checked');
	});

	it('switching tabs', () => {
		cy.get('input[type="text"]').type('TestMessage1{enter}');
		cy.contains('TestMessage1').click();
		cy.get('input[type="text"]').type('TestMessage2{enter}');
		cy.contains('TestMessage2');
		cy.contains('Active').click();
		cy.contains('TestMessage2');
		cy.contains('Completed').click();
		cy.contains('TestMessage1');
	});

	it('clear completed', () => {
		cy.get('input[type="text"]').type('TestMessage1{enter}');
		cy.get('input[type="radio"]').click().should('be.checked');
		cy.contains('Clear').click();
		cy.get('body').should('contain', '0 items left');
		cy.get('body').should('not.contain', 'TestMessage1');
	});
});
