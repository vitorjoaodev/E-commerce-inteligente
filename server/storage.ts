import { 
  products, 
  categories, 
  orders, 
  customers, 
  type Product, 
  type Category, 
  type Order, 
  type Customer, 
  type InsertProduct, 
  type InsertCategory, 
  type InsertOrder, 
  type InsertCustomer 
} from "@shared/schema";

// Interface for all storage operations needed by the application
export interface IStorage {
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(categoryName: string): Promise<Product[]>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Order operations
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  getOrdersByCustomerId(customerId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Customer operations
  getCustomerById(id: number): Promise<Customer | undefined>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private categories: Map<number, Category>;
  private orders: Map<number, Order>;
  private customers: Map<number, Customer>;
  
  private productCurrentId: number;
  private categoryCurrentId: number;
  private orderCurrentId: number;
  private customerCurrentId: number;
  
  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.orders = new Map();
    this.customers = new Map();
    
    this.productCurrentId = 1;
    this.categoryCurrentId = 1;
    this.orderCurrentId = 1;
    this.customerCurrentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productCurrentId++;
    const now = new Date();
    const product: Product = { ...insertProduct, id, createdAt: now };
    this.products.set(id, product);
    return product;
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.featured);
  }
  
  async getProductsByCategory(categoryName: string): Promise<Product[]> {
    // If category is "todos", return all products
    if (categoryName === "todos") {
      return this.getAllProducts();
    }
    
    return Array.from(this.products.values()).filter(
      product => product.category === categoryName
    );
  }
  
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      category => category.slug === slug
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryCurrentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Order methods
  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async getOrdersByCustomerId(customerId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      order => order.customerId === customerId
    );
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const now = new Date();
    const order: Order = { ...insertOrder, id, createdAt: now };
    this.orders.set(id, order);
    return order;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Customer methods
  async getCustomerById(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }
  
  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    return Array.from(this.customers.values()).find(
      customer => customer.email === email
    );
  }
  
  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.customerCurrentId++;
    const customer: Customer = { ...insertCustomer, id };
    this.customers.set(id, customer);
    return customer;
  }
  
  // Seed the database with initial data
  private initializeData() {
    // Create categories
    const categories = [
      {
        name: 'Camisetas',
        slug: 'camisetas',
        image: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Relógios',
        slug: 'relogios',
        image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Polos',
        slug: 'polos',
        image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&auto=format&fit=crop'
      },
      {
        name: 'Shorts',
        slug: 'shorts',
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        name: 'Acessórios',
        slug: 'acessorios',
        image: 'https://images.unsplash.com/photo-1547458095-a045e1845d70?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ];
    
    categories.forEach(category => {
      this.createCategory(category);
    });
    
    // Create products
    const products = [
      {
        name: 'Jaqueta Aviador Premium',
        slug: 'jaqueta-aviador-premium',
        description: 'Inspirada nas jaquetas clássicas dos pilotos da Segunda Guerra, esta jaqueta de couro legítimo com detalhes em lã oferece estilo atemporal e proteção contra o vento. Os patches bordados e fechos metálicos vintage completam o visual autêntico de aviador.',
        price: 1299.90,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800&auto=format&fit=crop'
        ],
        rating: 4.9,
        reviewCount: 36,
        installments: 12,
        category: 'camisetas',
        featured: true,
        stock: 15,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#8B4513', '#000000', '#556B2F']
      },
      {
        name: 'Camiseta Cockpit Classic',
        slug: 'camiseta-cockpit-classic',
        description: 'Inspirada nos uniformes dos primeiros pilotos, esta camiseta de algodão premium traz um design exclusivo com elementos gráficos do painel de controle de aeronaves clássicas. Perfeita para os aventureiros que carregam o espírito da aviação.',
        price: 149.90,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1618354691229-88d47f285158?w=800&auto=format&fit=crop'
        ],
        rating: 5,
        reviewCount: 42,
        installments: 3,
        category: 'camisetas',
        featured: true,
        stock: 25,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#000000', '#FFFFFF', '#0A3D62']
      },
      {
        name: 'Relógio Aviator Heritage',
        slug: 'relogio-aviator-heritage',
        description: 'Um relógio inspirado nos instrumentos de navegação utilizados pelos pioneiros da aviação. Com caixa em aço inoxidável e pulseira em couro genuíno envelhecido, este relógio é à prova d\'água e possui movimento automático de alta precisão. Uma verdadeira peça para os exploradores modernos.',
        price: 699.90,
        image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1594576722512-582d19f2718d?w=800&auto=format&fit=crop'
        ],
        rating: 5,
        reviewCount: 28,
        installments: 10,
        category: 'relogios',
        featured: true,
        stock: 12,
        sizes: ['Único'],
        colors: ['#8B4513', '#000000']
      },
      {
        name: 'Polo Captain Premium',
        slug: 'polo-captain-premium',
        description: 'Confeccionada em algodão pima e elastano, esta polo oferece conforto excepcional e um caimento perfeito. Detalhes bordados com insígnias de patente aeronáutica e botões personalizados. Ideal para quem busca um visual casual com um toque de sofisticação.',
        price: 219.90,
        image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&auto=format&fit=crop'
        ],
        rating: 4.8,
        reviewCount: 35,
        installments: 5,
        category: 'polos',
        featured: true,
        stock: 20,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#FFFFFF', '#006400', '#8B4513']
      },
      {
        name: 'Chaveiro Compass Navigator',
        slug: 'chaveiro-compass-navigator',
        description: 'Este chaveiro é uma réplica autêntica das bússolas utilizadas pelos navegadores aéreos nas primeiras expedições comerciais. Fabricado em latão envelhecido com detalhes em couro genuíno. Um acessório funcional e cheio de história para acompanhar suas aventuras.',
        price: 89.90,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1531170095369-c677a0f3dc1e?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1633354241508-a93df4578211?w=800&auto=format&fit=crop'
        ],
        rating: 4.9,
        reviewCount: 56,
        installments: 2,
        category: 'acessorios',
        featured: true,
        stock: 30,
        sizes: ['Único'],
        colors: ['#DAA520']
      },
      {
        name: 'Shorts Aviation Cargo',
        slug: 'shorts-aviation-cargo',
        description: 'Shorts estilo cargo confeccionados em tecido ripstop resistente e leve, com bolsos funcionais e design inspirado nas roupas dos pilotos de expedição. Perfeito para aventuras ao ar livre com estilo e funcionalidade.',
        price: 179.90,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1593055357429-62b22dfbfc4d?w=800&auto=format&fit=crop'
        ],
        rating: 4.7,
        reviewCount: 22,
        installments: 4,
        category: 'shorts',
        featured: true,
        stock: 18,
        sizes: ['38', '40', '42', '44', '46'],
        colors: ['#8B4513', '#006400', '#333333']
      },
      {
        name: 'Camiseta Mapa Aéreo',
        slug: 'camiseta-mapa-aereo',
        description: 'Esta camiseta apresenta uma estampa exclusiva com mapas de navegação aérea vintage e coordenadas de destinos icônicos da história da aviação. Confeccionada em algodão orgânico, proporciona conforto e um visual único.',
        price: 129.90,
        image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=800&auto=format&fit=crop'
        ],
        rating: 4.6,
        reviewCount: 18,
        installments: 3,
        category: 'camisetas',
        featured: false,
        stock: 15,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#FFFFFF', '#000000', '#DAA520']
      },
      {
        name: 'Relógio Compass Expedition',
        slug: 'relogio-compass-expedition',
        description: 'Este relógio multifuncional combina cronógrafo, bússola e altímetro, tudo em um design inspirado nos instrumentos de navegação utilizados nas expedições clássicas. Perfeito para os aventureiros modernos que valorizam funcionalidade e estilo.',
        price: 879.90,
        image: 'https://images.unsplash.com/photo-1689204735544-d2f5278ba67c?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1629392554711-1b9d5f6d0cef?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1569411032431-07598b0012c2?w=800&auto=format&fit=crop'
        ],
        rating: 4.9,
        reviewCount: 32,
        installments: 10,
        category: 'relogios',
        featured: false,
        stock: 8,
        sizes: ['Único'],
        colors: ['#000000', '#8B4513']
      },
      {
        name: 'Polo Expedição Aérea',
        slug: 'polo-expedicao-aerea',
        description: 'Polo com detalhes que remetem às primeiras expedições aéreas, com patches bordados e acabamento premium. Tecido tecnológico com proteção UV e secagem rápida, ideal para aventureiros que não abrem mão do estilo.',
        price: 199.90,
        image: 'https://images.unsplash.com/photo-1600801605666-d416e3e1e8ed?w=800&auto=format&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&auto=format&fit=crop'
        ],
        rating: 4.7,
        reviewCount: 24,
        installments: 5,
        category: 'polos',
        featured: false,
        stock: 22,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#006400', '#8B4513', '#333333']
      }
    ];
    
    products.forEach(product => {
      this.createProduct(product);
    });
  }
}

export const storage = new MemStorage();
