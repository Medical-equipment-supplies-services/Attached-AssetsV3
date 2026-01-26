import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Armchair,
  Stethoscope,
  Package,
  Send
} from "lucide-react";
import logoImage from "@assets/Беда_1769444292448.png";

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        <motion.img
          src={logoImage}
          alt="МООС"
          className="w-64 md:w-80 h-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div 
          className="mt-8 w-48 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
      <Decorative3DElements variant="loading" />
    </motion.div>
  );
}

function Decorative3DElements({ variant }: { variant: "loading" | "about" | "catalog" | "offers" | "order" }) {
  const elements = {
    loading: (
      <>
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/10"
          animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-20 w-24 h-24 rounded-lg bg-secondary/10"
          style={{ transform: "rotate(45deg)" }}
          animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-primary/5"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </>
    ),
    about: (
      <>
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary/5 blur-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <div className="absolute top-10 right-10 w-4 h-4 rounded-full bg-primary/30 animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-3 h-3 rounded-full bg-primary/40 animate-pulse-slow animation-delay-200" />
      </>
    ),
    catalog: (
      <>
        <motion.div
          className="absolute -top-20 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-lg"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 right-1/3 w-24 h-24 rounded-lg bg-secondary/5 blur-lg"
          style={{ transform: "rotate(15deg)" }}
          animate={{ rotate: [15, 25, 15] }}
          transition={{ duration: 9, repeat: Infinity }}
        />
      </>
    ),
    offers: (
      <>
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/3 to-transparent pointer-events-none"
        />
        <motion.div
          className="absolute -right-10 top-1/2 w-40 h-40 rounded-full bg-primary/10 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </>
    ),
    order: (
      <>
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-secondary/5 blur-2xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </>
    ),
  };

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{elements[variant]}</div>;
}

