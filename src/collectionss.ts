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
        image: "/ARCHIVE-VELVET-OVERSHIRT.png", 
        category: "Modern Archive",
        description: "Sculpted elegance in a nude palette. A contemporary tailored blazer designed for a seamless, bold silhouette." 
    },
    {
        id: 2,
        name: "SILK ARCHIVE SHIRT",
        price: "$185.00",
        image: "/SILK-ARCHIVE-SHIRT.png",
        category: "Timeless",
        description: "Pure Italian silk tailored for a fluid silhouette and an unmistakable touch of grace."
    },
{
        id: 3,
        name: "LUMINA COUTURE SHIRT", // اسم يوحي بالضوء والأناقة الرفيعة
        price: "$320.00",
        image: "/Midnight-Travel-Blazer.png", 
        category: "Signature",
        // وصف يركز على التصميم الهندسي والخامة المريحة
        description: "Architectural fluidity. A crisp cotton masterpiece featuring a signature cinched waist and oversized avant-garde sleeves."
    },
{
        id: 4,
        name: "ARCHIVE STRIPED KNIT", // اسم عصري يركز على حرفية الحياكة
        price: "$195.00", // رفع السعر قليلاً ليتناسب مع قيمة البلوفر مقارنة بالوشاح
        image: "/Royal-Velvet-Blazer1.png", 
        category: "Timeless",
        // وصف يركز على الخامة الدافئة والروح الشبابية
        description: "The ultimate leisure statement. A premium ribbed knit featuring a quarter-zip collar and bold forest green stripes for a refined yet relaxed look."
    },
];


















// --- 1. قسم الرجال (The Sovereign / Monsieur) ---
// --- 1. قسم الرجال الكامل (9 منتجات) ---
export const MEN_COLLECTION: Product[] = [
    {
        id: 101,
        name: "OSCAR VELVET BLAZER",
        price: "$890.00",
        image: "", 
        category: "Monsieur",
        description: "A pinnacle of evening elegance. Tailored from premium Italian velvet with silk-satin peak lapels."
    },
    {
        id: 102,
        name: "EMPIRE WOOL OVERCOAT",
        price: "$1,150.00",
        image: "./collectionss/EMPIRE-WOOL-OVERCOAT.png",
        category: "Monsieur",
        description: "Hand-stitched double-breasted coat in virgin wool, designed for a powerful architectural silhouette.",
        color: "#181c2f",
    },
    {
        id: 103,
        name: "MONARCH SILK SHIRT",
        price: "$340.00",
        image: "",
        category: "Monsieur",
        description: "Fluid mulberry silk with a hidden button placket and refined French cuffs for the modern gentleman."
    },
    {
        id: 104,
        name: "REGENT CASHMERE KNIT",
        price: "$420.00",
        image: "",
        category: "Monsieur",
        description: "Pure Mongolian cashmere sweater. Feather-light warmth with a sophisticated mock-neck finish."
    },
    {
        id: 105,
        name: "SOVEREIGN CHINO TROUSERS",
        price: "$280.00",
        image: "",
        category: "Monsieur",
        description: "Sharp-pressed Egyptian cotton with a hint of stretch. The foundation of a versatile luxury wardrobe."
    },
    {
        id: 106,
        name: "BARON LEATHER GLOVES",
        price: "$195.00",
        image: "",
        category: "Monsieur",
        description: "Supple Nappa leather lined with charcoal silk. Hand-sewn details for an impeccable winter grip."
    },
    {
        id: 107,
        name: "VICEROY TUXEDO VEST",
        price: "$310.00",
        image: "",
        category: "Monsieur",
        description: "A masterclass in layering. Textured black jacquard with adjustable silk backing for a bespoke fit."
    },
    {
        id: 108,
        name: "KNIGHT BRIDGE LOAFERS",
        price: "$550.00",
        image: "",
        category: "Monsieur",
        description: "Polished calfskin leather featuring a signature gold-tone hardware. Italian craftsmanship at its finest."
    },
    {
        id: 109,
        name: "ARCHIVE WOOL SCARF",
        price: "$225.00",
        image: "",
        category: "Monsieur",
        description: "Extra-fine merino wool in a subtle herringbone weave. Finished with hand-rolled silk edges."
    }
];


