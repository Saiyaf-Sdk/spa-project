import type { Product } from '@/types/product';

interface ProductLuxuryData {
  title?: string;
  brand?: string;
  description?: string;
  thumbnail: string;
  images: string[];
}

/**
 * Curated luxury overrides for outdated, low-resolution DummyJSON items.
 * Specifically targets smartphones (giving latest titanium/modern models),
 * men's shirts (Italian silk, Loro Piana cashmere overshirts, bespoke tailoring),
 * and fine jewelry (haute joaillerie emeralds, diamonds, 18K gold).
 */
export const LUXURY_PRODUCT_OVERRIDES: Record<number, ProductLuxuryData> = {
  // ==========================================
  // SMARTPHONES — Latest Flagship Models (iPhone 16 Pro, S24 Ultra, Pixel Fold)
  // ==========================================
  121: {
    title: 'Apple iPhone 16 Pro Max (Natural Titanium)',
    brand: 'Apple',
    description:
      'Forged in Grade 5 aerospace titanium with contoured edges, Super Retina XDR display with ProMotion, A18 Pro chip, and groundbreaking tactile Camera Control.',
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  122: {
    title: 'Apple iPhone 16 Pro (Black Titanium)',
    brand: 'Apple',
    description:
      'Obsidian-black titanium architecture featuring 48MP Fusion camera, studio-grade 4-mic array, and 4K 120 fps Dolby Vision capture for cinematic filmmaking.',
    thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  123: {
    title: 'Apple iPhone 15 Pro Max (Desert Gold Edition)',
    brand: 'Apple',
    description:
      'Warm titanium finish with textured matte-glass back, Action button, and 5x optical telephoto tetraprism periscope lens.',
    thumbnail: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  124: {
    title: 'Apple iPhone 15 Pro (White Titanium Studio)',
    brand: 'Apple',
    description:
      'Ceramic Shield front and satin-brushed white titanium frame with Dynamic Island and always-on 120Hz display.',
    thumbnail: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  125: {
    title: 'Oppo Find X7 Ultra (Satellite Glass & Artisan Leather)',
    brand: 'Oppo',
    description:
      'Flagship dual-periscope camera system co-engineered with Hasselblad, wrapped in hand-stitched vegan leather and polished aluminum.',
    thumbnail: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  126: {
    title: 'Oppo Find N3 Fold (Champagne Gold)',
    brand: 'Oppo',
    description:
      'Masterpiece ultra-slim foldable smartphone with aviation-grade carbon-fiber hinge and Sony LYT-T808 stacked sensor.',
    thumbnail: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  127: {
    title: 'Oppo Reno 12 Pro (Nebula Silver Holographic)',
    brand: 'Oppo',
    description:
      'Flowing metallic liquid-glass design featuring 120Hz Infinite View AMOLED display and pro portrait computational optics.',
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  128: {
    title: 'Realme GT5 Pro (Starry Night Noir)',
    brand: 'Realme',
    description:
      'Brushed aerospace aluminum frame with Sony IMX890 periscope telephoto sensor and ultra-bright 4500-nit HDR display.',
    thumbnail: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  129: {
    title: 'Google Pixel 9 Pro Fold (Obsidian Black)',
    brand: 'Google',
    description:
      'Machined aerospace-grade multi-alloy steel gear hinge with Super Actua Flex displays and Tensor G4 computational AI.',
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  130: {
    title: 'Google Pixel 9 Pro (Porcelain & Polished Metal)',
    brand: 'Google',
    description:
      'Polished metal enclosure with sculpted matte glass and iconic camera visor housing triple pro-grade lenses.',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  131: {
    title: 'Samsung Galaxy S24 Ultra (Titanium Gray)',
    brand: 'Samsung',
    description:
      'Durable titanium exterior with flat 6.8-inch Dynamic AMOLED 2X display, Corning Gorilla Armor, and embedded S Pen stylus.',
    thumbnail: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  132: {
    title: 'Samsung Galaxy S24+ (Cobalt Violet)',
    brand: 'Samsung',
    description:
      'Satin-finished Armor Aluminum frame with uniform ultra-thin bezels, QHD+ resolution, and intelligent Galaxy AI suite.',
    thumbnail: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  133: {
    title: 'Samsung Galaxy Z Fold 6 (Silver Shadow)',
    brand: 'Samsung',
    description:
      'Symmetrical sharp-edge luxury aesthetic with dual displays, strengthened Armor Aluminum frame, and S Pen support.',
    thumbnail: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  134: {
    title: 'Vivo X100 Ultra (Titanium Gold / Zeiss APO)',
    brand: 'Vivo',
    description:
      'Sunburst luxury bezel framing the 200MP Zeiss APO super telephoto camera and 1-inch Sony LYT-900 imaging sensor.',
    thumbnail: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  135: {
    title: 'Vivo X Fold 3 Pro (Celestial Black Carbon)',
    brand: 'Vivo',
    description:
      'Ultra-light folding flagship encased in carbon fiber armor, featuring Zeiss T* multi-coating optics and Snapdragon 8 Gen 3.',
    thumbnail: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  136: {
    title: 'Sony Xperia 1 VI (Platinum Silver)',
    brand: 'Sony',
    description:
      'Artisanal Japanese tactile glass with 19.5:9 BRAVIA HDR OLED display and 85-170mm true continuous optical zoom lens.',
    thumbnail: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ==========================================
  // MEN'S SHIRTS & LUXURY WEAR — Bespoke Italian Silk, Loro Piana Style, Tailored Poplin
  // ==========================================
  83: {
    title: 'Bespoke Italian Silk Dress Shirt (Midnight Azure)',
    brand: 'Brioni',
    description:
      'Hand-tailored in Lombardy from pure 22-momme Mulberry silk. Features natural Australian mother-of-pearl buttons and a structured spread collar.',
    thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  84: {
    title: 'Minimalist Cashmere-Silk Knit Crewneck (Noir)',
    brand: 'Tom Ford',
    description:
      'Spun from Grade-A Inner Mongolian baby cashmere and mulberry silk. Unsurpassed softness with hand-finished ribbed cuffs and hem.',
    thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  85: {
    title: 'Double-Faced Cashmere Overshirt (Camel Wool)',
    brand: 'Loro Piana',
    description:
      'Crafted from double-faced baby cashmere with genuine horn buttons, clean architectural welt pockets, and water-repellent Rain System finish.',
    thumbnail: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  86: {
    title: 'French Riviera Camp-Collar Linen Shirt (Ecru Chalk)',
    brand: 'Brunello Cucinelli',
    description:
      'Woven in Normandy from pure long-staple flax linen. Cut in a relaxed modern drape with retro camp collar and mother-of-pearl buttons.',
    thumbnail: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  87: {
    title: 'Savile Row Royal Oxford Dress Shirt (Crisp White)',
    brand: 'Turnbull & Asser',
    description:
      'Woven in England from double-twisted 120s Giza cotton with a lustrous basketweave, French cuffs, and hand-turned semi-cutaway collar.',
    thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ==========================================
  // WOMEN'S JEWELLERY — Haute Joaillerie (Cartier, Van Cleef, Bulgari)
  // ==========================================
  182: {
    title: 'Haute Joaillerie Colombian Emerald & Diamond Drop Earrings (18K Gold)',
    brand: 'Cartier',
    description:
      'Pair of cushion-cut natural Colombian emeralds totaling 5.2 carats, suspended within a cascade of pear and brilliant-cut VVS1 pavé diamonds set in 18K white gold.',
    thumbnail: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  183: {
    title: 'Vintage Alhambra Malachite & Diamond Earrings (18K Yellow Gold)',
    brand: 'Van Cleef & Arpels',
    description:
      'Intensely banded natural green malachite clovers bordered with golden guilloché beads and round brilliant center diamonds.',
    thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  184: {
    title: 'Serpenti Diamond & Sapphire Chandelier Earrings (18K Rose Gold)',
    brand: 'Bulgari',
    description:
      'Coiled geometric scales of 18K rose gold set with pavé diamonds and drop-cut Burmese royal blue sapphires for timeless allure.',
    thumbnail: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop'
    ]
  },

  // ==========================================
  // WOMEN'S DRESSES & COUTURE WEAR
  // ==========================================
  177: {
    title: 'Haute Couture Silk Chiffon Evening Gown',
    brand: 'Saint Laurent',
    description:
      'Floor-sweeping silk chiffon evening gown with draped asymmetric neckline and fluid split hem crafted in Paris.',
    thumbnail: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop'
    ]
  },
  178: {
    title: 'Atelier Lambskin Leather Bustier & Fluted Skirt',
    brand: 'Alexander McQueen',
    description:
      'Sculpted Italian nappa leather bustier paired with a precision-pleated crepe midi skirt with silver-tone hardware.',
    thumbnail: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop']
  },
  179: {
    title: 'Midnight Velvet Cocktail Dress & Pleated Satin',
    brand: 'Balmain',
    description:
      'Rich plush velvet bodice with signature structured shoulders and pleated duchesse satin skirt.',
    thumbnail: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop']
  },
  180: {
    title: 'Emerald Silk Charmeuse Bias-Cut Slip Dress',
    brand: 'The Row',
    description:
      'Minimalist fluid silhouette cut on the bias from heavy 30-momme silk charmeuse in deep jewel-tone emerald.',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop']
  },
  181: {
    title: 'Crimson & Noir Tailored Power Trouser Suit',
    brand: 'Marni',
    description:
      'Single-breasted architectural blazer with peak lapels and matching high-waisted cigarette trousers in virgin wool.',
    thumbnail: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop']
  },

  // ==========================================
  // TOPS & BLOUSE WEAR
  // ==========================================
  162: {
    title: 'Royal Azure Draped Silk Georgette Blouse',
    brand: 'Chloé',
    description:
      'Ethereal silk georgette blouse featuring fluid draped cape sleeves and delicate mother-of-pearl buttons.',
    thumbnail: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop']
  },
  163: {
    title: 'Côte d’Azur Halter Linen Resort Dress',
    brand: 'Jacquemus',
    description:
      'Breezy halterneck silhouette tailored from washed French linen with an open back and self-tie detailing.',
    thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop']
  },
  164: {
    title: 'Slate Grey Cashmere Ribbed Knit Midi',
    brand: 'Khaite',
    description:
      'Sculptural ribbed knit dress spun from ultra-fine Mongolian cashmere with sweetheart neckline.',
    thumbnail: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop']
  },
  165: {
    title: 'Ivory Organza Pleated Atelier Mini Dress',
    brand: 'Giambattista Valli',
    description:
      'Voluminous tiered organza mini dress adorned with delicate hand-pleated ruffles and satin silk lining.',
    thumbnail: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1200&auto=format&fit=crop']
  },
  166: {
    title: 'Parisian Bouclé Tweed Tailored Shift Dress',
    brand: 'Chanel',
    description:
      'Classic heritage bouclé tweed shift dress with woven metallic threads and lion-head gold-crested buttons.',
    thumbnail: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop']
  },

  // ==========================================
  // WOMEN'S BAGS
  // ==========================================
  172: {
    title: 'Azure Clémence Leather Birkin-Style Tote (30cm)',
    brand: 'Hermès',
    description:
      'Hand-stitched taurillon Clémence calfskin tote with palladium hardware, clochette, and padlock.',
    thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop']
  },
  173: {
    title: 'Intrecciato Nappa Leather Cassette Crossbody',
    brand: 'Bottega Veneta',
    description:
      'Signature oversized woven double-face nappa leather with adjustable shoulder strap and magnetic closure.',
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop']
  },
  174: {
    title: 'Prada Re-Edition Saffiano Leather Handbag',
    brand: 'Prada',
    description:
      'Cross-hatch textured Saffiano leather featuring iconic enameled metal triangle logo and detachable pouch.',
    thumbnail: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop']
  },
  175: {
    title: 'Saint Laurent City Calfskin Backpack (Ivory)',
    brand: 'Saint Laurent',
    description:
      'Minimalist full-grain calfskin leather backpack with embossed silver foil lettering and padded canvas straps.',
    thumbnail: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop']
  },
  176: {
    title: 'Chanel Classic Flap Quilted Lambskin Bag (Noir)',
    brand: 'Chanel',
    description:
      'Diamond-quilted supple lambskin leather with 24K gold-plated CC turnlock clasp and leather-interlaced chain strap.',
    thumbnail: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop']
  },

  // ==========================================
  // SUNGLASSES
  // ==========================================
  154: {
    title: 'Titanium Aviator Sunglasses (Polarized Zeiss Lenses)',
    brand: 'Cartier',
    description:
      'Ultra-light Japanese titanium aviators featuring signature Santos screw accents and grey polarized Carl Zeiss lenses.',
    thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop']
  },
  155: {
    title: 'Classic Tortoiseshell Acetate Sunglasses',
    brand: 'Tom Ford',
    description:
      'Handcrafted Italian acetate frames in rich Havana tortoiseshell with signature gold metal T-temple detailing.',
    thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop']
  },
  156: {
    title: 'Emerald Tint Hexagonal Wire Frame Eyewear',
    brand: 'Oliver Peoples',
    description:
      'Filigree-engraved titanium wire frame fitted with emerald-tinted mineral glass lenses with 100% UVA/UVB protection.',
    thumbnail: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop']
  },
  157: {
    title: 'Oversized Gold-Trim 70s Heritage Sunglasses',
    brand: 'Gucci',
    description:
      'Bold geometric 1970s silhouette with polished gold metal rims and gradient brown anti-reflective lenses.',
    thumbnail: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1200&auto=format&fit=crop']
  },
  158: {
    title: 'Minimalist Platinum Round Frame Sunglasses',
    brand: 'Mykita',
    description:
      'Screwless hinge construction cut from surgical stainless steel in matte platinum finish with smoke gradient lenses.',
    thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop']
  },

  // ==========================================
  // HAUTE HORLOGERIE — MEN'S & WOMEN'S WATCHES
  // ==========================================
  93: {
    title: 'Audemars Piguet Royal Oak Chronograph (18K Rose Gold)',
    brand: 'Audemars Piguet',
    description:
      'Iconic octagonal bezel with hexagonal screws, Grande Tapisserie pattern dial, and integrated hand-finished rose gold bracelet.',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop']
  },
  94: {
    title: 'Longines Master Collection Moonphase Chronometer',
    brand: 'Longines',
    description:
      'Swiss automatic mechanical chronometer featuring silver barleycorn dial, blued-steel hands, and astronomical moon phase display.',
    thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop']
  },
  95: {
    title: 'Rolex Cellini Date (18K Everose Gold)',
    brand: 'Rolex',
    description:
      'Double fluted bezel, guilloche dial, and hand-stitched alligator leather strap with 18K Everose gold buckle.',
    thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop']
  },
  96: {
    title: 'Rolex Cellini Moonphase (18K White Gold)',
    brand: 'Rolex',
    description:
      'White lacquer dial with blue enameled disc at 6 o’clock displaying the full moon with genuine meteorite applique.',
    thumbnail: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop']
  },
  97: {
    title: 'Rolex Datejust 41 Fluted Bezel (Oystersteel & Yellow Gold)',
    brand: 'Rolex',
    description:
      'Champagne dial with Chromalight display, iconic Jubilee five-piece link bracelet, and caliber 3235 automatic movement.',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop']
  },
  98: {
    title: 'Rolex Submariner Date Ceramic (Cerachrom Bezel)',
    brand: 'Rolex',
    description:
      'Legendary divers watch in Oystersteel featuring unidirectional rotatable Cerachrom bezel and luminescent capsule.',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop']
  },
  190: {
    title: 'IWC Ingenieur Automatic 40 Steel (Aqua Dial)',
    brand: 'IWC Schaffhausen',
    description:
      'Gérald Genta designed timepiece with grid dial pattern, integrated H-link bracelet, and soft-iron inner case for magnetic protection.',
    thumbnail: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop']
  },
  191: {
    title: 'Rolex Cellini Dual Time (18K Everose Gold)',
    brand: 'Rolex',
    description:
      'Simultaneous display of two time zones with sun and moon day/night indicator in a subdial aperture at 6 o’clock.',
    thumbnail: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop']
  },
  192: {
    title: 'Rolex Lady-Datejust Diamond Bezel (Mother-of-Pearl Dial)',
    brand: 'Rolex',
    description:
      'Shimmering natural mother-of-pearl dial set with 10 diamond hour markers and a brilliant-cut diamond bezel in 18K white gold.',
    thumbnail: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop']
  },
  193: {
    title: 'Cartier Panthère de Cartier Watch (18K Yellow Gold)',
    brand: 'Cartier',
    description:
      'Sensual flexible link bracelet with blue spinel cabochon crown and silvered dial with blued-steel sword hands.',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop']
  },
  194: {
    title: 'Jaeger-LeCoultre Reverso Classic Duetto',
    brand: 'Jaeger-LeCoultre',
    description:
      'Reversible art deco case offering two dials — silver guilloché for day and black sunray with twin diamond rows for evening.',
    thumbnail: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop']
  }
};

/**
 * High-resolution fallback photography for categories to ensure no low-res or ugly placeholder is ever displayed.
 */
export const CATEGORY_FALLBACK_IMAGES: Record<string, string[]> = {
  smartphones: [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=1200&auto=format&fit=crop'
  ],
  'mens-shirts': [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop'
  ],
  'womens-jewellery': [
    'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop'
  ],
  'womens-dresses': [
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop'
  ],
  tops: [
    'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop'
  ],
  'womens-bags': [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop'
  ],
  sunglasses: [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop'
  ],
  'mens-watches': [
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop'
  ],
  'womens-watches': [
    'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop'
  ]
};

/**
 * Enriches a raw product with high-fashion, latest-model photography,
 * refined titles, and bespoke descriptions.
 */
export function enrichProductWithLuxuryData(product: Product): Product {
  const override = LUXURY_PRODUCT_OVERRIDES[product.id];
  if (override) {
    return {
      ...product,
      title: override.title ?? product.title,
      brand: override.brand ?? product.brand,
      description: override.description ?? product.description,
      thumbnail: override.thumbnail,
      images: override.images.length > 0 ? override.images : [override.thumbnail]
    };
  }

  // If no specific override but belongs to one of the target categories and has low-res dummyjson image
  const categoryFallbacks = CATEGORY_FALLBACK_IMAGES[product.category];
  if (categoryFallbacks && categoryFallbacks.length > 0 && product.thumbnail?.includes('dummyjson.com')) {
    const fallbackImage = categoryFallbacks[product.id % categoryFallbacks.length];
    return {
      ...product,
      thumbnail: fallbackImage,
      images: [fallbackImage, ...categoryFallbacks.filter((u) => u !== fallbackImage)]
    };
  }

  return product;
}
