export interface SubCategory {
  id: string;
  label: string;
}

export interface ParentDepartment {
  id: string;
  label: string;
  subtitle: string;
  subcategories: SubCategory[];
}

export const PARENT_DEPARTMENTS: ParentDepartment[] = [
  {
    id: 'watches-jewellery',
    label: 'Timepieces & Jewellery',
    subtitle: 'Haute Horlogerie & Joaillerie',
    subcategories: [
      { id: 'mens-watches', label: "Men's Timepieces" },
      { id: 'womens-watches', label: "Women's Timepieces" },
      { id: 'womens-jewellery', label: 'Fine Jewellery' }
    ]
  },
  {
    id: 'fragrance-beauty',
    label: 'Fragrance & Beauty',
    subtitle: 'Haute Parfumerie & Soins',
    subcategories: [
      { id: 'fragrances', label: 'Parfums & Scents' },
      { id: 'beauty', label: 'Luxury Cosmetics' },
      { id: 'skin-care', label: 'Cellular Skincare' }
    ]
  },
  {
    id: 'fashion-leather',
    label: 'Bags & Fashion',
    subtitle: 'Haute Maroquinerie & Mode',
    subcategories: [
      { id: 'womens-bags', label: 'Designer Handbags' },
      { id: 'sunglasses', label: 'Luxury Eyewear' },
      { id: 'womens-shoes', label: "Women's Footwear" },
      { id: 'mens-shoes', label: "Men's Footwear" },
      { id: 'womens-dresses', label: 'Couture Dresses' },
      { id: 'tops', label: 'Ready-To-Wear' },
      { id: 'mens-shirts', label: 'Tailored Shirts' }
    ]
  },
  {
    id: 'art-de-vivre',
    label: 'Maison & Living',
    subtitle: 'Art de Vivre & Fine Tech',
    subcategories: [
      { id: 'home-decoration', label: 'Home Décor' },
      { id: 'furniture', label: 'Artisan Furniture' },
      { id: 'smartphones', label: 'Flagship Tech' },
      { id: 'laptops', label: 'High-End Computing' }
    ]
  }
];

export function getParentDepartmentForCategory(categoryId: string): ParentDepartment | undefined {
  return PARENT_DEPARTMENTS.find((dept) =>
    dept.subcategories.some((sub) => sub.id === categoryId)
  );
}

export function getAllSubcategoriesForDepartment(departmentId: string): string[] {
  const dept = PARENT_DEPARTMENTS.find((d) => d.id === departmentId);
  return dept ? dept.subcategories.map((s) => s.id) : [];
}
