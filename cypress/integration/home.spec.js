describe('home page', () => {
	beforeEach(() => {
		cy.fixture('./puzzles.json').then((allPuzzles) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
        statusCode: 200,
        body: allPuzzles
      })
    cy.visit('http://localhost:3000/');
	})
})

it('should visit the home page upon log in and show log in dropdown and the information on the site', () => {
	cy.get('h1').contains('Puzzlrs')
	cy.get('h2').contains('Tired of your puzzles? Trade with people like you!')
	cy.get('button').contains('View Puzzles')
	cy.get('.MuiFormControl-root').contains('Log In')
})

it('should be able to click the log in dropdown and see users', () => {
	cy.get('.MuiInput-root').click()
	cy.get('[data-value="8"]').click()
})

it.only('should be able to click a user in the dropdown and then see the nav buttons populate', () => {
	cy.get('.MuiInput-root').click()
	cy.get('[data-value="8"]').click()
	cy.get(':nth-child(1) > button').contains('View Puzzles')
	cy.get(':nth-child(2) > button').contains('Add Puzzle')
	cy.get('.nav-buttons > :nth-child(1) > :nth-child(3) > button').contains('User Profile')
})

})