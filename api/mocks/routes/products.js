const PRODUCTS = [
  {
    id: 0,
    name: "Villa Bosphorus",
    description: "Lorem ipsum dolor sit amet",
    image: "/background.svg",
    rate: "5.0",
    distance: "3.7 km",
    price: 20000,
    currency: "TL",
  },
  {
    id: 1,
    name: "Villa Bosphorus - 2",
    description: "Lorem ipsum dolor sit amet",
    image: "/background.svg",
    rate: "3.0",
    distance: "1.7 km",
    price: 30000,
    currency: "TL",
  },
];

const ALL_PRODUCTS = [
  ...PRODUCTS,
  {
    id: 2,
    name: "Villa Bosphorus - 3",
    description: "Lorem ipsum dolor sit amet",
    image: "/background.svg",
    rate: "4.0",
    distance: "1.7 km",
    price: 25000,
    currency: "TL",
  },
];

module.exports = [
  {
    id: "get-products", // route id
    url: "/api/products", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_PRODUCTS, // body to send
        },
      },
      {
        id: "all", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_PRODUCTS, // body to send
        },
      },
      {
        id: "error", // variant id
        type: "json", // variant handler id
        options: {
          status: 400, // status to send
          // body to send
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-product", // route id
    url: "/api/products/:id", // url in express format
    method: "GET", // HTTP method
    variants: [
      {
        id: "success", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: PRODUCTS[0], // body to send
        },
      },
      {
        id: "id-3", // variant id
        type: "json", // variant handler id
        options: {
          status: 200, // status to send
          body: ALL_PRODUCTS[2], // body to send
        },
      },
      {
        id: "real", // variant id
        type: "middleware", // variant handler id
        options: {
          // Express middleware to execute
          middleware: (req, res) => {
            const productId = req.params.id;
            const product = ALL_PRODUCTS.find(
              (productData) => productData.id === Number(productId)
            );
            if (product) {
              res.status(200);
              res.send(product);
            } else {
              res.status(404);
              res.send({
                message: "Product not found",
              });
            }
          },
        },
      },
    ],
  },
];
