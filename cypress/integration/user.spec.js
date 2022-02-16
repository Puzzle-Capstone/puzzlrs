import { get } from "http";

describe('user profile page', () => {
	beforeEach(() => {
		cy.fixture('./user.json').then((user) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/6', {
        statusCode: 200,
        body: user
      })
			cy.visit('http://localhost:3000/');
			cy.get('.MuiInput-root').click()
			cy.get('[data-value="Micha"]').click()
			cy.get('.nav-buttons > :nth-child(1) > :nth-child(3) > button').click()
			cy.url().should('include', 'user-profile')
	})
})

	it('should load the user profile when the nav button is clicked from landing page', () => {
		cy.get('h2').contains('Hi, Micha!')
		.get(':nth-child(1) > p').contains('Your Puzzles')
		.get(':nth-child(2) > p').contains('Sent Requests')
		.get(':nth-child(3) > p').contains('Received Requests')
		.get(':nth-child(1) > .user-puzzle-container > :nth-child(1) > .user-puzzles').should('be.visible')
		.get(':nth-child(1) > .user-puzzle-container > :nth-child(2) > .user-puzzles').should('be.visible')
		.get(':nth-child(1) > .user-puzzle-container > :nth-child(3) > .user-puzzles').should('be.visible')
		.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
		.get(':nth-child(3) > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
	})

	it('should be able to click a puzzle and see further information', () => {
		cy.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(1)').contains('Poor')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(2)').contains('People')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(3)').contains('25.99')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(4)').contains('2')
		.get('h4').contains('1000')
		.get('.request-buttons > :nth-child(1)').contains('Delete Request')
	})

	it('should be able to hit x icon and exit out of puzzle details', () => {
		cy.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.x-icon').click()
		.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
	})

	it('should be able to hit deny button and the puzzle will be removed from requests', () => {
		cy.intercept('PATCH', 'https://puzzlrs.herokuapp.com/api/v1/request/13', {
      statusCode: 201,
      body: {
				"id": 13,
				"user_id": 9,
				"puzzle_id": 3,
				"status": "pending",
				"created_at": "2022-02-09T18:07:40.439Z",
				"updated_at": "2022-02-09T18:07:40.439Z"
			}
		}).as('denyRequest')
		.get(':nth-child(3) > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		// .get('.request-buttons > :nth-child(2)').click()
		.get('.request-buttons > :nth-child(2)').contains('Deny')
			// .wait('@denyRequest').then(({response}) => {console.log(response)})
	})
		
		it('should be able to click accept button and see puzzle removed from requests', () => {
			cy.intercept('PATCH', 'https://puzzlrs.herokuapp.com/api/v1/request/13', {
				statusCode: 201,
				body: {
					"id": 13,
					"user_id": 9,
					"puzzle_id": 3,
					"status": "accepted",
					"created_at": "2022-02-09T18:07:40.439Z",
					"updated_at": "2022-02-09T18:07:40.439Z"
				}
			}).as('acceptRequest')
			.get(':nth-child(3) > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
			.get('.puzzle-details').should('be.visible')
			.get('.request-buttons > :nth-child(1)').contains('Accept')
			

	})
	
	it('should be able to click delete button and puzzle will be removed from my puzzles list', () => {
		cy.intercept('DELETE', 'https://puzzlrs.herokuapp.com/api/v1/request/1', {
			statusCode: 201
		})
		.get(':nth-child(2) > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.request-button').contains('Delete')
	})

	it('should be able to hit the delete request button and puzzle will be removed from my sent requests', () => {
		cy.intercept('DELETE', 'https://puzzlrs.herokuapp.com/api/v1/request/1', {
			statusCode: 201
		})
		.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.request-button').contains('Delete Request')
	})
})