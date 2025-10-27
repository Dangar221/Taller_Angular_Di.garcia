describe('Prueba Serie List', () => {
  const apiUrl =
    'https://gist.githubusercontent.com/josejbocanegra/8490b48961a69dcd2bfd8a360256d0db/raw/34ff30dbc32392a69eb0e08453a3fc975a3890f0/series.json';

  let seriesFromBackend: any[] = [];

  before(() => {
    cy.request(apiUrl).then((response) => {
      expect(response.status).to.eq(200);

      if (typeof response.body === 'string') {
        seriesFromBackend = JSON.parse(response.body);
      } else {
        seriesFromBackend = response.body;
      }

      expect(Array.isArray(seriesFromBackend)).to.be.true;
    });
  });


  beforeEach(() => {
    cy.visit('/');
  });

  it('debe mostrar el componente de lista de series', () => {
    cy.get('app-serie-list').should('exist');
  });

  it('debe mostrar el número correcto de series', () => {
    cy.get('tbody tr').should('have.length', seriesFromBackend.length);
  });

  it('debe mostrar los datos correctos en cada fila', () => {
    cy.get('tbody tr').each(($row, index) => {
      const serie = seriesFromBackend[index];
      cy.wrap($row).within(() => {
        cy.get('td').eq(1).should('contain.text', serie.name);
        cy.get('td').eq(2).should('contain.text', serie.channel);
        cy.get('td').eq(3).should('contain.text', serie.seasons.toString());
      });
    });
  });

  it('debe mostrar el promedio correcto de temporadas', () => {
    const total = seriesFromBackend.reduce((sum, serie) => sum + serie.seasons, 0);
    const average = Math.round(total / seriesFromBackend.length);
    cy.get('p').should('contain.text', `Seasons average: ${average}`);
  });

  it('debe mostrar imagen y descripción al hacer clic en una serie', () => {
    const serie = seriesFromBackend[0]; // prueba con la primera serie
    cy.get('tbody tr').first().click();
    cy.get('.card-img-top').should('have.attr', 'src', serie.poster);
    cy.get('.card-title').should('contain.text', serie.name);
    cy.get('.card-text').should('contain.text', serie.description);
    cy.get('a.btn-primary').should('have.attr', 'href', serie.webpage);
  });
});
