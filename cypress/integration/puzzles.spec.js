describe('Puzzle grid tests', () => {
	beforeEach(() => {
		cy.fixture('./puzzles.json').then((allPuzzles) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
        statusCode: 200,
        body: allPuzzles
      })
    cy.visit('http://localhost:3000/');
	  })
    cy.fixture('./user.json').then((user) => {
			cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
				statusCode: 200,
				body: user
			})
		})
  })

  // Implementation not yet written:
  // clear button to view all puzzles again
  // displays 0 results message if 0 results

  it('is accessible from homepage and redirects to unique URL', () => {
    cy.get('button').click()
      .url().should('include', 'puzzles')
  })

  it('is accessible while not logged in', () => {
    cy.get('.MuiFormControl-root').contains('Log In')
      .get('button').click()
      .url().should('include', 'puzzles')
      .get('.MuiFormControl-root').contains('Log In')
  })

  it('shows header with Log In dropdown that updates & logs in with user interaction', () => {
    cy.get('button').click()
    .get('h1').contains('puzzlrs')
    .get('#mui-component-select-login').click()
    .get('[data-value="Micha"]').click()
  })

  it('shows header with nav buttons once logged in', () => {
    cy.get('button').click()
    .get('h1').contains('puzzlrs')
    .get('#mui-component-select-login').click()
    .get('[data-value="Micha"]').click()

    .get(':nth-child(1) > button').contains('View Puzzles')
    .get(':nth-child(2) > button').contains('Add Puzzle')
    .get(':nth-child(3) > button').contains('User Profile')
  })

  it('has 3 filter dropdowns and a search button', () => {
    cy.get('button').click()
    .get('.filters > :nth-child(1)').contains('Category')
    .get('.filters > :nth-child(2)').contains('Piece Count')
    .get('.filters > :nth-child(3)').contains('Quality')
    .get('button').contains('Search')
  })

  it('displays puzzles in a grid with image and piece count', () => {
    cy.get('button').click()
    .get(':nth-child(1) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053')
    .get('.piece-count').contains('500 pieces')

    .get(':nth-child(2) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-listfield-rainbow_5274224_4_1800x1800.jpg?v=1638228235')
    .get('.piece-count').contains('500 pieces')

    .get(':nth-child(3) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/5280376.PT02_1800x1800.jpg?v=1638228991')
    .get('.piece-count').contains('500 pieces')
  })

  it('displays modal with all correct details when individual puzzle is clicked', () => {
    cy.get('button').click()
    .get(':nth-child(1) > .individual-puzzle').click()
    .get('.puzzle-details')
    .get('.individual-puzzle-details > :nth-child(2) > :nth-child(1)').contains('Poor')
    .get('.individual-puzzle-details > :nth-child(2) > :nth-child(2)').contains('Animals')
    .get('.individual-puzzle-details > :nth-child(2) > :nth-child(3)').contains('32.99')
    .get('.individual-puzzle-details > :nth-child(2) > :nth-child(4)').contains('2')
    .get('.puzzle-image-pieces > h4').contains('500')
    .get('.submit-button').contains('Request Puzzle')
  })

  it('updates filter dropdowns with user interaction', () => {
    cy.get('button').click()
    .get('#mui-component-select-category').click()
    .get('[data-value="Animals"]').click()
    .contains('Animals')

    .get('#mui-component-select-pieceCount').click()
    .get('[data-value="500"]').click()
    .contains('500')

    .get('#mui-component-select-quality').click()
    .get('[data-value="Poor"]').click()
    .contains('Poor')
  })

  it('filters by category if just category is input', () => {
    cy.get('button').click()
    .get('#mui-component-select-category').click()
    .get('[data-value="Animals"]').click()
    .get('button').click()
    .get(':nth-child(1) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053')
    .get('.puzzles-container > section').should('have.length', 1)

  })

  it('filters by piece count if just piece count is input', () => {
    cy.get('button').click()
    .get('#mui-component-select-pieceCount').click()
    .get('[data-value="500"]').click()
    .get('button').click()
    .get(':nth-child(1) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053')
    .get(':nth-child(2) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/5280376.PT02_1800x1800.jpg?v=1638228991')
    .get('.puzzles-container > section').should('have.length', 2)
  })

  it('filters by quality if just quality is input', () => {
    cy.get('button').click()
    .get('#mui-component-select-quality').click()
    .get('[data-value="Poor"]').click()
    .get('button').click()
    .get(':nth-child(1) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053')
    .get('.puzzles-container > section').should('have.length', 1)
  })

  it('filters by category and quality if just those two are selected', () => {
    cy.get('button').click()
    .get('#mui-component-select-category').click()
    .get('[data-value="Animals"]').click()
    .get('#mui-component-select-quality').click()
    .get('[data-value="Poor"]').click()
    .get('button').click()
    .get(':nth-child(1) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053')
    .get('.puzzles-container > section').should('have.length', 1)
  })

  it('filters by piece count and quality if just those two are selected', () => {
    cy.get('button').click()
    .get('#mui-component-select-pieceCount').click()
    .get('[data-value="500"]').click()
    .get('#mui-component-select-quality').click()
    .get('[data-value="Poor"]').click()
    .get('button').click()
    .get(':nth-child(1) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053')
    .get('.puzzles-container > section').should('have.length', 1)
  })


  it('filters by category and piece count if just those two are selected', () => {
    cy.get('button').click()
    .get('#mui-component-select-category').click()
    .get('[data-value="Animals"]').click()
    .get('#mui-component-select-pieceCount').click()
    .get('[data-value="500"]').click()
    .get('button').click()
    .get(':nth-child(1) > .individual-puzzle > img').should('have.attr', 'src', 'https://cdn.shopify.com/s/files/1/0279/7325/5307/products/puzzle-500-piece-obuhanych-cat_5274227_5_1800x1800.jpg?v=1639082053')
    .get('.puzzles-container > section').should('have.length', 1)
  })
  
})