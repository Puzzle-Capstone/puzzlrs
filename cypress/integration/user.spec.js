describe('user profile page', () => {
	beforeEach(() => {
		cy.fixture('./puzzles.json').then((allPuzzles) => {
			cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
				statusCode: 200,
				body: allPuzzles
			})
		})
		cy.fixture('./user.json').then((user) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
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
		.get(':nth-child(3) > .user-puzzles').should('exist')
		.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
		.get(':nth-child(3) > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
	})

	it('should be able to click a puzzle and see further information', () => {
		cy.get(':nth-child(2) > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.puzzle-detail-image').should('be.visible')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(1)').contains('Good')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(2)').contains('People')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(3)').contains('33.99')
		.get('.individual-puzzle-details > :nth-child(2) > :nth-child(4)').contains('2')
		.get('h4').contains('1000')
		.get('.request-buttons > :nth-child(1)').contains('Delete')
	})

	it('should be able to hit x icon and exit out of puzzle details', () => {
		cy.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.x-icon').click()
		.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').should('be.visible')
	})

	it('should display a modal that has the ability to deny a request', () => {
		cy.intercept('PATCH', 'https://puzzlrs.herokuapp.com/api/v1/request/13', {
      statusCode: 201,
      body: {
				status: 'declined'
			}
		})
		.get(':nth-child(3) > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.request-buttons > :nth-child(2)').contains('Deny')
	})
		
	it('should display a modal that has the ability to accept a request', () => {
		cy.intercept('PATCH', 'https://puzzlrs.herokuapp.com/api/v1/request/13', {
			statusCode: 201,
			body: {
				status: 'accepted'
			}
		}).as('acceptRequest')
		.get(':nth-child(3) > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.request-buttons > :nth-child(1)').contains('Accept')
	})
	
	it('should display a modal that has the ability to delete a puzzle from my puzzles', () => {
		cy.intercept('DELETE', 'https://puzzlrs.herokuapp.com/api/v1/puzzles/2', {
			statusCode: 200,
			// body: {
			// 	'id': 1,
			// 	'type': "puzzle",
			// 	'attributes': {
			// 		'availability': false,
			// 		'category': "Animals",
			// 		'image': "https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053",
			// 		'missing_pieces': "2",
			// 		'original_price_point': "32.99",
			// 		'piece_count': "500",
			// 		'quality': "poor",
			// 		'user_id': 6
			// 	}
			// }
		})
		.get(':nth-child(2) > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.request-button').contains('Delete')
	})

	it('should display a modal that has the ability to delete a puzzle from my sent requests', () => {
		cy.intercept('DELETE', 'https://puzzlrs.herokuapp.com/api/v1/request/1', {
			statusCode: 201
		})
		.get('.center > .user-puzzle-container > .puzzle-image > .user-puzzles').click()
		.get('.puzzle-details').should('be.visible')
		.get('.request-button').contains('Delete Request')
	})
})