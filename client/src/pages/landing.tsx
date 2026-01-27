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
  Send,
  Menu,
  X
} from "lucide-react";
import logoImage from "@assets/Беда_1769444292448.png";
import offerUltrasoundImage from "@/assets/images/offer-ultrasound.png";
import offerPartnershipImage from "@/assets/images/offer-partnership.png";
import offerSuppliesImage from "@/assets/images/offer-supplies.png";
import offerDeliveryImage from "@/assets/images/offer-delivery.png";

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
          className="mt-8 w-48 h-1 bg-primary/20 rounded-full overflow-hidden"
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
      
      <motion.div
        className="absolute top-20 left-16 w-3 h-3 rounded-full bg-primary/30"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-24 w-2 h-2 rounded-full bg-primary/40"
        animate={{ y: [0, 8, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-primary/25"
        animate={{ x: [0, 10, 0], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "О нас" },
    { href: "#catalog", label: "Каталог" },
    { href: "#offers", label: "Предложения" },
    { href: "#order", label: "Заказать" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 2.5 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <motion.a
              href="#"
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              data-testid="link-logo"
            >
              <img 
                src={logoImage} 
                alt="МООС" 
                className="h-14 w-auto"
              />
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`font-heading font-medium transition-colors ${
                    isScrolled ? "text-secondary hover:text-primary" : "text-secondary hover:text-primary"
                  }`}
                  whileHover={{ y: -2 }}
                  data-testid={`nav-${link.href.slice(1)}`}
                >
                  {link.label}
                </motion.button>
              ))}
              <Button 
                onClick={() => scrollToSection("#order")}
                className="bg-primary hover:bg-primary/90 text-white"
                data-testid="nav-button-order"
              >
                Связаться
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              data-testid="button-mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex items-center justify-between mb-12">
                <img src={logoImage} alt="МООС" className="h-12 w-auto" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid="button-close-mobile-menu"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
              
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="font-heading text-2xl font-medium text-secondary hover:text-primary text-left"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-auto">
                <Button 
                  onClick={() => scrollToSection("#order")}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
                >
                  Связаться с нами
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MedicalFloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Medical Monitor / Heart Rate Monitor - top right */}
      <motion.svg
        className="absolute top-16 right-4 md:right-12 w-40 h-40 md:w-56 md:h-56 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 5, 0],
          rotate: [0, 3, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="10" y="15" width="80" height="60" rx="5" stroke="#20b4c0" strokeWidth="2" />
        <rect x="15" y="20" width="70" height="45" rx="3" stroke="#20b4c0" strokeWidth="1.5" />
        <path d="M20 45 L30 45 L35 30 L45 60 L55 35 L60 50 L70 45 L80 45" stroke="#20b4c0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="35" y="78" width="30" height="8" rx="2" fill="#0d2d56" fillOpacity="0.3" />
      </motion.svg>

      {/* Syringe - left side */}
      <motion.svg
        className="absolute top-1/4 left-2 md:left-8 w-32 h-32 md:w-44 md:h-44 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ 
          y: [0, 20, 0],
          rotate: [45, 50, 45]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <rect x="35" y="10" width="30" height="60" rx="3" stroke="#0d2d56" strokeWidth="2" />
        <rect x="40" y="5" width="8" height="10" rx="1" fill="#20b4c0" fillOpacity="0.5" />
        <rect x="52" y="5" width="8" height="10" rx="1" fill="#20b4c0" fillOpacity="0.5" />
        <path d="M50 70 L50 90" stroke="#0d2d56" strokeWidth="3" strokeLinecap="round" />
        <path d="M45 75 L55 75" stroke="#0d2d56" strokeWidth="2" />
        <rect x="38" y="25" width="24" height="35" rx="2" fill="#20b4c0" fillOpacity="0.2" />
      </motion.svg>

      {/* Stethoscope - bottom right */}
      <motion.svg
        className="absolute bottom-24 right-2 md:right-16 w-36 h-36 md:w-48 md:h-48 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ 
          y: [0, -12, 0],
          x: [0, -8, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <path d="M30 20 C30 20 25 35 25 50 C25 70 40 80 50 80 C60 80 75 70 75 50 C75 35 70 20 70 20" stroke="#20b4c0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="50" cy="85" r="10" stroke="#0d2d56" strokeWidth="2" fill="#20b4c0" fillOpacity="0.15" />
        <circle cx="30" cy="15" r="6" fill="#0d2d56" fillOpacity="0.3" />
        <circle cx="70" cy="15" r="6" fill="#0d2d56" fillOpacity="0.3" />
      </motion.svg>

      {/* Medical Cross / Plus - center left */}
      <motion.svg
        className="absolute top-2/3 left-6 md:left-24 w-24 h-24 md:w-32 md:h-32 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ 
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="35" y="10" width="30" height="80" rx="5" fill="#20b4c0" fillOpacity="0.3" />
        <rect x="10" y="35" width="80" height="30" rx="5" fill="#20b4c0" fillOpacity="0.3" />
      </motion.svg>

      {/* Pill / Capsule - top center */}
      <motion.svg
        className="absolute top-20 left-1/3 w-20 h-20 md:w-28 md:h-28 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
        animate={{ 
          y: [0, 10, 0],
          rotate: [30, 40, 30]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        <rect x="20" y="30" width="60" height="40" rx="20" stroke="#0d2d56" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="70" stroke="#0d2d56" strokeWidth="1.5" />
        <rect x="20" y="30" width="30" height="40" rx="20" fill="#20b4c0" fillOpacity="0.2" />
      </motion.svg>

      {/* Abstract gradient blobs for depth */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/10 blur-xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary/10 blur-2xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}

function Decorative3DElements({ variant }: { variant: "about" | "catalog" | "offers" | "order" }) {
  const elements = {
    about: null,
    catalog: (
      <>
        <motion.div
          className="absolute -top-20 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-lg"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-10 right-1/3 w-24 h-24 rounded-full bg-secondary/5 blur-lg"
          animate={{ scale: [1, 1.15, 1] }}
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
  className = "",
  id
}: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      id={id}
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
  const blocks = [
    {
      text: "Здоровье пациента начинается с надежности оборудования и безупречности материалов. МООС – это полный цикл обеспечения медицинской сферы: от собственного производства современной аппаратуры и фармацевтики до поставки всех необходимых расходных средств. Мы создаем условия, в которых врачи могут спасать жизни, не думая о логистике, качестве материалов или своевременности поставок.",
      delay: 0.1
    },
    {
      text: "Наша продукция – это строгий контроль на всех этапах, инновационные разработки и соответствие высочайшим стандартам качества. Мы обеспечиваем клиентов всем комплексом: от сложного диагностического оборудования до таких важных мелочей, как маски и перчатки, организуя бесперебойное снабжение любого медицинского учреждения.",
      delay: 0.3
    },
    {
      text: "Выбирая МООС, вы выбираете уверенность в завтрашнем дне для вашего учреждения. Мы берем на себя все задачи по оснащению, чтобы вы могли полностью сосредоточиться на главном – на оказании помощи. МООС – доверьте нам ваше обеспечение!",
      delay: 0.5
    }
  ];

  return (
    <AnimatedSection id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 bg-white overflow-hidden">
      <MedicalFloatingElements />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.h2 
          className="font-heading text-3xl md:text-5xl font-bold text-secondary text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          О нас
        </motion.h2>
        
        <div className="grid gap-8 md:gap-10">
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.7, 
                delay: block.delay,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <Card 
                className="p-6 md:p-8 bg-white border border-primary/10 shadow-sm hover:shadow-md transition-shadow duration-300"
                data-testid={`about-block-${index}`}
              >
                <div className="flex gap-4 md:gap-6">
                  <div className="shrink-0">
                    <motion.div 
                      className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="font-heading text-xl md:text-2xl font-bold text-primary">
                        {index + 1}
                      </span>
                    </motion.div>
                  </div>
                  <p className="text-lg md:text-xl text-secondary/80 leading-relaxed">
                    {block.text}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

function MedicalFurnitureContent() {
  const items = [
    "Стулья, табуреты, кресла, секции",
    "Медицинские кровати и кушетки",
    "Тумбы медицинские и лабораторные",
    "Шкафы медицинские и специализированные",
    "Столы медицинские и лабораторные",
    "Столики медицинские",
    "Тележки и мобильная мебель",
    "Прочая медицинская мебель"
  ];

  return (
    <motion.div
      className="mt-6 pt-6 border-t border-primary/20"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-testid="furniture-content"
    >
      <h4 className="font-heading text-lg font-bold text-secondary mb-3">
        В наличии
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="text-secondary/80 text-sm flex items-start gap-2"
          >
            <span className="text-primary mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ConsumablesContent() {
  const items = [
    "Антисептические и дезинфицирующие средства",
    "Лекарственные препараты",
    "Перевязочные материалы и бинты",
    "Одноразовые медицинские изделия и средства гигиены",
    "Инструменты и расходники для процедур",
    "Диагностические средства и тесты",
    "Канцелярские и хозяйственные товары",
    "Специализированное оборудование и расходники для аппаратов",
    "Гинекологические и урологические материалы",
    "Косметологические и дерматологические средства",
    "Вакцины и аллергены"
  ];

  return (
    <motion.div
      className="mt-6 pt-6 border-t border-primary/20"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      data-testid="consumables-content"
    >
      <h4 className="font-heading text-lg font-bold text-secondary mb-3">
        В наличии
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="text-secondary/80 text-sm flex items-start gap-2"
          >
            <span className="text-primary mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function CatalogSection() {
  const [showFurnitureContent, setShowFurnitureContent] = useState(false);
  const [showConsumablesContent, setShowConsumablesContent] = useState(false);
  
  const categories = [
    {
      title: "Медицинская мебель",
      icon: Armchair,
      description: "Современная и эргономичная мебель для медицинских учреждений",
      expandableType: "furniture" as const
    },
    {
      title: "Медицинское оборудование",
      icon: Stethoscope,
      description: "Высокотехнологичное диагностическое и лечебное оборудование",
      expandableType: null
    },
    {
      title: "Расходные материалы",
      icon: Package,
      description: "Качественные расходные материалы для ежедневной практики",
      expandableType: "consumables" as const
    }
  ];

  return (
    <AnimatedSection id="catalog" className="relative py-20 md:py-32 px-4 bg-muted/30 overflow-hidden">
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
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {categories.map((category, index) => {
            const handleMouseEnter = () => {
              if (category.expandableType === "furniture") setShowFurnitureContent(true);
              if (category.expandableType === "consumables") setShowConsumablesContent(true);
            };
            const handleMouseLeave = () => {
              if (category.expandableType === "furniture") setShowFurnitureContent(false);
              if (category.expandableType === "consumables") setShowConsumablesContent(false);
            };
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleMouseEnter}
                onBlur={handleMouseLeave}
              >
                <Card 
                  className="group relative p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  data-testid={`catalog-card-${index}`}
                  tabIndex={category.expandableType ? 0 : undefined}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-md"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="w-20 h-20 mb-6 rounded-lg bg-primary/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(32, 180, 192, 0.2)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <category.icon className="w-10 h-10 text-primary" />
                    </motion.div>
                    
                    <h3 className="font-heading text-xl font-semibold text-secondary mb-3 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                    
                    {/* Expandable content for Медицинская мебель */}
                    <AnimatePresence>
                      {category.expandableType === "furniture" && showFurnitureContent && (
                        <MedicalFurnitureContent />
                      )}
                    </AnimatePresence>
                    
                    {/* Expandable content for Расходные материалы */}
                    <AnimatePresence>
                      {category.expandableType === "consumables" && showConsumablesContent && (
                        <ConsumablesContent />
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

function OffersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const offers = [
    {
      title: "Стационарные УЗИ-аппараты Alpinion E-CUBE 9",
      text: "Всего 799 тыс. рублей!\n(Возможен торг при заказе любой дополнительной позиции из каталога)",
      image: offerUltrasoundImage
    },
    {
      title: "Индивидуальный план сотрудничества",
      text: "Подберём персональные предложения по стоимости и рассрочке под ваши задачи",
      image: offerPartnershipImage
    },
    {
      title: "Комплексная поставка",
      text: "Оборудование + расходные материалы со скидкой 10%",
      image: offerSuppliesImage
    },
    {
      title: "Бесплатная доставка по всей России",
      text: "Доставим в любой регион",
      image: offerDeliveryImage
    }
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
    <AnimatedSection id="offers" className="relative py-20 md:py-32 px-4 bg-white overflow-hidden">
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
                        className="relative border-0 text-white min-h-[280px] md:min-h-[320px] overflow-hidden"
                        data-testid={`offer-card-${index}`}
                      >
                        {offer.image ? (
                          <>
                            <img 
                              src={offer.image} 
                              alt={offer.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/30" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/90" />
                        )}
                        
                        <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
                          <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-2">
                            {offer.title}
                          </h3>
                          <p className="text-white/90 text-sm md:text-base whitespace-pre-line">
                            {offer.text}
                          </p>
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
    <AnimatedSection id="order" className="relative py-20 md:py-32 px-4 bg-muted/30 overflow-hidden">
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
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
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
              </motion.div>
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
          <div className="text-center md:text-left space-y-2 text-white/80">
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-primary font-medium">ИНН:</span> 7329023822
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-primary font-medium">ОГРН:</span> 1177325003481
            </p>
            <p className="flex items-center gap-2 justify-center md:justify-start">
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
        <Navbar />
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
