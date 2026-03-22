// تعريف نوع البيانات للمنتج لضمان التنسيق
export interface Product {
    id: number;
    name: string;
    price: string;
    image: string; // اترك الرابط فارغاً كما طلبت
    category: string;
    description: string;
    color: string; // خاصية اختيارية للون المنتج إذا لزم الأمر
}


export const FEATURED_PRODUCTS: Product[] = [
{
        id: 1,
        name: "SAND ARCHIVE BLAZER", // عنوان يعبر عن اللون والموضة الشبابية
        price: "$249.00",
        image: "/SAND-ARCHIVE-BLAZER.png", 
        category: "Modern Archive",
        description: "Sculpted elegance in a nude palette. A contemporary tailored blazer designed for a seamless, bold silhouette." ,
        color: "#a47f65",
    },
    {
        id: 2,
        name: "SILK ARCHIVE SHIRT",
        price: "$185.00",
        image: "/SILK-ARCHIVE-SHIRT.png",
        category: "Timeless",
        description: "Pure Italian silk tailored for a fluid silhouette and an unmistakable touch of grace.",
    color: "#212c40",
    },
{
        id: 3,
        name: "LUMINA COUTURE SHIRT", // اسم يوحي بالضوء والأناقة الرفيعة
        price: "$320.00",
        image: "/LUMINA-COUTURE-SHIRT.png", 
        category: "Signature",
        // وصف يركز على التصميم الهندسي والخامة المريحة
        description: "Architectural fluidity. A crisp cotton masterpiece featuring a signature cinched waist and oversized avant-garde sleeves.",
         color: "#81b1bb",
    },
{
        id: 4,
        name: "ARCHIVE STRIPED KNIT", // اسم عصري يركز على حرفية الحياكة
        price: "$195.00", // رفع السعر قليلاً ليتناسب مع قيمة البلوفر مقارنة بالوشاح
        image: "/ARCHIVE-STRIPED-KNIT.png", 
        category: "Timeless",
        // وصف يركز على الخامة الدافئة والروح الشبابية
        description: "The ultimate leisure statement. A premium ribbed knit featuring a quarter-zip collar and bold forest green stripes for a refined yet relaxed look.",
        color: "#19322e",
    },
];


















// --- 1. قسم الرجال (The Sovereign / Monsieur) ---
// --- 1. قسم الرجال الكامل (9 منتجات) ---
export const MEN_COLLECTION: Product[] = [
    {
        id: 101,
        name: "OSCAR VELVET BLAZER",
        price: "$890.00",
        image: "/collectionss/OSCAR-VELVET-BLAZER.png", // اترك الرابط فارغاً
        category: "Monsieur",
        description: "A pinnacle of evening elegance. Tailored from premium Italian velvet with silk-satin peak lapels.",
         color: "#0f171a",
    },
    {
        id: 102,
        name: "EMPIRE WOOL OVERCOAT",
        price: "$1,150.00",
        image: "/collectionss/EMPIRE-WOOL-OVERCOAT.png",
        category: "Monsieur",
        description: "Hand-stitched double-breasted coat in virgin wool, designed for a powerful architectural silhouette.",
        color: "#181c2f",
    },
    {
        id: 103,
        name: "MONARCH SILK SHIRT",
        price: "$340.00",
        image: "/collectionss/MONARCH-SILK-SHIRT.png",
        category: "Monsieur",
        description: "Fluid mulberry silk with a hidden button placket and refined French cuffs for the modern gentleman.",
        color: "#20293a",
    },
    {
        id: 104,
        name: "REGENT CASHMERE KNIT",
        price: "$420.00",
        image: "/collectionss/REGENT-CASHMERE-KNIT.png",
        category: "Monsieur",
        description: "Pure Mongolian cashmere sweater. Feather-light warmth with a sophisticated mock-neck finish.",
        color: "#3a121a",
       
    },
    {
        id: 105,
        name: "SOVEREIGN CHINO TROUSERS",
        price: "$280.00",
        image: "/collectionss/SOVEREIGN-CHINO-TROUSERS.png",
        category: "Monsieur",
        description: "Sharp-pressed Egyptian cotton with a hint of stretch. The foundation of a versatile luxury wardrobe.",
        color: "#c9bba5",
    },
{
        id: 106,
        name: "CORE GRAPHITE HOODIE",
        price: "$450.00",
        image: "/collectionss/CORE-GRAPHITE-HOODIE.png", 
        category: "Monsieur",
        description: "Heavyweight scuba-knit cotton. A sculptural oversized fit featuring a silk-lined hood and minimalist silver hardware.",
        color: "#9c9696",
    },
   {
        id: 107,
        name: "ARCANE ZIP HOODIE",
        price: "$480.00",
        image: "/collectionss/ARCANE-ZIP-HOODIE.png", // اترك الرابط فارغاً
        category: "Monsieur",
        description: "Double-layered tech-fleece with a matte finish. Featuring an asymmetric silver zipper and extra-long ribbed cuffs for a defiant street-luxe silhouette.",
        color: "#928e8e",
    },
{
        id: 108,
        name: "VALOR PUFFER BOMBER",
        price: "$820.00",
        image: "/collectionss/VALOR-PUFFER-BOMBER.png", // اترك الرابط فارغاً
        category: "Monsieur",
        description: "A fusion of utility and luxury. Cropped puffer silhouette in water-repellent matte nylon with a signature gold-embossed back panel.",
        color: "#191b1e",
    },
    {
        id: 109,
        name: "ARCHIVE WOOL SCARF",
        price: "$225.00",
        image: "/collectionss/ARCHIVE-WOOL-SCARF.png", // اترك الرابط فارغاً
        category: "Monsieur",
        description: "Extra-fine merino wool in a subtle herringbone weave. Finished with hand-rolled silk edges.",
        color: "#191919",
    }
];


