import {faker} from "@faker-js/faker";
import CustomError from "../errors/customError.js";
import {enumErrors} from "../errors/enumErrors.js";

export const get = async (req, res, next) => {
  try {
    const mockingProducts = generateMockingProducts(100);
    if (mockingProducts.error) CustomError.create({...mockingProducts});

    return res.send(mockingProducts);
  } catch (error) {
    next(error);
  }
};

const generateMockingProducts = (quantity) => {
  try {
    const products = [];

    for (let i = 0; i < quantity; i++) {
      const product = {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        thumbnails: [faker.image.image(), faker.image.image()],
        status: true,
        code: faker.datatype.hexadecimal({length: 5}),
        stock: faker.datatype.number({max: 100}),
      };
      products.push(product);
    }

    return products;
  } catch (error) {
    return {
      statusCode: 500,
      error: true,
      name: "Error to generate mocking products",
      cause: error.toString(),
      message: "We are working to fix this issue",
      code: enumErrors.ERROR_FROM_SERVER,
    };
  }
};
