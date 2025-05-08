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
        image: 'https://redcanoebrands.com/wp-content/uploads/2013/11/M-SST-CESSNA-NY-front-1.jpg'
      },
      {
        name: 'Relógios',
        slug: 'relogios',
        image: 'https://www.boeingstore.com/cdn/shop/products/brownwatch1.jpg?v=1617997785'
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
        name: 'Jaqueta Aviador Premium - Unisex',
        slug: 'jaqueta-aviador-premium',
        description: 'Apresentando o logo vintage com asas da Boeing, esta jaqueta de voo leve e estilosa para o verão é inspirada no design clássico das roupas de aviação. Na cor carvão, ela é feita com uma mistura rica em algodão e se destaca pelos bolsos para mapas, zíperes de metal escovado e ombros em lona resistente.\n\nMistura rica em algodão\n\nCor: Carvão (Charcoal)\n\nForro em nylon\n\nBolsos nos ombros e punhos com zíperes de metal escovado\n\nBolso no ombro em lona pesada, ideal para guardar uma caneta',
        price: 389.99,
        oldPrice: 400.00,
        image: 'https://redcanoebrands.com/wp-content/uploads/2016/01/M-JKT-BOEING-CH_front.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2016/01/Mens-BTO-Jacket.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2023/03/M-JKT-BTO-01-CH_lifestyle2.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2016/01/Mens-BTOFlight-Jacket.jpg'
        ],
        rating: 4.9,
        reviewCount: 36,
        installments: 12,
        category: 'agasalhos',
        featured: true,
        stock: 15,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#8B4513', '#000000', '#556B2F']
      },
      {
        name: 'Agasalho Boeing Masculino',
        slug: 'agasalho-boeing-masculino',
        description: 'Essa blusa de moletom encorpada, porém incrivelmente macia, foi feita para acompanhar você em todos os momentos. Com letras aplicadas em feltro duplo, o design ousado e gráfico é uma homenagem ao estilo vintage e à qualidade duradoura. Seu caimento relaxado, conforto térmico e praticidade fazem dela a companheira ideal — seja em aventuras ao ar livre ou em dias tranquilos.\n\nMoletom pesado com zíper frontal\n\nCor: Cinza\n\nPunhos e barra canelados\n\nLetreiramento frontal com aplique duplo em feltro\n\nPatch bordado na manga\n\nBolso frontal com zíper',
        price: 189.90,
        image: 'https://redcanoebrands.com/wp-content/uploads/2021/09/Boeing-Applique-Full-Zip_front-2.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2021/09/Boeing-Full-Zip_Lifestyle.jpg'
        ],
        rating: 4.8,
        reviewCount: 32,
        installments: 4,
        category: 'agasalhos',
        featured: true,
        stock: 20,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#808080']
      },
      {
        name: 'Boeing Flight Jacket Feminino',
        slug: 'boeing-flight-jacket-feminino',
        description: 'Voe com estilo com nossa Jaqueta de Voo Feminina com o logotipo da Boeing Airplane Company.\n\nConfeccionada com uma mescla de algodão premium, essa jaqueta une conforto e elegância. Possui forro em nylon, zíperes metálicos escovados nos ombros e bolso interno — detalhes que reforçam seu design funcional e sofisticado.\n\nTecido com alta porcentagem de algodão para maior conforto\n\nCor: Cinza Chumbo (Charcoal)\n\nForro interno em nylon\n\nZíperes de metal escovado nos ombros e bolso interno',
        price: 389.99,
        oldPrice: 400.00,
        image: 'https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-BOEING-flight-jacket.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-Boeing-flight-jacket-still.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2021/03/L-JKT-BOEING-CH-LG_lifestyle.jpg'
        ],
        rating: 4.9,
        reviewCount: 28,
        installments: 10,
        category: 'agasalhos',
        featured: true,
        stock: 15,
        sizes: ['PP', 'P', 'M', 'G', 'GG'],
        colors: ['#4A4A4A']
      },
      {
        name: 'Cessna Style',
        slug: 'cessna-style',
        description: 'Tornar-se piloto é a conquista pessoal da qual muitas pessoas mais se orgulham. Nossa mais recente coleção de produtos, desenvolvida para os entusiastas das aeronaves Cessna, reflete a paixão de um piloto pelo voo.\n\nFeita 100% de algodão\n\nCor: Azul marinho\n\nPatch tecido com várias bandeiras na manga\n\nLavada após a estampa para evitar encolhimento e adicionar um toque vintage',
        price: 149.90,
        image: 'https://redcanoebrands.com/wp-content/uploads/2013/11/M-SST-CESSNA-NY-front-1.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2023/03/M-SST-CESS-CA-NY_lifestyle3.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2022/03/M-SST-CESSNA-NY_lifestyle_2.jpg'
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
        name: 'Relógio Boeing',
        slug: 'relogio-boeing',
        description: 'Inspirado na excelência e na engenharia de ponta da Boeing, este relógio combina sofisticação e resistência. Ideal para o dia a dia ou ocasiões especiais, ele eleva qualquer look com elegância e discrição — refletindo a tradição da aviação em cada detalhe.\n\nMovimento japonês de alta precisão\n\nCaixa em aço inoxidável com aro giratório também em aço\n\nResistência à água: 10 ATM (100 metros)\n\nMostrador azul degradê com índices impressos\n\nLogo impresso no mostrador e gravação a laser no fundo da caixa\n\nDiâmetro da caixa: 42 mm\n\nEspessura da caixa: 12 mm\n\nPeso aproximado: 80g',
        price: 489.99,
        oldPrice: 500,
        image: 'https://www.theaviatorstore.com.au/cdn/shop/products/Bluedial1.webp?v=1672975154&width=1200',
        images: [
          'https://www.theaviatorstore.com.au/cdn/shop/products/bluedial4.webp?v=1672975153&width=1200',
          'https://www.theaviatorstore.com.au/cdn/shop/products/Bluedial3.webp?v=1672975154&width=1200'
        ],
        rating: 4.9,
        reviewCount: 42,
        installments: 10,
        category: 'relogios',
        featured: true,
        stock: 15,
        sizes: ['Único'],
        colors: ['#000080']
      },
      {
        name: 'Boné Boeing',
        slug: 'bone-boeing',
        description: 'Nosso novo boné Boeing apresenta o icônico logo "Boeing" bordado em 3D na parte frontal — o mesmo que estampa as aeronaves fabricadas atualmente. Na parte de trás, conta com o escudo da Red Canoe e a bandeira dos EUA em tecido bordado.\n\nFeito 100% em sarja de algodão escovado\n\nCor: Azul marinho\n\nAlça traseira com velcro ajustável (tamanho único que serve para a maioria)\n\nFuros de ventilação bordados\n\nLimpeza localizada (spot clean)',
        price: 59.99,
        image: 'https://redcanoebrands.com/wp-content/uploads/2018/10/Boeing_cap_NY.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2023/01/U-CAP-BOEING3D-NY_lifestyle2.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2023/01/U-CAP-BOEING3D-NY_lifetsyle1.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2018/10/U-CAP-BOEING3D-NY-B_back.jpg'
        ],
        rating: 4.8,
        reviewCount: 28,
        installments: 4,
        category: 'bones',
        featured: true,
        stock: 30,
        sizes: ['Único'],
        colors: ['#000080']
      },
      {
        name: 'Carteira Boeing',
        slug: 'carteira-boeing',
        description: 'Carteira Boeing - Engenharia de Espaços, Inspirada na precisão e inovação da engenharia aeroespacial da Boeing, esta carteira combina funcionalidade com um design sofisticado.\n\nFeita em couro legítimo (cowhide)\n\nCor: Marrom claro (Tan)\n\nDimensões: 12,7 cm (C) x 10,2 cm (L) x 1,9 cm (P)\n\nUma peça elegante e resistente — perfeita para quem carrega no dia a dia o espírito da aviação.',
        price: 59.99,
        image: 'https://redcanoebrands.com/wp-content/uploads/2022/10/U-WAL-VINTAGELOGO-TN_lifestyle2.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2022/10/U-WAL-VINTAGELOGO-TN_lifestyle1.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2022/10/U-WAL-VINTAGELOGO-TN_lifestyle2.jpg'
        ],
        rating: 4.9,
        reviewCount: 42,
        installments: 6,
        category: 'acessorios',
        featured: true,
        stock: 25,
        sizes: ['Único'],
        colors: ['#D2B48C']
      },
      {
        name: 'Camiseta Longa B17',
        slug: 'camiseta-longa-b17',
        description: 'Celebre a herança de uma das aeronaves mais resistentes do século XX.\n\nFeita 100% de algodão\n\nCor: Cinza\n\nFita de costura em contraste\n\nGola careca canelada\n\nEtiqueta na barra\n\nLavada após a estampa para evitar encolhimento e adicionar um visual vintage\n\nPré-encolhida',
        price: 129.90,
        image: 'https://redcanoebrands.com/wp-content/uploads/2022/05/M-LST-B17-GY_front.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2018/10/M-LST-B17CA-GY-MD_lifestyle2.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2022/05/M-LST-B17-GY_back.jpg'
        ],
        rating: 4.8,
        reviewCount: 25,
        installments: 4,
        category: 'camisetas',
        featured: true,
        stock: 20,
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#808080']
      },
      {
        name: 'Camiseta Feminina B17',
        slug: 'camiseta-feminina-b17',
        description: 'Celebre a história de uma das aeronaves mais resistentes do século XX.\n\nConfeccionada em 100% algodão tipo jersey\n\nCor: Cinza\n\nFita de reforço interna contrastante\n\nGola careca com acabamento canelado\n\nEtiqueta na barra\n\nLavada após a estampa para um toque suave\n\nPré-encolhida\n\nLavar à máquina com água fria e secar em baixa temperatura ou pendurar para secar',
        price: 79.99,
        image: 'https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY-MD_front-1.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY_lifestyle1.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY-MD_lifestyle.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2023/03/L-SST-B17CA-GY_lifestyle1.jpg'
        ],
        rating: 4.9,
        reviewCount: 31,
        installments: 4,
        category: 'camisetas',
        featured: true,
        stock: 25,
        sizes: ['PP', 'P', 'M', 'G', 'GG'],
        colors: ['#808080']
      },
      {
        name: 'Camiseta Feminina Boeing',
        slug: 'camiseta-feminina-boeing',
        description: 'O Boeing 747, conhecido como "Jumbo Jet", revolucionou o mundo ao tornar as viagens aéreas acessíveis às massas e possibilitar voos diretos entre cidades distantes ao redor do globo. Em fevereiro de 1969, o primeiro 747 – número de série 001 – realizou seu voo inaugural sobre o estado de Washington. Comemore esse marco gigante da aviação com nossa camiseta feminina Boeing RA001.\n\nUm novo item indispensável para fãs de aviação. Confeccionada em 100% algodão tipo jersey, com modelagem ajustada e mangas curtas clássicas. Ideal para os dias quentes de verão ou para sobreposição no outono. Lavada após a estampa para um toque vintage único.\n\n100% algodão\n\nCor: Cinza Chumbo (Slate)\n\nFita de reforço interna contrastante\n\nGola careca canelada\n\nEtiqueta na barra\n\nLavada após a estampa\n\nPré-encolhida\n\nCuidados:\nLavar à máquina com água fria. Secar em temperatura baixa ou pendurar para secar.',
        price: 79.99,
        image: 'https://redcanoebrands.com/wp-content/uploads/2020/07/L-SST-BOEING-SL-SM_front.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2020/07/L-SST-BOEING-SL-SM_back-1.jpg'
        ],
        rating: 4.8,
        reviewCount: 25,
        installments: 3,
        category: 'camisetas',
        featured: true,
        stock: 30,
        sizes: ['PP', 'P', 'M', 'G', 'GG'],
        colors: ['#708090']
      },
      {
        name: 'Boné Cessna',
        slug: 'bone-cessna',
        description: 'Quando Clyde Cessna aprendeu a voar sozinho em 1911, deu início a uma relação única entre o ser humano e a máquina. Para milhares de aviadores e entusiastas ao redor do mundo, o nome "Cessna" tornou-se sinônimo de voo. Nossa linha retrô licenciada CESSNA é uma homenagem a esse verdadeiro ícone da aviação.\n\nO boné Cessna Aircraft traz o clássico logotipo da marca bordado em 3D, com ajuste em velcro na parte de trás, garantindo conforto para a maioria dos tamanhos. Desenvolvido para quem vive ao ar livre.\n\nConfeccionado em 100% algodão sarja\n\nCor: Azul marinho\n\nFecho ajustável com velcro (tamanho único com ajuste)\n\nBordado direto em alto relevo\n\nLimpeza localizada recomendada.',
        price: 59.99,
        image: 'https://redcanoebrands.com/wp-content/uploads/2013/04/U-CAP-CESS-01-NY_front.jpg',
        images: [
          'https://redcanoebrands.com/wp-content/uploads/2013/04/U-CAP-CESS-01-NY_lifestyle2_WEB.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2013/04/U-CAP-CESS-01-NY_lifestyle1_WEB.jpg',
          'https://redcanoebrands.com/wp-content/uploads/2013/04/U-CAP-CESS-01-NY_back.jpg'
        ],
        rating: 4.8,
        reviewCount: 15,
        installments: 2,
        category: 'bones',
        featured: true,
        stock: 30,
        sizes: ['Único'],
        colors: ['#000080']
      },

    ];

    products.forEach(product => {
      this.createProduct(product);
    });
  }
}

export const storage = new MemStorage();