// --- 2. قسم النساء الكامل (9 منتجات) ---
export const WOMEN_COLLECTION: Product[] = [
    {
        id: 201,
        name: "LUNA SATIN GOWN",
        price: "$1,400.00",
        image: "/collectionss/LUNA-SATIN-GOWN.png", // اترك الرابط فارغاً
        category: "Madame",
        description: "An ethereal floor-length masterpiece in heavy silk-satin, featuring a delicate draped neckline.",
        color: "#310e22",
    },
    {
        id: 202,
        name: "NOIR TWEED JACKET",
        price: "$950.00",
        image: "/collectionss/NOIR-TWEED-JACKET.png", // اترك الرابط فارغاً
        category: "Madame",
        description: "The definition of chic. A meticulously woven tweed jacket with vintage gold-tone crest buttons.",
        color: "#242426",
    },
    {
        id: 203,
        name: "AURORA PLEATED SKIRT",
        price: "$580.00",
        image: "/collectionss/AURORA-PLEATED-SKIRT.png", // اترك الرابط فارغاً
        category: "Madame",
        description: "Surgical precision pleating in a metallic champagne finish that dances with every movement.",
        color: "#5a323a",
    },
    {
        id: 204,
        name: "CELESTE SILK BLOUSE",
        price: "$390.00",
        image: "/collectionss/CELESTE-SILK-BLOUSE.png",
        category: "Madame",
        description: "Sheer indulgence in 100% georgette silk. Features a sophisticated pussy-bow collar and pearl buttons.",
        color: "#77a1ad",
    },
    {
        id: 205,
        name: "MARQUISE WOOL CAPE",
        price: "$1,100.00",
        image: "/collectionss/MARQUISE-WOOL-CAPE.png",
        category: "Madame",
        description: "Sculptural outerwear crafted from double-faced cashmere wool. A dramatic yet refined winter silhouette.",
        color: "#2e2017",
    },
{
        id: 206,
        name: "DIVINE BLOSSOM BLAZER",
        price: "$890.00",
        image: "/collectionss/DIVINE-BLOSSOM-BLAZER.png", // اترك الرابط فارغاً
        category: "Madame",
        description: "A masterclass in feminine tailoring. Sculpted shoulders with a cinched waist, featuring hand-embroidered gold floral motifs on premium crepe.",
        color: "rgb(193, 127, 115)",
    },
  {
        id: 207,
        name: "IVORY ECLIPSE JACKET", // اسم يعبر عن اللون والقصة المعمارية
        price: "$1,800.00",
        image: "/collectionss/IVORY-ECLIPSE-JACKET.png", // مثال على المسار
        category: "Madame",
        description: "Sculpted grace in a matte ivory finish. This striking wrap jacket features oversized architectural balloon sleeves and a structured cinched waist, creating a fluid yet defiant feminine form.",
        color: "#c5c5b8",
    },
 {
        id: 208,
        name: "CYAN ECLIPSE BLOUSE", // اسم يعكس اللون العميق والجاذبية
        price: "$480.00",
        image: "/collectionss/CYAN-ECLIPSE-BLOUSE.png", 
        category: "Madame",
        // وصف دقيق لتفاصيل الصورة (الوشاح، الخصر المشدود، الستان)
        description: "Sophistication in fluid satin. This teal masterpiece features a draped cinched waist, elegant gathered shoulders, and a signature integrated neck-tie for a regal, modern finish.",
        color: "#619bad",
    },
   {
        id: 209,
        name: "VALKYRIE LEATHER TRENCH",
        price: "$1,800.00",
        image: "/collectionss/VALKYRIE-LEATHER-TRENCH.png", // اترك الرابط فارغاً
        category: "Madame",
        description: "A silhouette of pure power. Floor-length buttery soft lambskin leather with a cinched waist and oversized gold-hardware belt.",
        color: "#533331",
    },
];





