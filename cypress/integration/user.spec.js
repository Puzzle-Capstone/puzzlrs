describe('user profile page', () => {
	beforeEach(() => {
		cy.fixture('./user.json').then((user) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/6', {
        statusCode: 200,
        body: user
      })
			cy.visit('http://localhost:3000/');
			cy.get('.MuiInput-root').click()
			cy.get('[data-value="6"]').click()
			cy.get('.nav-buttons > :nth-child(1) > :nth-child(3) > button').click()
	})
})

	it('should load the user profile when the nav button is clicked from landing page', () => {
		cy.get('h2').contains('Hi, Micha!')
		cy.get(':nth-child(1) > p').contains('Your Puzzles')
		cy.get(':nth-child(2) > p').contains('Sent Requests')
		cy.get(':nth-child(3) > p').contains('Received Requests')
		cy.get(':nth-child(1) > .user-puzzle-container > :nth-child(1) > .user-puzzles').should('be.visible')
		cy.get(':nth-child(1) > .user-puzzle-container > :nth-child(2) > .user-puzzles').should('be.visible')
		cy.get(':nth-child(1) > .user-puzzle-container > :nth-child(3) > .user-puzzles').should('be.visible')
		cy.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
		cy.get(':nth-child(3) > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
	})

	it('should be able to click a puzzle and see further information', () => {
		cy.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		cy.get('.puzzle-details').should('be.visible')
		cy.get('.individual-puzzle-details > :nth-child(2) > :nth-child(1)').contains('Poor')
		cy.get('.individual-puzzle-details > :nth-child(2) > :nth-child(2)').contains('Animals')
		cy.get('.individual-puzzle-details > :nth-child(2) > :nth-child(3)').contains('32.99')
		cy.get('.individual-puzzle-details > :nth-child(2) > :nth-child(4)').contains('2')
		cy.get('h4').contains('500')
		cy.get('.request-buttons > :nth-child(1)').contains('Accept')
		cy.get('.request-buttons > :nth-child(2)').contains('Deny')
	})

	it('should be able to hit x icon and exit out of puzzle details', () => {
		cy.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		cy.get('.x-icon').click()
		cy.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
	})

	// it('should be able to hit deny button and the puzzle will be removed from requests', () => {

	// })

	// it('should be able to click delete button and puzzle will be removed from my puzzles list', () => {

	// })

	// it('should be able to click accept button and see puzzle removed from requests', () => {

	// })
})