// --- 2. قسم النساء الكامل (9 منتجات) ---
export const WOMEN_COLLECTION: Product[] = [
    {
        id: 201,
        name: "LUNA SATIN GOWN",
        price: "$1,400.00",
        image: "",
        category: "Madame",
        description: "An ethereal floor-length masterpiece in heavy silk-satin, featuring a delicate draped neckline."
    },
    {
        id: 202,
        name: "NOIR TWEED JACKET",
        price: "$950.00",
        image: "",
        category: "Madame",
        description: "The definition of chic. A meticulously woven tweed jacket with vintage gold-tone crest buttons."
    },
    {
        id: 203,
        name: "AURORA PLEATED SKIRT",
        price: "$580.00",
        image: "",
        category: "Madame",
        description: "Surgical precision pleating in a metallic champagne finish that dances with every movement."
    },
    {
        id: 204,
        name: "CELESTE SILK BLOUSE",
        price: "$390.00",
        image: "",
        category: "Madame",
        description: "Sheer indulgence in 100% georgette silk. Features a sophisticated pussy-bow collar and pearl buttons."
    },
    {
        id: 205,
        name: "MARQUISE WOOL CAPE",
        price: "$1,100.00",
        image: "",
        category: "Madame",
        description: "Sculptural outerwear crafted from double-faced cashmere wool. A dramatic yet refined winter silhouette."
    },
    {
        id: 206,
        name: "VALENCIA LACE CORSET",
        price: "$450.00",
        image: "",
        category: "Madame",
        description: "Intricate French Leavers lace with internal boning for a structured, avant-garde feminine form."
    },
    {
        id: 207,
        name: "VICTORIA VELVET PANTS",
        price: "$620.00",
        image: "",
        category: "Madame",
        description: "High-waisted wide-leg trousers in plush midnight velvet. Effortless glamour for the modern duchess."
    },
    {
        id: 208,
        name: "ORACLE GOLD MULES",
        price: "$750.00",
        image: "",
        category: "Madame",
        description: "Hand-sculpted metallic leather with a signature architectural heel. True jewelry for the feet."
    },
    {
        id: 209,
        name: "ETHEREAL TULLE VEIL",
        price: "$280.00",
        image: "",
        category: "Madame",
        description: "Delicate silk tulle accessory. Can be worn as a neck scarf or a hair piece for a touch of mystery."
    }
];





// --- 3. قسم القطع النادرة الكامل (6 منتجات) ---
export const LIMITED_ARCHIVE: Product[] = [
    {
        id: 301,
        name: "HERITAGE GOLD STITCH",
        price: "$2,200.00",
        image: "",
        category: "Archive",
        description: "Piece 001/050. Features genuine 24k gold thread embroidery on midnight navy cashmere."
    },
    {
        id: 302,
        name: "VINTAGE VELVET CAPE",
        price: "$1,850.00",
        image: "",
        category: "Archive",
        description: "An archival revival. Floor-length heavy velvet cape inspired by 19th-century royal tailoring."
    },
    {
        id: 303,
        name: "OBSIDIAN SILK KIMONO",
        price: "$2,900.00",
        image: "",
        category: "Archive",
        description: "Numbered edition. Hand-painted obsidian silk with traditional artisan motifs. Only 15 pieces worldwide."
    },
    {
        id: 304,
        name: "RENAISSANCE LEATHER VEST",
        price: "$1,650.00",
        image: "",
        category: "Archive",
        description: "Distressed Italian leather with hand-carved silver buttons. A tribute to high-renaissance craftsmanship."
    },
    {
        id: 305,
        name: "IMPERIAL LACE SHAWL",
        price: "$1,200.00",
        image: "",
        category: "Archive",
        description: "Created using forgotten 18th-century lace techniques. A delicate masterpiece of wearable history."
    },
    {
        id: 306,
        name: "MIDNIGHT SAPPHIRE BLAZER",
        price: "$3,500.00",
        image: "",
        category: "Archive",
        description: "The crown jewel of the collection. Deep navy velvet infused with sapphire-dust fibers for a cosmic sheen."
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
        heroImage: "", // رابط الصورة الفارغ للقسم الرجالي
        
    },
    women: {
        heroTitle: "MADAME 2026",
        heroSubtitle: "THE ESSENCE OF DUCHESS GRACE",
        // الجملة الفخمة التي تظهر فوق الصورة
        heroTagline: "Defining the poetry of motion. Timeless elegance for the contemporary duchess.",
        heroImage: "", // رابط الصورة الفارغ للقسم النسائي
       
    },
    archive: {
        heroTitle: "THE ARCHIVE",
        heroSubtitle: "RARE EDITIONS & ARTISAN PIECES",
        // الجملة الفخمة التي تظهر فوق الصورة
        heroTagline: "A sanctuary of rarity. Exquisite masterpieces curated for the true connoisseur.",
        heroImage: "", // رابط الصورة الفارغ لقسم القطع النادرة
   
    }
};