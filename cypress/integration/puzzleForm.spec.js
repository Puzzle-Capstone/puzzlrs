describe('Add puzzle form page', () => {
  beforeEach(() => {
    cy.fixture('./puzzles.json').then((allPuzzles) => {
			cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
				statusCode: 200,
				body: allPuzzles
			})
		})
    cy.intercept('POST', 'https://puzzlrs.herokuapp.com/api/v1/puzzles', {
      statusCode: 201,
      body: {
        id: "51",
        type: "puzzle",
        attributes: {
          availability: true,
          category: "Mythical",
          image: "https://res.cloudinary.com/dqgqw1dld/image/upload/v1644990779/puzzlrs/jbqnrdcfbgnzzuos4mpa.jpg",
          missing_pieces: "1",
          original_price_point: "15.99",
          piece_count: "1000",
          quality: "Good",
          user_id: 6
        }
      }
    })
    cy.fixture('./user.json').then((user) => {
      cy.intercept('GET', 'https://puzzlrs.herokuapp.com/api/v1/users/1', {
        statusCode: 200,
        body: user
      })
      cy.visit('http://localhost:3000');
      cy.get('.MuiInput-root').click();
      cy.get('[data-value="Micha"]').click();
      cy.get('.nav-buttons > :nth-child(1) > :nth-child(2) > button').click();
    })
  })

  it('should display a form to submit a puzzle', () => {
    cy.get('form').contains('Submit your puzzle')
  })

  it('should display error messages when trying to submit an empty form', () => {
    cy.get('button').contains('Submit').click()
    .get('#errorAlert').contains('Please upload a photo!')
  })

  it('should be able to fill out the form', () => {
    cy.fixture('./newPuzzle.json').then((puzzle) => {
      const filePath = 'images/structuresPuzzle.jpg'
      console.log(filePath)
      cy.get('#category').click()
      .get(`[data-value=${puzzle.category}]`).click()
      .get('#missingPieces').click()
      .get(`[data-value=${puzzle.missing_pieces}]`).click()
      .get('#quality').click()
      .get(`[data-value=${puzzle.quality}]`).click()
      .get('#price').click().type(`${puzzle.original_price_point}`)
      .get('#pieceCount').click().type(`${puzzle.piece_count}`)
      .get('#uploadPhotoButton').click()
      .get('input[type="file"]').attachFile(filePath)
      .wait(4000).get('#successAlert').contains('Your photo was uploaded!')
    })
  })

  it('should upload a puzzle after filling out the form', () => {
    cy.fixture('./newPuzzle.json').then((puzzle) => {
      const filePath = 'images/structuresPuzzle.jpg'
      cy.get('#category').click()
      .get(`[data-value=${puzzle.category}]`).click()
      .get('#missingPieces').click()
      .get(`[data-value=${puzzle.missing_pieces}]`).click()
      .get('#quality').click()
      .get(`[data-value=${puzzle.quality}]`).click()
      .get('#price').click().type(`${puzzle.original_price_point}`)
      .get('#pieceCount').click().type(`${puzzle.piece_count}`)
      .get('#uploadPhotoButton').click()
      .get('input[type="file"]').attachFile(filePath)
      .wait(4000).get('#successAlert').contains('Your photo was uploaded!')
      .get('button').contains('Submit').click()
      .get('#successAlert').contains('Your puzzle was uploaded!')
    })
  })
})