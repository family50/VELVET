// تعريف نوع البيانات للمنتج لضمان التنسيق
export interface Product {
    id: number;
    name: string;
    price: string;
    image: string; // اترك الرابط فارغاً كما طلبت
    category: string;
    description: string;
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