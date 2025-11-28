import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Language = "en" | "ru" | "az";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.addressContact": "Address & Contact",
    "nav.getInTouch": "Get In Touch",
    "nav.yourName": "Ibrahim Abdullayev",

    // Hero
    "hero.badge": "Your Flight Expert",
    "hero.name": "Ibrahim Abdullayev",
    "hero.tagline": "Smart Flight Booking Consultation & Travel Solutions",
    "hero.welcome1": "Welcome! I help travelers find the best flight deals and navigate the complexities of air travel booking. With extensive knowledge of airline systems, booking strategies, and travel regulations, I ensure you get the most value from every journey.",
    "hero.welcome2": "Whether you're planning a business trip, family vacation, or multi-destination adventure, I'm here to help you book smarter, save money, and travel with confidence.",
    "hero.exploreServices": "Explore Services",
    "hero.getInTouch": "Get Consultation",
    "hero.quickContact": "Leave your contact info for a quick response:",
    "hero.emailPlaceholder": "Email",
    "hero.phonePlaceholder": "Phone (+994...)",
    "hero.submitContact": "Submit",

    // About
    "about.title": "About Me",
    "about.subtitle": "Dedicated flight booking specialist passionate about helping travelers find the perfect flights at the best prices.",
    "about.journeyTitle": "My Journey in Travel",
    "about.journey1": "My expertise in flight booking comes from years of experience navigating airline systems, understanding fare structures, and staying updated with the constantly changing world of air travel. I've helped countless travelers save money and avoid common booking mistakes.",
    "about.journey2": "I specialize in finding optimal routes, timing bookings for best prices, understanding airline policies, and navigating complex itineraries. My approach combines deep industry knowledge with personalized service to ensure each client gets exactly what they need.",
    "about.journey3": "I believe that smart travel starts with smart booking. Every flight search is unique, and I take pride in finding solutions that match your budget, schedule, and preferences. My commitment is to make air travel more accessible and affordable for everyone.",
    "about.quote": "The best flight isn't always the cheapest or fastest—it's the one that perfectly fits your needs.",
    "about.highlight1Title": "Price Optimization",
    "about.highlight1Desc": "Finding the best deals through timing, routes, and booking strategies.",
    "about.highlight2Title": "Expert Knowledge",
    "about.highlight2Desc": "Deep understanding of airline systems, fare classes, and travel regulations.",
    "about.highlight3Title": "Personalized Service",
    "about.highlight3Desc": "Tailored recommendations based on your specific travel needs and preferences.",
    "about.highlight4Title": "Trusted Guidance",
    "about.highlight4Desc": "Clear, honest advice to help you make informed booking decisions.",
    "about.beyondTitle": "Beyond Flight Booking",
    "about.beyond1": "When I'm not helping clients with their travel plans, I enjoy exploring new destinations myself and staying updated on the latest trends in air travel. I'm passionate about making travel accessible and believe everyone deserves to fly without overpaying.",
    "about.beyond2": "My love for travel extends beyond just booking flights—it's about connecting people with places and experiences. This passion drives me to constantly improve my knowledge and provide the best possible service to every client.",

    // Services
    "services.title": "My Services",
    "services.subtitle": "Comprehensive flight booking consultation designed to save you time, money, and stress.",
    "services.service1Title": "Flight Search & Booking",
    "services.service1Tagline": "Find Your Perfect Flight",
    "services.service1Desc": "Complete assistance with searching and booking flights. I'll find the best routes, optimal connection times, and competitive prices for your journey.",
    "services.service1Feature1": "Multi-platform fare comparison",
    "services.service1Feature2": "Optimal routing and timing strategies",
    "services.service1Feature3": "Booking assistance and confirmation",
    "services.service1CTA": "Book Now",
    "services.service2Title": "Complex Itinerary Planning",
    "services.service2Tagline": "Multi-City & Long-Haul Experts",
    "services.service2Desc": "Specialized help for complex travel plans including multi-city trips, round-the-world tickets, and long-haul flights with optimal connections.",
    "services.service2Feature1": "Multi-destination route optimization",
    "services.service2Feature2": "Connection time and airport guidance",
    "services.service2Feature3": "Long-haul comfort recommendations",
    "services.service2CTA": "Plan Journey",
    "services.service3Title": "Travel Consultation",
    "services.service3Tagline": "Expert Advice When You Need It",
    "services.service3Desc": "One-on-one consultation to answer all your flight booking questions, explain airline policies, and provide personalized recommendations for your specific travel needs.",
    "services.service3Feature1": "Visa and travel document guidance",
    "services.service3Feature2": "Airline policy explanations",
    "services.service3Feature3": "Travel timing recommendations",
    "services.service3CTA": "Get Advice",
    "services.ctaTitle": "Ready to Book Your Next Flight?",
    "services.ctaDesc": "Let's work together to find the perfect flights for your journey. Get expert guidance and save money on your next booking.",
    "services.ctaButton": "Start Planning",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle": "Ready to book smarter? Contact me today for personalized flight booking consultation.",
    "contact.formTitle": "Send a Message",
    "contact.successMessage": "Thank you! I'll get back to you within 24 hours.",
    "contact.errorMessage": "Oops! Something went wrong. Please try again or contact me directly via email or WhatsApp.",
    "contact.nameLabel": "Your Name",
    "contact.namePlaceholder": "John Doe",
    "contact.emailLabel": "Email Address",
    "contact.emailPlaceholder": "john@example.com",
    "contact.messageLabel": "Travel Plans",
    "contact.messagePlaceholder": "Tell me about your travel plans: destination, dates, preferences...",
    "contact.sendButton": "Send Message",
    "contact.sending": "Sending...",
    "contact.infoTitle": "Contact Information",
    "contact.emailInfo": "Email",
    "contact.phoneInfo": "WhatsApp",
    "contact.locationInfo": "Location",
    "contact.emailValue": "ibrahim.abdullayev1@gmail.com",
    "contact.phoneValue": "Message on WhatsApp",
    "contact.locationValue": "Baku, Rashid Behbudov str, Azerbaijan",
    "contact.socialTitle": "Connect With Me",
    "contact.socialDesc": "Follow for travel tips, flight deals, and booking advice.",
    "contact.availabilityTitle": "Response Time",
    "contact.availabilityDesc": "I typically respond within 24 hours. For urgent travel bookings, please mention it in your message.",

    // Footer
    "footer.copyright": "© 2024 Ibrahim Abdullayev. All rights reserved.",
    
    // Welcome Modal
    "welcome.title": "Welcome to Flight Expert!",
    "welcome.subtitle": "Your journey to smarter flight booking starts here",
    "welcome.question": "How can I help you today?",
    "welcome.whatsappButton": "WhatsApp",
    "welcome.whatsappDesc": "Get instant response",
    "welcome.whatsappMessage": "Hello! I would like to get flight booking consultation.",
    "welcome.instagramButton": "Instagram",
    "welcome.instagramDesc": "Follow & Message",
    "welcome.browseSite": "Browse the Website",
    "welcome.footer": "This message will only show once",
    
    // WhatsApp Floating Button
    "whatsapp.defaultMessage": "Hello! I would like to inquire about flight booking services.",
    "whatsapp.tooltip": "Chat with us on WhatsApp",
    
    // Contact Modal
    "contact.modalTitle": "Get in Touch",
    "contact.modalSubtitle": "Choose your preferred contact method",
    "contact.whatsappMessage": "Hello! I would like to get flight booking consultation.",
    "contact.whatsappDesc": "Instant reply",
    "contact.instagramDesc": "Direct message",
    "contact.emailSubject": "Flight Booking Consultation Request",
    "contact.emailBody": "Hello Ibrahim,\n\nI would like to inquire about your flight booking services.\n\nThank you!",
    "contact.emailDesc": "Send email",
    "contact.modalFooter": "Available 24/7 for your convenience",
    "contact.quickContact": "Quick Contact",
    
    // Blog
    "blog.badge": "Travel Insights",
    "blog.title": "Flight Booking Tips & Insights",
    "blog.subtitle": "Expert advice and industry insights to help you book smarter and save money on flights.",
    "blog.noPosts": "No blog posts yet. Check back soon!",
    
    // Blog Post 1
    "blog.post1.title": "10 Essential Flight Booking Tips for 2024",
    "blog.post1.date": "December 2024",
    "blog.post1.excerpt": "Master the art of finding the best flight deals with these proven strategies. Learn when to book, how to compare prices, and insider tricks that can save you hundreds.",
    "blog.post1.content": "Booking flights doesn't have to be stressful or expensive. Here are my top 10 tips based on years of experience:\n\n1. Book 2-3 months in advance for international flights\n2. Use incognito mode to avoid price tracking\n3. Be flexible with your travel dates\n4. Compare multiple booking platforms\n5. Consider nearby airports\n6. Sign up for fare alerts\n7. Understand airline fare classes\n8. Book on Tuesdays and Wednesdays\n9. Avoid peak travel seasons\n10. Use airline miles strategically\n\nEach of these strategies can save you 10-30% on your flights. The key is combining multiple techniques for maximum savings.",
    "blog.post1.referencesTitle": "References & Resources",
    
    // Blog Post 2
    "blog.post2.title": "Hidden Airline Fees: What You Need to Know",
    "blog.post2.date": "November 2024",
    "blog.post2.excerpt": "Airlines have dozens of hidden fees that can double your ticket price. Learn how to identify and avoid unnecessary charges on baggage, seats, and more.",
    "blog.post2.content": "Hidden fees are one of the biggest frustrations for travelers. Here's what to watch out for:\n\nBaggage Fees: Check size and weight limits before you pack. Many airlines charge $30-60 per checked bag.\n\nSeat Selection: Basic economy often excludes seat selection. You might pay $15-50 to choose your seat.\n\nChange Fees: Some airlines charge $200+ to change your flight. Look for flexible fare options.\n\nPriority Boarding: Unless you have status, you'll pay $10-30 for early boarding.\n\nMy advice: Always read the fine print and calculate total costs before booking. Sometimes a slightly more expensive ticket with included benefits is actually cheaper overall.",
    "blog.post2.referencesTitle": "Additional Reading",
    
    // Blog Post 3
    "blog.post3.title": "Best Time to Book Flights: Data-Driven Guide",
    "blog.post3.date": "October 2024",
    "blog.post3.excerpt": "When is the absolute best time to book flights? I analyzed thousands of bookings to find the optimal booking windows for domestic and international travel.",
    "blog.post3.content": "After analyzing booking data, here are the optimal booking windows:\n\nDomestic Flights:\n• Book 3-6 weeks in advance\n• Best days to fly: Tuesday and Wednesday\n• Avoid holiday weekends\n\nInternational Flights:\n• Book 2-3 months in advance\n• For Europe: January-March and September-October are cheapest\n• For Asia: November-February offers best deals\n\nLast-Minute Bookings:\n• Can work for domestic flights (within 2 weeks)\n• Rarely beneficial for international travel\n• Best for flexible travelers\n\nRemember: These are guidelines. Use fare alerts and monitor prices for your specific route.",
    "blog.post3.referencesTitle": "Data Sources",
    
    // Stats
    "stats.badge": "Proven Results",
    "stats.title": "Numbers That Speak",
    "stats.subtitle": "Helping travelers save money and book smarter flights worldwide.",
    "stats.clients": "Happy Clients",
    "stats.countries": "Countries Served",
    "stats.saved": "Total Saved",
    "stats.support": "Support",
    
    // Testimonials
    "testimonials.badge": "Client Success Stories",
    "testimonials.title": "What Clients Say",
    "testimonials.subtitle": "Real experiences from travelers who've saved money and time with expert flight booking consultation.",
    "testimonials.client1Name": "Ali Mammadov",
    "testimonials.client1Role": "Business Traveler",
    "testimonials.client1Content": "Ibrahim helped me save over $500 on my business trip to London. His knowledge of airline systems and timing is incredible!",
    "testimonials.client2Name": "Leyla Hasanova",
    "testimonials.client2Role": "Family Vacation Planner",
    "testimonials.client2Content": "Planning our family trip was stress-free thanks to Ibrahim. He found perfect flights within our budget and schedule.",
    "testimonials.client3Name": "Omar Al-Rashid",
    "testimonials.client3Role": "Frequent Flyer",
    "testimonials.client3Content": "Best flight consultation service I've used. Ibrahim understands complex routes and always finds the best deals.",
    "testimonials.client4Name": "Elena Volkova",
    "testimonials.client4Role": "Digital Nomad",
    "testimonials.client4Content": "As someone who travels constantly, Ibrahim's expertise has been invaluable. Highly recommended!",
    "testimonials.client5Name": "James Mitchell",
    "testimonials.client5Role": "Adventure Traveler",
    "testimonials.client5Content": "Ibrahim helped me plan a complex multi-city Asian trip. Every connection was perfect and prices were unbeatable.",
    "testimonials.client6Name": "Sarah Johnson",
    "testimonials.client6Role": "Corporate Travel Manager",
    "testimonials.client6Content": "We've saved thousands on corporate travel thanks to Ibrahim's booking strategies and airline knowledge.",
    "testimonials.cta": "Join hundreds of satisfied travelers who've saved money with expert flight booking consultation.",
    
    // FAQ
    "faq.badge": "Common Questions",
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you need to know about flight booking consultation services.",
    "faq.q1": "How does your flight booking consultation work?",
    "faq.a1": "I analyze your travel needs, search multiple platforms for the best deals, compare routes and airlines, and provide personalized recommendations. I can either guide you through the booking or handle it for you.",
    "faq.q2": "What are your consultation fees?",
    "faq.a2": "My fees vary based on trip complexity. Simple round-trip bookings start at a minimal consultation fee, while complex multi-city itineraries may cost more. The savings I find typically far exceed the consultation cost.",
    "faq.q3": "How much can I save using your service?",
    "faq.a3": "Savings vary by route and timing, but clients typically save 20-40% on flight costs through optimal booking timing, route selection, and fare class strategies. On international trips, savings often reach hundreds of dollars.",
    "faq.q4": "Do you work with specific airlines?",
    "faq.a4": "No, I'm completely independent and work with all major airlines. This allows me to find the truly best option for your needs without bias toward any specific carrier.",
    "faq.q5": "How far in advance should I contact you?",
    "faq.a5": "For best results, contact me 2-3 months before international trips and 3-6 weeks before domestic flights. However, I can also help with last-minute bookings and find the best available options.",
    "faq.q6": "What if I need to change or cancel my flight?",
    "faq.a6": "I provide guidance on airline policies and help you understand change/cancellation terms before booking. If changes are needed later, I can assist with the process and help minimize fees.",
    "faq.ctaTitle": "Still Have Questions?",
    "faq.ctaDesc": "Contact me directly for personalized answers to your flight booking questions.",
    "faq.ctaButton": "Get In Touch",
    
    // Process Steps
    "process.badge": "Simple Process",
    "process.title": "How It Works",
    "process.subtitle": "Four easy steps to smarter flight booking and significant savings.",
    "process.step1Title": "Contact Me",
    "process.step1Desc": "Reach out via email, WhatsApp, or the contact form with your travel plans.",
    "process.step2Title": "Share Requirements",
    "process.step2Desc": "Tell me your destinations, dates, preferences, and budget constraints.",
    "process.step3Title": "Get Expert Options",
    "process.step3Desc": "I'll research and present the best flight options with detailed comparisons.",
    "process.step4Title": "Book & Save",
    "process.step4Desc": "Choose your preferred option and book with confidence knowing you got the best deal.",
    "process.cta": "Ready to start saving on your next flight?",
  },
  ru: {
    // Navigation
    "nav.home": "Главная",
    "nav.about": "О себе",
    "nav.services": "Услуги",
    "nav.blog": "Блог",
    "nav.contact": "Контакты",
    "nav.addressContact": "Адрес и Контакты",
    "nav.getInTouch": "Связаться",
    "nav.yourName": "Ибрагим Абдуллаев",

    // Hero
    "hero.badge": "Ваш Эксперт по Авиабилетам",
    "hero.name": "Ибрагим Абдуллаев",
    "hero.tagline": "Умное Бронирование Авиабилетов и Туристические Решения",
    "hero.welcome1": "Добро пожаловать! Я помогаю путешественникам находить лучшие предложения авиабилетов и ориентироваться в сложностях бронирования авиаперелётов. Благодаря обширным знаниям авиасистем, стратегий бронирования и правил путешествий, я обеспечиваю максимальную ценность каждой поездки.",
    "hero.welcome2": "Независимо от того, планируете ли вы деловую поездку, семейный отпуск или многонаправленное приключение, я здесь, чтобы помочь вам бронировать умнее, экономить деньги и путешествовать с уверенностью.",
    "hero.exploreServices": "Изучить Услуги",
    "hero.getInTouch": "Получить Консультацию",
    "hero.quickContact": "Оставьте свои контакты для быстрой связи:",
    "hero.emailPlaceholder": "Email",
    "hero.phonePlaceholder": "Телефон (+994...)",
    "hero.submitContact": "Отправить",

    // About
    "about.title": "О Себе",
    "about.subtitle": "Преданный специалист по бронированию авиабилетов, увлечённый помощью путешественникам в поиске идеальных рейсов по лучшим ценам.",
    "about.journeyTitle": "Мой Путь в Туризме",
    "about.journey1": "Моя экспертиза в бронировании авиабилетов происходит из многолетнего опыта навигации в авиасистемах, понимания тарифных структур и поддержания актуальности в постоянно меняющемся мире авиаперевозок. Я помог бесчисленным путешественникам сэкономить деньги и избежать распространённых ошибок бронирования.",
    "about.journey2": "Я специализируюсь на поиске оптимальных маршрутов, выборе в��емени бронирования для лучших цен, понимании политик авиакомпаний и навигации по сложным маршрутам. Мой подход сочетает глубокие отраслевые знания с персонализированным обслуживанием, чтобы каждый клиент получил именно то, что ему нужно.",
    "about.journey3": "Я верю, что умное путешествие начинается с умного бронирования. Каждый поиск рейса уникален, и я горжусь поиском решений, которые соответствуют вашему бюджету, расписанию и предпочтениям. Моё обязательство — сделать авиаперелёты более доступными и доступными по цене для всех.",
    "about.quote": "Лучший рейс не всегда самый дешёвый или быстрый—это тот, который идеально соответствует вашим потребностям.",
    "about.highlight1Title": "Оптимизация Цен",
    "about.highlight1Desc": "Поиск лучших предложений через выбор времени, маршруты и стратегии бронирования.",
    "about.highlight2Title": "Экспертные Знания",
    "about.highlight2Desc": "Глубокое понимание авиасистем, тарифных классов и правил путешествий.",
    "about.highlight3Title": "Персональный Сервис",
    "about.highlight3Desc": "Индивидуальные рекомендации на основе ваших конкретных потребностей в путешествиях.",
    "about.highlight4Title": "Надёжное Руководство",
    "about.highlight4Desc": "Чёткие, честные советы для принятия обоснованных решений о бронировании.",
    "about.beyondTitle": "Помимо Бронирования Авиабилетов",
    "about.beyond1": "Когда я не помогаю клиентам с их планами путешествий, я наслаждаюсь исследованием новых направлений сам и слежу за последними трендами в авиаперевозках. Я увлечён тем, чтобы сделать путешествия доступными, и верю, что каждый заслуживает летать, не переплачивая.",
    "about.beyond2": "Моя любовь к путешествиям выходит за рамки простого бронирования авиабилетов—это о соединении людей с местами и впечатлениями. Эта страсть побуждает меня постоянно улучшать свои знания и предоставлять лучший возможный сервис каждому клиенту.",

    // Services
    "services.title": "Мои Услуги",
    "services.subtitle": "Комплексная консультация по бронированию авиабилетов, разработанная для экономии вашего времени, денег и стресса.",
    "services.service1Title": "Поиск и Бронирование Авиабилетов",
    "services.service1Tagline": "Найдите Ваш Идеальный Рейс",
    "services.service1Desc": "Полная помощь в поиске и бронировании авиабилетов. Я найду лучшие маршруты, оптимальное время пересадок и конкурентные цены для вашего путешествия.",
    "services.service1Feature1": "Сравнение тарифов на нескольких платформах",
    "services.service1Feature2": "Стратегии оптимального маршрутизирования и выбора времени",
    "services.service1Feature3": "Помощь в бронировании и подтверждение",
    "services.service1CTA": "Забронировать",
    "services.service2Title": "Планирование Сложных Маршрутов",
    "services.service2Tagline": "Эксперты по Мульти-городским и Дальним Перелётам",
    "services.service2Desc": "Специализированная помощь для сложных планов путешествий, включая мульти-городские поездки, кругосветные билеты и дальние перелёты с оптимальными пересадками.",
    "services.service2Feature1": "Оптимизация маршрутов в несколько направлений",
    "services.service2Feature2": "Рекомендации по времени пересадок и аэропортам",
    "services.service2Feature3": "Рекомендации по комфорту дальних перелётов",
    "services.service2CTA": "Планировать Путешествие",
    "services.service3Title": "Туристическая Консультация",
    "services.service3Tagline": "Экспертный Совет Когда Вам Нужно",
    "services.service3Desc": "Индивидуальная консультация для ответа на все ваши вопросы о бронировании авиабилетов, объяснения политик авиакомпаний и предоставления персонализированных рекомендаций для ваших конкретных потребностей в путешествиях.",
    "services.service3Feature1": "Руководство по визам и туристическим документам",
    "services.service3Feature2": "Объяснения политик авиакомпаний",
    "services.service3Feature3": "Рекомендации по срокам путешествий",
    "services.service3CTA": "Получить Совет",
    "services.ctaTitle": "Готовы Забронировать Следующий Рейс?",
    "services.ctaDesc": "Давайте работать вместе, чтобы найти идеальные рейсы для вашего путешествия. Получите экспертное руководство и сэкономьте деньги на следующем бронировании.",
    "services.ctaButton": "Начать Планирование",

    // Contact
    "contact.title": "Связаться",
    "contact.subtitle": "Готовы бронировать умнее? Свяжитесь со мной сегодня для персонализированной консультации по бронированию авиабилетов.",
    "contact.formTitle": "Отправить Сообщение",
    "contact.successMessage": "Спасибо! Я свяжусь с вами в течение 24 часов.",
    "contact.errorMessage": "Ой! Что-то пошло не так. Пожалуйста, попробуйте снова или свяжитесь со мной напрямую по электронной почте или WhatsApp.",
    "contact.nameLabel": "Ваше Имя",
    "contact.namePlaceholder": "Иван Иванов",
    "contact.emailLabel": "Электронная Почта",
    "contact.emailPlaceholder": "ivan@example.com",
    "contact.messageLabel": "Планы Путешествий",
    "contact.messagePlaceholder": "Расскажите о своих планах путешествий: направление, даты, предпочтения...",
    "contact.sendButton": "Отправить Сообщение",
    "contact.sending": "Отправка...",
    "contact.infoTitle": "Контактная Информация",
    "contact.emailInfo": "Электронная Почта",
    "contact.phoneInfo": "WhatsApp",
    "contact.locationInfo": "Местоположение",
    "contact.emailValue": "ibrahim.abdullayev1@gmail.com",
    "contact.phoneValue": "Message on WhatsApp",
    "contact.locationValue": "Азербайджан / Весь Мир",
    "contact.socialTitle": "Свяжитесь со Мной",
    "contact.socialDesc": "Следите за туристическими советами, предложениями авиабилетов и советами по бронированию.",
    "contact.availabilityTitle": "Время Ответа",
    "contact.availabilityDesc": "Обычно я отвечаю в течение 24 часов. Для срочных бронирований, пожалуйста, упомяните это в своём сообщении.",

    // Footer
    "footer.copyright": "© 2024 Ибрагим Абдуллаев. Все права защищены.",
    
    // Welcome Modal
    "welcome.title": "Добро пожаловать к Эксперту по Авиабилетам!",
    "welcome.subtitle": "Ваше путешествие к умному бронированию начинается здесь",
    "welcome.question": "Чем я могу вам помочь сегодня?",
    "welcome.whatsappButton": "WhatsApp",
    "welcome.whatsappDesc": "Мгновенный ответ",
    "welcome.whatsappMessage": "Здравствуйте! Я хотел бы получить консультацию по бронированию авиабилетов.",
    "welcome.instagramButton": "Instagram",
    "welcome.instagramDesc": "Подписаться и Написать",
    "welcome.browseSite": "Просмотреть Сайт",
    "welcome.footer": "Это сообщение появится только один раз",
    
    // WhatsApp Floating Button
    "whatsapp.defaultMessage": "Здравствуйте! Я хотел бы узнать о ваших услугах по бронированию авиабилетов.",
    "whatsapp.tooltip": "Напишите нам в WhatsApp",
    
    // Contact Modal
    "contact.modalTitle": "Свяжитесь с Нами",
    "contact.modalSubtitle": "Выберите удобный способ связи",
    "contact.whatsappMessage": "Здравствуйте! Я хотел бы получить консультацию по бронированию авиабилетов.",
    "contact.whatsappDesc": "Быстрый ответ",
    "contact.instagramDesc": "Прямое сообщение",
    "contact.emailSubject": "Запрос на Консультацию по Бронированию",
    "contact.emailBody": "Здравствуйте, Ибрагим,\n\nЯ хотел бы узнать о ваших услугах по бронированию авиабилетов.\n\nСпасибо!",
    "contact.emailDesc": "Отправить email",
    "contact.modalFooter": "Доступны 24/7 для вашего удобства",
    "contact.quickContact": "Быстрая Связь",
    
    // Blog
    "blog.badge": "Советы по Путешествиям",
    "blog.title": "Советы и Рекомендации по Бронированию",
    "blog.subtitle": "Экспертные советы и отраслевые знания для умного бронирования и экономии на авиабилетах.",
    "blog.noPosts": "Пока нет постов блога. Скоро будут!",
    
    // Blog Post 1
    "blog.post1.title": "10 Главных Советов по Бронированию Авиабилетов 2024",
    "blog.post1.date": "Декабрь 2024",
    "blog.post1.excerpt": "Освойте искусство поиска лучших предложений авиабилетов с помощью этих проверенных стратегий. Узнайте, когда бронировать, как сравнивать цены и инсайдерские трюки.",
    "blog.post1.content": "Бронирование авиабилетов не должно быть стрессовым или дорогим. Вот мои топ 10 советов на основе многолетнего опыта:\n\n1. Бронируйте за 2-3 месяца для международных рейсов\n2. Используйте режим инкогнито чтобы избежать отслеживания цен\n3. Будьте гибкими с датами путешествия\n4. Сравнивайте несколько платформ бронирования\n5. Рассмотрите близлежащие аэропорты\n6. Подпишитесь на уведомления о тарифах\n7. Понимайте классы тарифов авиакомпаний\n8. Бронируйте во вторник и среду\n9. Избегайте пиковых сезонов\n10. Стратегически используйте авиамили\n\nКаждая из этих стратегий может сэкономить 10-30% на авиабилетах. Ключ — комбинирование нескольких техник.",
    "blog.post1.referencesTitle": "Ссылки и Ресурсы",
    
    // Blog Post 2
    "blog.post2.title": "Скрытые Сборы Авиакомпаний: Что Нужно Знать",
    "blog.post2.date": "Ноябрь 2024",
    "blog.post2.excerpt": "У авиакомпаний десятки скрытых сборов, которые могут удвоить цену билета. Узнайте, как выявить и избежать ненужных расходов на багаж, места и прочее.",
    "blog.post2.content": "Скрытые сборы — одно из самых больших разочарований для путешественников. Вот на что обратить внимание:\n\nСборы за Багаж: Проверьте размер и вес до упаковки. Многие авиакомпании берут $30-60 за зарегистрированный багаж.\n\nВыбор Места: Базовый эконом часто исключает выбор места. Вы можете заплатить $15-50 за выбор места.\n\nСборы за Изменения: Некоторые авиакомпании берут $200+ за изменение рейса. Ищите гибкие тарифы.\n\nПриоритетная Посадка: Без статуса вы заплатите $10-30 за раннюю посадку.\n\nМой совет: Всегда читайте мелкий шрифт и рассчитывайте общие затраты перед бронированием.",
    "blog.post2.referencesTitle": "Дополнительное Чтение",
    
    // Blog Post 3
    "blog.post3.title": "Лучшее Время для Бронирования: Руководство на Основе Данных",
    "blog.post3.date": "Октябрь 2024",
    "blog.post3.excerpt": "Когда абсолютно лучшее время для бронирования авиабилетов? Я проанализировал тысячи бронирований чтобы найти оптимальные окна для внутренних и международных поездок.",
    "blog.post3.content": "После анализа данных бронирования, вот оптимальные окна:\n\nВнутренние Рейсы:\n• Бронируйте за 3-6 недель\n• Лучшие дни для полетов: вторник и среда\n• Избегайте праздничных выходных\n\nМеждународные Рейсы:\n• Бронируйте за 2-3 месяца\n• Для Европы: январь-март и сентябрь-октябрь самые дешевые\n• Для Азии: ноябрь-февраль лучшие предложения\n\nБронирование в Последнюю Минуту:\n• Может сработать для внутренних рейсов (в пределах 2 недель)\n• Редко выгодно для международных поездок\n• Лучше для гибких путешественников\n\nПомните: Это руководства. Используйте уведомления о тарифах для вашего маршрута.",
    "blog.post3.referencesTitle": "Источники Данных",
    
    // Stats
    "stats.badge": "Доказанные Результаты",
    "stats.title": "Числа, Которые Говорят",
    "stats.subtitle": "Помощь путешественникам экономить деньги и бронировать умные рейсы по всему миру.",
    "stats.clients": "Счастливые Клиенты",
    "stats.countries": "Страны, Которые Обслуживаются",
    "stats.saved": "Всего Сохранено",
    "stats.support": "Поддержка",
    
    // Testimonials
    "testimonials.badge": "Истории Успеха Клиентов",
    "testimonials.title": "Что Говорят Клиенты",
    "testimonials.subtitle": "Реальные опытные данные от путешественников, которые сэкономили деньги и время благодаря экспертной консультации по бронированию авиабилетов.",
    "testimonials.client1Name": "Али Мамадов",
    "testimonials.client1Role": "Деловой Путешественник",
    "testimonials.client1Content": "Ибрагим помог мне сэкономить более $500 на деловой поездке в Лондон. Его знание авиасистем и времени бронирования невероятно!",
    "testimonials.client2Name": "Лейла Хасанова",
    "testimonials.client2Role": "Планировщик Семейного Отпуска",
    "testimonials.client2Content": "Планирование семейного отпуска было без стресса благодаря Ибрагиму. Он нашёл идеальные рейсы в рамках моего бюджета и расписания.",
    "testimonials.client3Name": "Омар Аль-Рашид",
    "testimonials.client3Role": "Частый Путешественник",
    "testimonials.client3Content": "Лучшая служба консультации по бронированию авиабилетов, которую я использовал. Ибрагим понимает сложные маршруты и всегда находит лучшие предложения.",
    "testimonials.client4Name": "Елена Волкова",
    "testimonials.client4Role": "Цифровой Номад",
    "testimonials.client4Content": "Как человек, который путешествует постоянно, экспертиза Ибрагима была невероятно ценной. Высоко рекомендую!",
    "testimonials.client5Name": "Джеймс Митчелл",
    "testimonials.client5Role": "Путешественник-Приключенец",
    "testimonials.client5Content": "Ибрагим помог мне спланировать сложный мультигородский азиатский рейс. Каждая пересадка была идеальной, а цены были невероятно выгодными.",
    "testimonials.client6Name": "Сара Джонсон",
    "testimonials.client6Role": "Менеджер Корпоративных Путешествий",
    "testimonials.client6Content": "Мы сэкономили тысячи долларов на корпоративных путешествиях благодаря стратегиям бронирования и знаниям о авиакомпаниях Ибрагима.",
    "testimonials.cta": "Присоединяйтесь к сотням довольных путешественников, которые сэкономили деньги благодаря экспертной консультации по бронированию авиабилетов.",
    
    // FAQ
    "faq.badge": "Часто Задаваемые Вопросы",
    "faq.title": "Часто Задаваемые Вопросы",
    "faq.subtitle": "Всё, что вам нужно знать о услугах консультации по бронированию авиабилетов.",
    "faq.q1": "Как работает ваша консультация по бронированию авиабилетов?",
    "faq.a1": "Я анализирую ваши потребности в путешествии, ищу лучшие предложения на нескольких платформах, сравниваю маршруты и авиакомпании, и предоставляю персонализированные рекомендации. Я могу либо направить вас через процесс бронирования, либо сделать это за вас.",
    "faq.q2": "Каковы ваши консультационные сборы?",
    "faq.a2": "Мои сборы зависят от сложности поездки. Простые рейсы в оба конца начинаются с минимальных консультационных сборов, в то время как сложные мультигородные маршруты могут стоить больше. Сбережения, которые я нахожу, обычно значительно превышают консультационные сборы.",
    "faq.q3": "Сколько я могу сэкономить, используя вашу услугу?",
    "faq.a3": "Сбережения зависят от маршрута и времени, но клиенты обычно сэкономляют 20-40% от стоимости рейсов благодаря оптимальному времени бронирования, выбору маршрута и стратегиям классов тарифов. На международных рейсах сбережения часто достигают сотен долларов.",
    "faq.q4": "Вы работаете с конкретными авиакомпаниями?",
    "faq.a4": "Нет, я полностью независим и работаю со всеми крупными авиакомпаниями. Это позволяет мне найти действительно лучший вариант для ваших потребностей без предвзятости к какой-либо конкретной перевозчику.",
    "faq.q5": "Сколько времени заранее мне следует связаться с вами?",
    "faq.a5": "Для наилучших результатов свяжитесь со мной за 2-3 месяца до международных поездок и за 3-6 недель до внутренних рейсов. Однако я также могу помочь с последними минутными бронированиями и найти лучшие доступные варианты.",
    "faq.q6": "Что делать, если мне нужно изменить или отменить мой рейс?",
    "faq.a6": "Я предоставляю рекомендации по политикам авиакомпаний и помогаю вам понять условия изменения/отмены до бронирования. Если изменения потребуются позже, я помогу вам с процессом и постараюсь минимизировать сборы.",
    "faq.ctaTitle": "Ещё Есть Вопросы?",
    "faq.ctaDesc": "Свяжитесь со мной напрямую для получения персонализированных ответов на ваши вопросы о бронировании авиабилетов.",
    "faq.ctaButton": "Связаться",
    
    // Process Steps
    "process.badge": "Простой Процесс",
    "process.title": "Как Это Работает",
    "process.subtitle": "Четыре простых шага для умного бронирования авиабилетов и значительных сбережений.",
    "process.step1Title": "Свяжитесь со Мной",
    "process.step1Desc": "Свяжитесь со мной по электронной почте, WhatsApp или контактной форме с вашими планами путешествия.",
    "process.step2Title": "Поделитесь Требованиями",
    "process.step2Desc": "Расскажите мне о ваших направлениях, датах, предпочтениях и ограничениях бюджета.",
    "process.step3Title": "Получите Экспертные Опции",
    "process.step3Desc": "Я проведу исследование и представлю лучшие варианты авиабилетов с подробными сравнениями.",
    "process.step4Title": "Забронируйте и Сэкономьте",
    "process.step4Desc": "Выберите предпочтительный вариант и забронируйте с уверенностью, зная, что получили лучшее предложение.",
    "process.cta": "Готовы начать экономить на следующем рейсе?",
  },
  az: {
    // Navigation
    "nav.home": "Əsas",
    "nav.about": "Haqqımda",
    "nav.services": "Xidmətlər",
    "nav.blog": "Bloq",
    "nav.contact": "Əlaqə",
    "nav.addressContact": "Ünvan və Əlaqə",
    "nav.getInTouch": "Əlaqə Saxla",
    "nav.yourName": "İbrahim Abdullayev",

    // Hero
    "hero.badge": "Aviabilet Ekspertiniz",
    "hero.name": "İbrahim Abdullayev",
    "hero.tagline": "Ağıllı Aviabilet Rezervasiyası Məsləhəti və Səyahət Həlləri",
    "hero.welcome1": "Xoş gəlmisiniz! Mən səyahətçilərə ən yaxşı aviabilet təkliflərini tapmağa və süni intellekt dövründə sürətlə dəyişən aviasənayədə düzgün seçim etməyə kömək edirəm. Aviaşirkət sistemləri, sifariş strategiyaları və səyahət qaydaları üzrə topladığım təcrübəmlə sizə ən uyğun variantı tapır və hər səfərinizdən maksimum fayda əldə etməyinizi təmin edirəm.",
    "hero.welcome2": "İstər biznes səfəri, ailə tətili, istərsə də çoxistiqamətli macəra planlaşdırırsınız, daha ağıllı rezervasiya etmək, pul qənaət etmək və əminliklə səyahət etmək üçün sizə kömək etməyə hazıram.",
    "hero.exploreServices": "Xidmətləri Kəşf Et",
    "hero.getInTouch": "Məsləhət Al",
    "hero.quickContact": "Tez əlaqə üçün məlumatınızı buraxın:",
    "hero.emailPlaceholder": "Email",
    "hero.phonePlaceholder": "Telefon (+994...)",
    "hero.submitContact": "Göndər",

    // About
    "about.title": "Haqqımda",
    "about.subtitle": "Səyahətçilərə ən uyğun aviabiletləri tapmaqda kömək edən təcrübəli mütəxəssis.",
    "about.journeyTitle": "Təcrübə və Yanaşma",
    "about.journey1": "İllər boyu hava yolu sistemləri, tarif strukturları və rezervasiya strategiyaları üzrə əldə etdiyim təcrübə sayəsində müştərilərə pul qənaət etməkdə və səhvlərdən qaçmaqda kömək edirəm.",
    "about.journey2": "İxtisasım optimal marşrutlar, düzgün vaxt seçimi və hava yolu siyasətlərinin təhlilidir. Hər müştəriyə fərdi yanaşaraq onun ehtiyaclarına ən uyğun həlli təqdim edirəm.",
    "about.journey3": "Ağıllı səyahət ağıllı rezervasiya ilə başlayır. Büdcənizə, cədvəlinizə və tələblərinizə uyğun ən yaxşı variantları tapıram.",
    "about.quote": "Ən yaxşı uçuş həmişə ən ucuz və ya ən sürətli deyil—ehtiyaclarınıza mükəmməl uyğun gələndir.",
    "about.highlight1Title": "Qiymət Optimallaşdırması",
    "about.highlight1Desc": "Vaxt, marşrutlar və rezervasiya strategiyaları vasitəsilə ən yaxşı təklifləri tapmaq.",
    "about.highlight2Title": "Ekspert Biliklər",
    "about.highlight2Desc": "Hava yolu sistemləri, tarif sinifləri və səyahət qaydalarının dərin başa düşülməsi.",
    "about.highlight3Title": "Fərdiləşdirilmiş Xidmət",
    "about.highlight3Desc": "Xüsusi səyahət ehtiyaclarınıza və üstünlüklərinizə əsaslanan tövsiyələr.",
    "about.highlight4Title": "Etibarlı Rəhbərlik",
    "about.highlight4Desc": "Məlumatlı rezervasiya qərarları qəbul etməyə kömək edən aydın, dürüst məsləhətlər.",
    "about.beyondTitle": "Aviabilet Rezervasiyasından Kənarda",
    "about.beyond1": "Müştərilərə kömək etmədiyim vaxtlarda yeni istiqamətləri izləyir və hava səyahətindəki yeniliklərdən xəbərdar oluram.",
    "about.beyond2": "Məqsədim səyahəti daha əlçatan etmək və hər müştəriyə keyfiyyətli xidmət göstərməkdir.",

    // Services
    "services.title": "Xidmətlərim",
    "services.subtitle": "Vaxtınızı, pulunuzu və stressinizi qənaət etmək üçün hazırlanmış hərtərəfli aviabilet rezervasiya məsləhəti.",
    "services.service1Title": "Uçuş Axtarışı və Rezervasiya",
    "services.service1Tagline": "Mükəmməl Uçuşunuzu Tapın",
    "services.service1Desc": "Uçuş axtarışı və rezervasiyası ilə tam yardım. Səyahətiniz üçün ən yaxşı marşrutlar, optimal bağlantı vaxtları və rəqabətli qiymətlər tapacağam.",
    "services.service1Feature1": "Çoxplatformalı tarif müqayisəsi",
    "services.service1Feature2": "Optimal marşrut və vaxt strategiyaları",
    "services.service1Feature3": "Rezervasiya yardımı və təsdiqləmə",
    "services.service1CTA": "İndi Rezerv Et",
    "services.service2Title": "Mürəkkəb Marşrut Planlaması",
    "services.service2Tagline": "Çoxşəhərli və Uzun Məsafəli Uçuş Ekspertləri",
    "services.service2Desc": "Çoxşəhərli səfərlər, dünya turları və optimal bağlantılarla uzun məsafəli uçuşlar daxil olmaqla mürəkkəb səyahət planları üçün ixtisaslaşmış yardım.",
    "services.service2Feature1": "Çoxistiqamətli marşrut optimallaşdırması",
    "services.service2Feature2": "Bağlantı vaxtı və hava limanı tövsiyələri",
    "services.service2Feature3": "Uzun məsafəli rahatlıq tövsiyələri",
    "services.service2CTA": "Səyahəti Planlaşdır",
    "services.service3Title": "Səyahət Məsləhəti",
    "services.service3Tagline": "Ehtiyacınız Olduqda Ekspert Məsləhəti",
    "services.service3Desc": "Bütün aviabilet rezervasiya suallarınıza cavab vermək, hava yolu siyasətlərini izah etmək və xüsusi səyahət ehtiyaclarınız üçün fərdiləşdirilmiş tövsiyələr təqdim etmək üçün təkbətək məsləhət.",
    "services.service3Feature1": "Viza və səyahət sənədləri üzrə rəhbərlik",
    "services.service3Feature2": "Hava yolu siyasətlərinin izahı",
    "services.service3Feature3": "Səyahət vaxtı tövsiyələri",
    "services.service3CTA": "Məsləhət Al",
    "services.ctaTitle": "Növbəti Uçuşunuzu Rezerv Etməyə Hazırsınız?",
    "services.ctaDesc": "Səyahətiniz üçün mükəmməl uçuşlar tapmaq üçün birlikdə işləyək. Ekspert rəhbərliyi əldə edin və növbəti rezervasiyada pul qənaət edin.",
    "services.ctaButton": "Planlaşdırmağa Başla",

    // Contact
    "contact.title": "Əlaqə Saxlayın",
    "contact.subtitle": "Daha ağıllı rezervasiya etməyə hazırsınız? Fərdiləşdirilmiş aviabilet rezervasiya məsləhəti üçün bu gün mənimlə əlaqə saxlayın.",
    "contact.formTitle": "Mesaj Göndər",
    "contact.successMessage": "Təşəkkür edirəm! 24 saat ərzində sizinlə əlaqə saxlayacağam.",
    "contact.errorMessage": "Ooops! Bir nəsə səhv oldu. Zəhmət olmasa yenidən cəhd edin və ya mənimlə e-poçt və ya WhatsApp vasitəsilə direkt əlaqə saxlayın.",
    "contact.nameLabel": "Adınız",
    "contact.namePlaceholder": "Əli Əliyev",
    "contact.emailLabel": "E-poçt Ünvanı",
    "contact.emailPlaceholder": "ali@example.com",
    "contact.messageLabel": "Səyahət Planları",
    "contact.messagePlaceholder": "Səyahət planlarınız haqqında danışın: təyinat, tarixlər, üstünlüklər...",
    "contact.sendButton": "Mesaj Göndər",
    "contact.sending": "Göndərilir...",
    "contact.infoTitle": "Əlaqə Məlumatları",
    "contact.emailInfo": "E-poçt",
    "contact.phoneInfo": "WhatsApp",
    "contact.locationInfo": "Yer",
    "contact.emailValue": "ibrahim.abdullayev1@gmail.com",
    "contact.phoneValue": "Message on WhatsApp",
    "contact.locationValue": "Baku, Rashid Behbudov str, Azerbaijan",
    "contact.socialTitle": "Connect With Me",
    "contact.socialDesc": "Səyahət məsləhətləri, aviabilet təklifləri və rezervasiya məsləhətləri üçün izləyin.",
    "contact.availabilityTitle": "Cavab Vaxtı",
    "contact.availabilityDesc": "Adətən 24 saat ərzində cavab verirəm. Təcili səyahət rezervasiyaları üçün mesajınızda qeyd edin.",

    // Footer
    "footer.copyright": "© 2024 İbrahim Abdullayev. Bütün hüquqlar qorunur.",
    
    // Welcome Modal
    "welcome.title": "Aviabilet Ekspertinə Xoş Gəlmisiniz!",
    "welcome.subtitle": "Ağıllı aviabilet rezervasiyasına səyahətiniz buradan başlayır",
    "welcome.question": "Bu gün sizə necə kömək edə bilərəm?",
    "welcome.whatsappButton": "WhatsApp",
    "welcome.whatsappDesc": "Dərhal cavab alın",
    "welcome.whatsappMessage": "Salam! Aviabilet rezervasiyası üzrə məsləhət almaq istərdim.",
    "welcome.instagramButton": "Instagram",
    "welcome.instagramDesc": "İzləyin və Yazın",
    "welcome.browseSite": "Sayta Davam Et",
    "welcome.footer": "Bu mesaj yalnız bir dəfə göstəriləcək",
    
    // WhatsApp Floating Button
    "whatsapp.defaultMessage": "Salam! Aviabilet rezervasiya xidmətləriniz haqqında məlumat almaq istərdim.",
    "whatsapp.tooltip": "WhatsApp-da bizə yazın",
    
    // Contact Modal
    "contact.modalTitle": "Əlaqə Saxlayın",
    "contact.modalSubtitle": "Üstünlük verdiyiniz əlaqə üsulunu seçin",
    "contact.whatsappMessage": "Salam! Aviabilet rezervasiyası üzrə məsləhət almaq istərdim.",
    "contact.whatsappDesc": "Sürətli cavab",
    "contact.instagramDesc": "Birbaşa mesaj",
    "contact.emailSubject": "Aviabilet Məsləhəti Sorğusu",
    "contact.emailBody": "Salam İbrahim,\n\nAviabilet rezervasiya xidmətləriniz haqqında məlumat almaq istərdim.\n\nTəşəkkürlər!",
    "contact.emailDesc": "Email göndərin",
    "contact.modalFooter": "Sizin rahatlığınız üçün 24/7 əlçatandır",
    "contact.quickContact": "Sürətli Əlaqə",
    
    // Blog
    "blog.badge": "Səyahət Məsləhətləri",
    "blog.title": "Aviabilet Rezervasiya Məsləhətləri və Fikirlər",
    "blog.subtitle": "Daha ağıllı rezervasiya etmək və aviabiletlərdə pul qənaət etmək üçün ekspert məsləhətləri və sənaye bilgiləri.",
    "blog.noPosts": "Hələ bloq yazısı yoxdur. Tezliklə yoxlayın!",
    
    // Blog Post 1
    "blog.post1.title": "2024 üçün 10 Əsas Aviabilet Rezervasiya Məsləhəti",
    "blog.post1.date": "Dekabr 2024",
    "blog.post1.excerpt": "Bu sübut edilmiş strategiyalarla ən yaxşı aviabilet təkliflərini tapmaq sənətinə yiyələnin. Nə vaxt rezervasiya etməyi, qiymətləri necə müqayisə etməyi və yüzlərlə dollar qənaət edə biləcək içəridən məsləhətləri öyrənin.",
    "blog.post1.content": "Aviabilet rezervasiyası stressli və ya bahalı olmamalıdır. İllər boyu təcrübəyə əsaslanan top 10 məsləhətlərim:\n\n1. Beynəlxalq uçuşlar üçün 2-3 ay əvvəl rezerv edin\n2. Qiymət izləməsindən qaçmaq üçün gizli rejim istifadə edin\n3. Səyahət tarixlərinizlə çevik olun\n4. Bir neçə rezervasiya platformasını müqayisə edin\n5. Yaxınlıqdakı hava limanlarını nəzərdən keçirin\n6. Tarif bildirişlərinə qeydiyyatdan keçin\n7. Hava yolu tarif siniflərini başa düşün\n8. Çərşənbə axşamı və çərşənbə günü rezerv edin\n9. Pik səyahət mövsümlərindən qaçın\n10. Hava yolu millərini strategik istifadə edin\n\nBu strategiyaların hər biri uçuşlarınızda 10-30% qənaət edə bilər. Açar maksimum qənaət üçün bir neçə texnikanı birləşdirməkdir.",
    "blog.post1.referencesTitle": "İstinadlar və Mənbələr",
    
    // Blog Post 2
    "blog.post2.title": "Gizli Hava Yolu Rüsumları: Bilməli Olduğunuz",
    "blog.post2.date": "Noyabr 2024",
    "blog.post2.excerpt": "Hava yollarının bilet qiymətinizi ikiqat artıra biləcək onlarla gizli rüsumu var. Baqaj, oturacaq və daha çoxunda lazımsız xərcləri necə müəyyən etməyi və qarşısını almağı öyrənin.",
    "blog.post2.content": "Gizli rüsumlar səyahət edənlər üçün ən böyük məyusluqlardan biridir. Diqqət etməli olduğunuz məqamlar:\n\nBaqaj Rüsumları: Yığmadan öncə ölçü və çəki limitlərini yoxlayın. Bir çox hava yolu qeydiyyatlı baqaj üçün $30-60 alır.\n\nYer Seçimi: Əsas ekonom sinfində çox vaxt yer seçimi daxil deyil. Yerinizi seçmək üçün $15-50 ödəyə bilərsiniz.\n\nDəyişiklik Rüsumları: Bəzi hava yolları uçuşunuzu dəyişdirmək üçün $200+ alır. Çevik tarif variantlarını axtarın.\n\nPrioritet Minmə: Status olmadan erkən minmə üçün $10-30 ödəyəcəksiniz.\n\nMəsləhətim: Həmişə xırda yazıları oxuyun və rezervasiyadan əvvəl ümumi xərcləri hesablayın.",
    "blog.post2.referencesTitle": "Əlavə Oxu",
    
    // Blog Post 3
    "blog.post3.title": "Uçuş Rezervasiya üçün Ən Yaxşı Vaxt: Məlumat Əsaslı Bələdçi",
    "blog.post3.date": "Oktyabr 2024",
    "blog.post3.excerpt": "Uçuş rezervasiyası üçün mütləq ən yaxşı vaxt nə vaxtdır? Daxili və beynəlxalq səyahət üçün optimal rezervasiya pəncərələrini tapmaq üçün minlərlə rezervasiyanı təhlil etdim.",
    "blog.post3.content": "Rezervasiya məlumatlarını təhlil etdikdən sonra, optimal rezervasiya pəncərələri:\n\nDaxili Uçuşlar:\n• 3-6 həftə əvvəl rezerv edin\n• Uçuş üçün ən yaxşı günlər: çərşənbə axşamı və çərşənbə\n• Bayram həftəsonlarından qaçın\n\nBeynəlxalq Uçuşlar:\n• 2-3 ay əvvəl rezerv edin\n• Avropa üçün: yanvar-mart və sentyabr-oktyabr ən ucuz\n• Asiya üçün: noyabr-fevral ən yaxşı təkliflər verir\n\nSon Dəqiqə Rezervasiyaları:\n• Daxili uçuşlar üçün işləyə bilər (2 həftə ərzində)\n• Beynəlxalq səyahət üçün nadir hallarda faydalıdır\n• Çevik səyahət edənlər üçün ən yaxşısı\n\nXatırlayın: Bunlar təlimatdır. Öz marşrutunuz üçün tarif bildirişlərindən istifadə edin və qiymətləri izləyin.",
    "blog.post3.referencesTitle": "Məlumat Mənbələri",
    
    // Stats
    "stats.badge": "Sübut Olunmuş Nəticələr",
    "stats.title": "Danışan Rəqəmlər",
    "stats.subtitle": "Səyahət edənlərə dünya miqyasında pul qənaət etmək və daha ağıllı uçuşlar rezerv etməkdə kömək edirik.",
    "stats.clients": "Xoşbəxt Müştərilər",
    "stats.countries": "Xidmət Göstərilən Ölkələr",
    "stats.saved": "Ümumi Qənaət",
    "stats.support": "Dəstək",
    
    // Testimonials
    "testimonials.badge": "Müştəri Uğur Hekayələri",
    "testimonials.title": "Müştərilər Nə Deyir",
    "testimonials.subtitle": "Ekspert aviabilet rezervasiya məsləhəti ilə pul və vaxt qənaət edən səyahət edənlərin real təcrübələri.",
    "testimonials.client1Name": "Əli Məmmədov",
    "testimonials.client1Role": "Biznes Səyahətçisi",
    "testimonials.client1Content": "İbrahim Londona biznes səfərimdə $500-dən çox qənaət etməyə kömək etdi. Hava yolu sistemləri və vaxtlama haqqında bilikləri inanılmazdır!",
    "testimonials.client2Name": "Leyla Həsənova",
    "testimonials.client2Role": "Ailə Tətili Planlaşdırıcısı",
    "testimonials.client2Content": "İbrahim sayəsində ailə səfərimizi planlaşdırmaq stresssiz oldu. Büdcəmizə və cədvəlimizə uyğun mükəmməl uçuşlar tapdı.",
    "testimonials.client3Name": "Ömər Əl-Rəşid",
    "testimonials.client3Role": "Tez-tez Uçan",
    "testimonials.client3Content": "İstifadə etdiyim ən yaxşı uçuş məsləhət xidməti. İbrahim mürəkkəb marşrutları başa düşür və həmişə ən yaxşı təklifləri tapır.",
    "testimonials.client4Name": "Yelena Volkova",
    "testimonials.client4Role": "Rəqəmsal Köçəri",
    "testimonials.client4Content": "Daim səyahət edən biri kimi İbrahimin ekspertizası əvəzolunmazdır. Yüksək tövsiyə edirəm!",
    "testimonials.client5Name": "Ceyms Mitçell",
    "testimonials.client5Role": "Macəra Səyahətçisi",
    "testimonials.client5Content": "İbrahim mürəkkəb çoxşəhərli Asiya səfərimi planlaşdırmağa kömək etdi. Hər bağlantı mükəmməl idi və qiymətlər məğlub edilməzdi.",
    "testimonials.client6Name": "Sara Conson",
    "testimonials.client6Role": "Korporativ Səyahət Meneceri",
    "testimonials.client6Content": "İbrahimin rezervasiya strategiyaları və hava yolu bilgiləri sayəsində korporativ səyahətdə minlərlə dollar qənaət etdik.",
    "testimonials.cta": "Ekspert aviabilet rezervasiya məsləhəti ilə pul qənaət edən yüzlərlə məmnun səyahətçiyə qoşulun.",
    
    // FAQ
    "faq.badge": "Ümumi Suallar",
    "faq.title": "Tez-tez Verilən Suallar",
    "faq.subtitle": "Uçuş rezervasiya məsləhət xidmətləri haqqında bilməli olduğunuz hər şey.",
    "faq.q1": "Aviabilet rezervasiya məsləhətiniz necə işləyir?",
    "faq.a1": "Səyahət ehtiyaclarınızı təhlil edirəm, ən yaxşı təkliflər üçün bir neçə platformada axtarış edirəm, marşrutları və hava yollarını müqayisə edirəm və fərdiləşdirilmiş tövsiyələr verirəm. Sizi rezervasiya prosesində istiqamətləndirə və ya özüm idarə edə bilərəm.",
    "faq.q2": "Məsləhət ödənişləriniz nə qədərdir?",
    "faq.a2": "Ödənişlərim səfərin mürəkkəbliyindən asılı olaraq dəyişir. Sadə gediş-gəliş rezervasiyaları minimal məsləhət haqqından başlayır, mürəkkəb çoxşəhərli marşrutlar daha çox ola bilər. Tapdığım qənaətlər adətən məsləhət xərcini xeyli üstələyir.",
    "faq.q3": "Xidmətinizdən istifadə edərək nə qədər qənaət edə bilərəm?",
    "faq.a3": "Qənaətlər marşrut və vaxtdan asılı olaraq dəyişir, lakin müştərilər adətən optimal rezervasiya vaxtı, marşrut seçimi və tarif sinfi strategiyaları vasitəsilə uçuş xərclərində 20-40% qənaət edirlər. Beynəlxalq səfərlərdə qənaət tez-tez yüzlərlə dollara çatır.",
    "faq.q4": "Xüsusi hava yolları ilə işləyirsiniz?",
    "faq.a4": "Xeyr, mən tamamilə müstəqiləm və bütün böyük hava yolları ilə işləyirəm. Bu, hər hansı konkret daşıyıcıya qərəzsiz olaraq ehtiyaclarınız üçün həqiqətən ən yaxşı variantı tapmağa imkan verir.",
    "faq.q5": "Sizinlə nə qədər əvvəl əlaqə saxlamalıyam?",
    "faq.a5": "Ən yaxşı nəticələr üçün beynəlxalq səfərlərdən 2-3 ay əvvəl və daxili uçuşlardan 3-6 həftə əvvəl mənimlə əlaqə saxlayın. Bununla belə, son dəqiqə rezervasiyalarında da kömək edə və ən yaxşı mövcud variantları tapa bilərəm.",
    "faq.q6": "Uçuşumu dəyişdirmək və ya ləğv etmək lazım olarsa nə olacaq?",
    "faq.a6": "Hava yolu siyasətləri haqqında tövsiyələr verirəm və rezervasiyadan əvvəl dəyişiklik/ləğvetmə şərtlərini başa düşməyə kömək edirəm. Sonradan dəyişikliklər lazım olarsa, prosesdə kömək edə və rüsumları minimuma endirməyə çalışa bilərəm.",
    "faq.ctaTitle": "Hələ Suallarınız Var?",
    "faq.ctaDesc": "Aviabilet rezervasiya suallarınıza fərdiləşdirilmiş cavablar üçün birbaşa mənimlə əlaqə saxlayın.",
    "faq.ctaButton": "Əlaqə Saxlayın",
    
    // Process Steps
    "process.badge": "Sadə Proses",
    "process.title": "Necə İşləyir",
    "process.subtitle": "Daha ağıllı aviabilet rezervasiya və əhəmiyyətli qənaət üçün dörd asan addım.",
    "process.step1Title": "Mənimlə Əlaqə Saxlayın",
    "process.step1Desc": "Səyahət planlarınızla e-poçt, WhatsApp və ya əlaqə forması vasitəsilə əlaqə saxlayın.",
    "process.step2Title": "Tələbləri Paylaşın",
    "process.step2Desc": "Təyinat nöqtələrinizi, tarixlərinizi, üstünlüklərinizi və büdcə məhdudiyyətlərinizi mənə deyin.",
    "process.step3Title": "Ekspert Variantları Əldə Edin",
    "process.step3Desc": "Tədqiqat aparıb ətraflı müqayisələrlə ən yaxşı aviabilet variantlarını təqdim edəcəyəm.",
    "process.step4Title": "Rezerv Edin və Qənaət Edin",
    "process.step4Desc": "Üstünlük verdiyiniz variantı seçin və ən yaxşı təklifi əldə etdiyinizi bilərək əminliklə rezerv edin.",
    "process.cta": "Növbəti uçuşunuzda qənaət etməyə başlamağa hazırsınız?",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language from localStorage or geolocation
  useEffect(() => {
    const initializeLanguage = async () => {
      // 1. Check if user has previously selected a language
      const savedLanguage = localStorage.getItem("preferredLanguage") as Language | null;
      
      if (savedLanguage && ["en", "ru", "az"].includes(savedLanguage)) {
        setLanguage(savedLanguage);
        setIsLoading(false);
        return;
      }

      // 2. If no saved language, detect based on geolocation
      try {
        // Try to get country from IP-based geolocation
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryCode = data.country_code?.toUpperCase();

        // Russian-speaking countries
        const russianCountries = ["RU", "BY", "KZ", "KG", "TJ", "UZ", "TM", "UA", "MD"];
        
        // Azerbaijan
        if (countryCode === "AZ") {
          setLanguage("az");
        } 
        // Russian-speaking countries
        else if (russianCountries.includes(countryCode)) {
          setLanguage("ru");
        } 
        // Default to English for all other countries
        else {
          setLanguage("en");
        }
      } catch (error) {
        // If geolocation fails, fallback to browser language
        const browserLang = navigator.language.toLowerCase();
        
        if (browserLang.startsWith("az")) {
          setLanguage("az");
        } else if (browserLang.startsWith("ru")) {
          setLanguage("ru");
        } else {
          setLanguage("en");
        }
      }

      setIsLoading(false);
    };

    initializeLanguage();
  }, []);

  // Save language to localStorage whenever it changes
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Show loading state briefly to prevent flash of wrong language
  if (isLoading) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}