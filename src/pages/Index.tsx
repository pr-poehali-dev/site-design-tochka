import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  specs: string[];
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 89990,
    originalPrice: 99990,
    image: "/img/ea7dcf65-1cf4-46db-be35-173a276989d2.jpg",
    category: "Смартфоны",
    specs: ["6.1\" дисплей", "128GB", "48MP камера", "Titanium"],
    inStock: true
  },
  {
    id: 2,
    name: "Gaming Laptop ASUS ROG",
    price: 149990,
    image: "/img/a570c0fe-d658-46c3-89a6-ec425f34508f.jpg",
    category: "Ноутбуки",
    specs: ["RTX 4060", "16GB RAM", "15.6\" FHD 144Hz", "AMD Ryzen 7"],
    inStock: true
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 24990,
    originalPrice: 29990,
    image: "/img/510d108f-1128-4913-837e-07a43f989111.jpg",
    category: "Наушники",
    specs: ["Шумоподавление", "30 часов работы", "Быстрая зарядка", "Hi-Res Audio"],
    inStock: true
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    price: 94990,
    image: "/img/ea7dcf65-1cf4-46db-be35-173a276989d2.jpg",
    category: "Смартфоны",
    specs: ["6.8\" дисплей", "256GB", "200MP камера", "S Pen"],
    inStock: false
  },
  {
    id: 5,
    name: "MacBook Air M3",
    price: 119990,
    image: "/img/a570c0fe-d658-46c3-89a6-ec425f34508f.jpg",
    category: "Ноутбуки",
    specs: ["M3 чип", "8GB RAM", "13.6\" Liquid Retina", "512GB SSD"],
    inStock: true
  },
  {
    id: 6,
    name: "AirPods Pro 2",
    price: 19990,
    image: "/img/510d108f-1128-4913-837e-07a43f989111.jpg",
    category: "Наушники",
    specs: ["ANC", "Spatial Audio", "MagSafe", "USB-C"],
    inStock: true
  }
];

const categories = ["Все", "Смартфоны", "Ноутбуки", "Наушники"];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = selectedCategory === "Все" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-primary">TechStore</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
                <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
                <a href="#delivery" className="text-foreground hover:text-primary transition-colors">Доставка</a>
                <a href="#contacts" className="text-foreground hover:text-primary transition-colors">Контакты</a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors">О нас</a>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 min-w-[300px]">
                <Icon name="Search" size={18} className="text-muted-foreground" />
                <Input 
                  placeholder="Поиск товаров..." 
                  className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
                />
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <Icon name="ShoppingCart" size={18} />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
              
              <Button variant="outline" size="sm" className="md:hidden">
                <Icon name="Menu" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-foreground">
              Лучшая электроника
              <span className="text-primary block">по честным ценам</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Широкий выбор смартфонов, ноутбуков и гаджетов с быстрой доставкой и гарантией качества
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Icon name="ShoppingBag" size={20} className="mr-2" />
                Смотреть каталог
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-muted-foreground">Доставка по России от 1 дня. Бесплатно от 3000₽</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-muted-foreground">Официальная гарантия на все товары до 2 лет</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-muted-foreground">Консультации и помощь в любое время</p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Каталог товаров</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="hover-scale"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover-scale group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-3 left-3 bg-red-500">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary" className="text-sm">Нет в наличии</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs">{product.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="mb-3">
                    <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                      {product.specs.map((spec, index) => (
                        <span key={index} className="truncate">• {spec}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString()}₽
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString()}₽
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="hover-scale"
                    >
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l z-50 animate-slide-in-right">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Корзина</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Корзина пуста</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-primary font-semibold">
                            {item.price.toLocaleString()}₽
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Icon name="Minus" size={12} />
                            </Button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Icon name="Plus" size={12} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 p-0 ml-auto text-destructive"
                            >
                              <Icon name="Trash2" size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-primary">
                      {cartTotal.toLocaleString()}₽
                    </span>
                  </div>
                  <Button className="w-full" size="lg">
                    Оформить заказ
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Delivery Section */}
      <section id="delivery" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Доставка и оплата</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Icon name="Truck" size={24} className="text-primary" />
                  Способы доставки
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Курьерская доставка</h4>
                  <p className="text-sm text-muted-foreground">По Москве — 300₽, бесплатно от 3000₽</p>
                </div>
                <div>
                  <h4 className="font-medium">Пункты выдачи</h4>
                  <p className="text-sm text-muted-foreground">Более 5000 пунктов по всей России — от 150₽</p>
                </div>
                <div>
                  <h4 className="font-medium">Почта России</h4>
                  <p className="text-sm text-muted-foreground">Доставка в любую точку России — от 200₽</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Icon name="CreditCard" size={24} className="text-primary" />
                  Способы оплаты
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Банковской картой</h4>
                  <p className="text-sm text-muted-foreground">Visa, MasterCard, МИР — безопасно и быстро</p>
                </div>
                <div>
                  <h4 className="font-medium">Наличными</h4>
                  <p className="text-sm text-muted-foreground">При получении заказа курьеру или в пункте выдачи</p>
                </div>
                <div>
                  <h4 className="font-medium">Банковский перевод</h4>
                  <p className="text-sm text-muted-foreground">Для юридических лиц с НДС</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Phone" size={48} className="mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                <p className="text-sm text-muted-foreground mt-1">Ежедневно с 9:00 до 21:00</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="Mail" size={48} className="mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@techstore.ru</p>
                <p className="text-sm text-muted-foreground mt-1">Ответим в течение 2 часов</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <Icon name="MapPin" size={48} className="mx-auto text-primary mb-4" />
                <h3 className="font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground">г. Москва, ул. Тверская, д. 1</p>
                <p className="text-sm text-muted-foreground mt-1">Ближайшее метро: Охотный ряд</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">О нас</h2>
            <p className="text-lg text-muted-foreground mb-8">
              TechStore — ведущий интернет-магазин электроники и гаджетов в России. 
              Мы работаем с 2015 года и за это время завоевали доверие более 500 000 покупателей.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500k+</div>
                <p className="text-muted-foreground">Довольных клиентов</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                <p className="text-muted-foreground">Товаров в каталоге</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">8</div>
                <p className="text-muted-foreground">Лет на рынке</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TechStore</h3>
              <p className="text-sm mb-4">
                Лучшая электроника по честным ценам с быстрой доставкой по всей России
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Icon name="Facebook" size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Twitter" size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Instagram" size={16} />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:underline">Смартфоны</a>
                <a href="#" className="block hover:underline">Ноутбуки</a>
                <a href="#" className="block hover:underline">Наушники</a>
                <a href="#" className="block hover:underline">Планшеты</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:underline">Доставка и оплата</a>
                <a href="#" className="block hover:underline">Гарантии</a>
                <a href="#" className="block hover:underline">Возврат товара</a>
                <a href="#" className="block hover:underline">Помощь</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm">
                <p>+7 (495) 123-45-67</p>
                <p>info@techstore.ru</p>
                <p>г. Москва, ул. Тверская, д. 1</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2024 TechStore. Все права защищены.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:underline">Политика конфиденциальности</a>
              <a href="#" className="hover:underline">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}