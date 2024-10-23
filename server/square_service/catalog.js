const client = require('../square_service/client'); // Adjust the path as necessary

async function searchCatalog() {
  try {
    const catalogApi = client.catalogApi;
    const response = await catalogApi.searchCatalogObjects({
      objectTypes: ['ITEM', 'IMAGE', 'CATEGORY']
    });

    console.log(response.result);  // Output the specific response
  } catch (error) {
    console.error(error);
  }
}

module.exports = { searchCatalog };