function AnimatedSection({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function AboutSection() {
  return (
    <AnimatedSection className="relative py-20 md:py-32 px-4 bg-white overflow-hidden">
      <Decorative3DElements variant="about" />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2 
          className="font-heading text-3xl md:text-5xl font-bold text-secondary text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          О нас
        </motion.h2>
        
        <div className="space-y-6 text-lg md:text-xl text-secondary/80 leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Здоровье пациента начинается с надежности оборудования и безупречности материалов. МООС – это полный цикл обеспечения медицинской сферы: от собственного производства современной аппаратуры и фармацевтики до поставки всех необходимых расходных средств. Мы создаем условия, в которых врачи могут спасать жизни, не думая о логистике, качестве материалов или своевременности поставок.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Наша продукция – это строгий контроль на всех этапах, инновационные разработки и соответствие высочайшим стандартам качества. Мы обеспечиваем клиентов всем комплексом: от сложного диагностического оборудования до таких важных мелочей, как маски и перчатки, организуя бесперебойное снабжение любого медицинского учреждения.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Выбирая МООС, вы выбираете уверенность в завтрашнем дне для вашего учреждения. Мы берем на себя все задачи по оснащению, чтобы вы могли полностью сосредоточиться на главном – на оказании помощи. МООС – доверьте нам ваше обеспечение!
          </motion.p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function CatalogSection() {
  const categories = [
    {
      title: "Медицинская мебель",
      icon: Armchair,
      description: "Современная и эргономичная мебель для медицинских учреждений"
    },
    {
      title: "Медицинское оборудование",
      icon: Stethoscope,
      description: "Высокотехнологичное диагностическое и лечебное оборудование"
    },
    {
      title: "Расходные материалы",
      icon: Package,
      description: "Качественные расходные материалы для ежедневной практики"
    }
  ];

  return (
    <AnimatedSection className="relative py-20 md:py-32 px-4 bg-muted/30 overflow-hidden">
      <Decorative3DElements variant="catalog" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="font-heading text-3xl md:text-5xl font-bold text-secondary text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Каталог продукции
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card 
                className="group relative p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover-elevate"
                data-testid={`catalog-card-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 mb-6 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <category.icon className="w-10 h-10 text-primary" />
                  </div>
                  
                  <h3 className="font-heading text-xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                
                <motion.div
                  className="absolute -bottom-2 -right-2 w-16 h-16 rounded-lg bg-primary/5"
                  style={{ transform: "rotate(15deg)" }}
                  whileHover={{ rotate: 25, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function OffersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const offers = [
    "Специальное предложение (текст на согласовании)",
    "Специальное предложение (текст на согласовании)",
    "Специальное предложение (текст на согласовании)",
    "Специальное предложение (текст на согласовании)"
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection className="relative py-20 md:py-32 px-4 bg-white overflow-hidden">
      <Decorative3DElements variant="offers" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="font-heading text-3xl md:text-5xl font-bold text-secondary text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Специальные предложения
        </motion.h2>
        
        <div className="relative">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="shrink-0 bg-white/80 backdrop-blur-sm"
              data-testid="button-prev-offer"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex-1 overflow-hidden">
              <div className="flex gap-6 md:gap-8">
                {offers.map((offer, index) => {
                  const isActive = index === currentIndex;
                  const isPrev = index === (currentIndex - 1 + offers.length) % offers.length;
                  const isNext = index === (currentIndex + 1) % offers.length;
                  const isVisible = isActive || isPrev || isNext;
                  
                  return (
                    <motion.div
                      key={index}
                      className="min-w-full md:min-w-[calc(33.333%-1.33rem)]"
                      animate={{
                        x: `calc(-${currentIndex * 100}% - ${currentIndex * 1.5}rem)`,
                        opacity: isVisible ? 1 : 0.3,
                        scale: isActive ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Card 
                        className="p-8 bg-gradient-to-br from-secondary to-secondary/90 border-0 text-white min-h-[200px] flex items-center justify-center"
                        data-testid={`offer-card-${index}`}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                            <Package className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-lg font-medium">{offer}</p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="shrink-0 bg-white/80 backdrop-blur-sm"
              data-testid="button-next-offer"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-primary w-8" : "bg-secondary/20"
                }`}
                data-testid={`offer-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function OrderSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Пожалуйста, введите номер телефона";
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Пожалуйста, введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email адрес";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    
    setFormData({ name: "", phone: "", email: "", comment: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <AnimatedSection className="relative py-20 md:py-32 px-4 bg-muted/30 overflow-hidden">
      <Decorative3DElements variant="order" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="font-heading text-3xl md:text-5xl font-bold text-secondary text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Сделать заказ
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-semibold text-secondary mb-8">
              Контактная информация
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Телефон</p>
                  <a 
                    href="tel:+79278088087" 
                    className="text-lg font-medium text-secondary hover:text-primary transition-colors"
                    data-testid="link-phone"
                  >
                    +7 (927) 808-80-87
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Корпоративная почта</p>
                  <a 
                    href="mailto:example@company.ru" 
                    className="text-lg font-medium text-secondary hover:text-primary transition-colors"
                    data-testid="link-email"
                  >
                    example@company.ru
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-white border-0 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-secondary font-medium">
                    Имя <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Введите ваше имя"
                    className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    data-testid="input-name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-secondary font-medium">
                    Телефон <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                    className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                    data-testid="input-phone"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-secondary font-medium">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.ru"
                    className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                    data-testid="input-email"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-secondary font-medium">
                    Комментарий
                  </Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Опишите ваш заказ или задайте вопрос..."
                    rows={4}
                    data-testid="input-comment"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6"
                  disabled={isSubmitting}
                  data-testid="button-submit-order"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Отправить заявку
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <img 
              src={logoImage} 
              alt="МООС" 
              className="h-16 w-auto brightness-0 invert"
            />
          </div>
          
          <div className="text-center md:text-right space-y-2 text-white/80">
            <p className="flex items-center gap-2 justify-center md:justify-end">
              <span className="text-primary font-medium">ИНН:</span> 7329023822
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-end">
              <span className="text-primary font-medium">ОГРН:</span> 1177325003481
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-end">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>433513, Ульяновская область, г. Димитровград, пр-кт Автостроителей, зд. 51</span>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50 text-sm">
          <p>© {new Date().getFullYear()} МООС - Медицинское Оборудование Обеспечение Сервис</p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <main className="min-h-screen bg-white">
          <AboutSection />
          <CatalogSection />
          <OffersSection />
          <OrderSection />
          <Footer />
        </main>
      </motion.div>
    </>
  );
}
