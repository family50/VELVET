// assetsData.ts
import { 
  FEATURED_PRODUCTS, 
  MEN_COLLECTION, 
  WOMEN_COLLECTION, 
  LIMITED_ARCHIVE,
  COLLECTION_HERO_ASSETS 
} from './collectionss';

export const PAGE_ASSETS = {
    // 1. أصول الصفحة الرئيسية (Home Section)
    HOME: [
        '/02177366724171500000000000000000000ffffc0a8981c5095fd.mp4',
        '/SILK-ARCHIVE-SHIRT.png',
        ...FEATURED_PRODUCTS.map(product => product.image),
    ],

    // 2. أصول صفحة الـ Manifesto (Thats Page)
    THAT_S: [
        './02177378036414400000000000000000000ffffc0a8981c4abb5d.mp4', 
        './02177383855846600000000000000000000ffffc0a8981c55fafa.mp4', 
        './Heritage-Portrait.png',
        './Macro-Fabric.png',        
        './Precision-Stitching.png', 
        './Gold-Thread.png',         
        './Ancestral-Innovation-Model.png',
        './model-rarity.png',
        './model-sustainability.png',
    ],

    // 3. أصول صفحة المجموعات (Collections Main)
    COLLECTIONS_MAIN: [
        './Men-Collection.png',
        './Women-Collection.png',
        './Limited-Edition-Collection.png',
    ],

    // 4. أصول صفحات المنتجات (Pieces & Single Product)
    PRODUCT_PAGES: [
        COLLECTION_HERO_ASSETS.men.heroImage,
        COLLECTION_HERO_ASSETS.women.heroImage,
        COLLECTION_HERO_ASSETS.archive.heroImage,
        '/02177396161758100000000000000000000ffffc0a8981c3c8805.mp4',
        ...MEN_COLLECTION.map(p => p.image),
        ...WOMEN_COLLECTION.map(p => p.image),
        ...LIMITED_ARCHIVE.map(p => p.image),
        ...FEATURED_PRODUCTS.map(p => p.image),
    ],

    // 5. أصول صفحة السلة والدفع (Cart & Payment)
    PAYMENT_GATEWAY: [
        '/created.png', // صورة الكارت الذهب (Regalia Gold Card)
        // إذا كان لديك صور خلفيات لصفحة النجاح أو أيقونات مخصصة أضفها هنا
        ...FEATURED_PRODUCTS.map(p => p.image),
    ],

    // 6. أصول عامة (Global / Shared)
    GLOBAL: [
        '/favicon.ico',
        '/logo-main.png', // مثال لوجو البراند
    ]
};