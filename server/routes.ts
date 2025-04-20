import { Express } from "express";
import { createServer, Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes prefix
  const apiPrefix = '/api';

  // Products routes
  app.get(`${apiPrefix}/products`, async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  });

  app.get(`${apiPrefix}/products/featured`, async (req, res) => {
    try {
      const featuredProducts = await storage.getFeaturedProducts();
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching featured products' });
    }
  });

  app.get(`${apiPrefix}/products/:id`, async (req, res) => {
    try {
      const product = await storage.getProductById(parseInt(req.params.id));
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  });

  app.get(`${apiPrefix}/products/category/:categoryName`, async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.categoryName);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products by category' });
    }
  });

  // Categories routes
  app.get(`${apiPrefix}/categories`, async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories' });
    }
  });

  // Orders routes
  app.post(`${apiPrefix}/orders`, async (req, res) => {
    try {
      // Create customer if doesn't exist
      const customerData = req.body.customer;
      let customer = await storage.getCustomerByEmail(customerData.email);
      
      if (!customer) {
        customer = await storage.createCustomer({
          email: customerData.email,
          fullName: customerData.fullName,
          phone: customerData.phone,
          cpf: customerData.cpf
        });
      }
      
      // Create order
      const order = await storage.createOrder({
        customerId: customer.id,
        status: 'pending',
        total: req.body.total,
        items: req.body.items,
        shippingAddress: req.body.shipping,
        paymentMethod: req.body.payment.method
      });
      
      res.status(201).json(order);
    } catch (error) {
      console.error('Order creation error:', error);
      res.status(500).json({ message: 'Error creating order' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
