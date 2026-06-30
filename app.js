import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    customCss: `
      .swagger-ui .topbar {
        display: none;
      }
    `,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Marketplace UMKM LOKAL"
    });
});

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, {
    swaggerOptions: {
      operationsSorter: (a, b) => {
        const order = {
          get: 1,
          post: 2,
          put: 3,
          delete: 4,
        };

        return order[a.get("method")] - order[b.get("method")];
      },
    },
  })
);

export default app;