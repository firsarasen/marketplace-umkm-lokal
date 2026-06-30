import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Marketplace UMKM LOKAL",
      version: "1.0.0",
      description: "REST API Marketplace Produk Lokal UMKM Desa",
    },

    servers: [
      {
        url: "http://localhost:3000",
      },
    ],

    // Tambahkan bagian ini
    tags: [
      {
        name: "Authentication",
        description: "Endpoint autentikasi pengguna",
      },
      {
        name: "Products",
        description: "Endpoint pengelolaan produk",
      },
      {
        name: "Upload",
        description: "Endpoint upload gambar",
      },
      {
        name: "Orders",
        description: "Endpoint pemesanan",
      },
      {
        name: "Categories",
        description: "Endpoint kategori produk",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;