// --- 3. قسم القطع النادرة الكامل (6 منتجات) ---
export const LIMITED_ARCHIVE: Product[] = [
    {
        id: 301,
        name: "HERITAGE GOLD STITCH",
        price: "$2,200.00",
        image: "/collectionss/HERITAGE-GOLD-STITCH.png",
        category: "Archive",
        description: "Piece 001/050. Features genuine 24k gold thread embroidery on midnight navy cashmere.",
         color: "#972f30",
    },
    {
        id: 302,
        name: "VINTAGE VELVET CAPE",
        price: "$1,850.00",
        image: "/collectionss/VINTAGE-VELVET-CAPE.png",
        category: "Archive",
        description: "An archival revival. Floor-length heavy velvet cape inspired by 19th-century royal tailoring.",
        color: "#7d4258",
    },
{
        id: 303,
        name: "AURELIAN SHIELD JACKET", // اسم يوحي بالقوة والذهب
        price: "$3,200.00",
        image: "/collectionss/AURELIAN-SHIELD-JACKET.png", // اترك الرابط فارغاً
        category: "Archive",
        // وصف يركز على الندرة والتفاصيل المعدنية والجلدية
        description: "Piece 005/020. A monumental fusion of hand-burnished leather and 24k gold-plated hardware. Features architectural shoulder extensions and a signature sun-burst back embroidery.",
        color: "#84847d",
    },
{
        id: 304,
        name: "NEO-ROYAL VELVET COAT", 
        price: "$4,100.00",
        image: "/collectionss/NEO-ROYAL-VELVET-COAT.png", // اترك الرابط فارغاً
        category: "Archive",
        // وصف يركز على الفخامة المفرطة والتقنيات الحديثة في التفصيل
        description: "Piece 012/030. A floor-sweeping masterpiece in triple-black velvet, featuring laser-cut gold lace panels and an integrated high-sculpted collar for a commanding presence.",
       color: "#101e38",
    },
{
        id: 305,
        name: "SABLE MONARCH AVIATOR",
        price: "$5,400.00",
        image: "/collectionss/SABLE-MONARCH-AVIATOR.png", // اترك الرابط فارغاً
        category: "Archive",
        // وصف يركز على الفخامة المفرطة والقصة الضخمة
        description: "Piece 002/015. Ultra-thick distressed lambskin with an oversized Mongolian shearling collar and hand-forged gold-brass buckles. A rugged yet royal winter armor.",
        color: "#b7a473",
       
    },
    {
        id: 306,
        name: "MIDNIGHT SAPPHIRE BLAZER",
        price: "$3,500.00",
        image: "/collectionss/MIDNIGHT-SAPPHIRE-BLAZER.png", // اترك الرابط فارغاً
        category: "Archive",
        description: "The crown jewel of the collection. Deep navy velvet infused with sapphire-dust fibers for a cosmic sheen.",
       color: "#1f2b40",
    }
];










// --- صور السكشن الرئيسي (Hero Images Data) ---
// --- صور وبيانات السكشن الرئيسي لكل قسم (Hero Sections) ---
export const COLLECTION_HERO_ASSETS = {
    men: {
        heroTitle: "MONSIEUR 2026",
        heroSubtitle: "THE ART OF SOVEREIGN TAILORING",
        // الجملة الفخمة التي تظهر فوق الصورة
        heroTagline: "Where heritage meets the modern silhouette. A study in masculine precision.",
        heroImage: "/Men-Collection.png", // رابط الصورة الفارغ للقسم الرجالي
        
    },
    women: {
        heroTitle: "MADAME 2026",
        heroSubtitle: "THE ESSENCE OF DUCHESS GRACE",
        // الجملة الفخمة التي تظهر فوق الصورة
        heroTagline: "Defining the poetry of motion. Timeless elegance for the contemporary duchess.",
        heroImage: "/Women-Collection.png", // رابط الصورة الفارغ للقسم النسائي
       
    },
    archive: {
        heroTitle: "THE ARCHIVE",
        heroSubtitle: "RARE EDITIONS & ARTISAN PIECES",
        // الجملة الفخمة التي تظهر فوق الصورة
        heroTagline: "A sanctuary of rarity. Exquisite masterpieces curated for the true connoisseur.",
        heroImage: "/Limited-Edition-Collection.png", // رابط الصورة الفارغ لقسم القطع النادرة
   
    }
};  