const client = require('../square_service/client'); // Adjust the path as necessary

const searchCatalog = async () => {
  try {
    const response = await client.catalogApi.searchCatalogObjects({
      objectTypes: ["ITEM", "IMAGE", "CATEGORY"], // Request body
    });

    // Handle the successful response
    console.log("Catalog Objects:", response.result.objects);
    return response.result;
  } catch (error) {
    // Handle errors
    console.error("Error fetching catalog objects:", error);
    throw error;
  }
};

module.exports = { searchCatalog };
