import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('/rest/v1/', '') ?? '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  { slug: 'luxury-villa-beverly-hills', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800' },
  { slug: 'modern-penthouse-downtown', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800' },
  { slug: 'charming-family-home', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800' },
  { slug: 'oceanfront-escape-miami', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800' },
  { slug: 'industrial-skyline-loft', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800' },
  { slug: 'modern-lakeside-manor', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800' },
  { slug: 'luxury-high-rise-condo', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800' },
  { slug: 'garden-villa-retreat', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800' },
  { slug: 'hilltop-estate', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800' },
  { slug: 'downtown-studio', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5958?q=80&w=800' },
  { slug: 'suburban-haven', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800' },
  { slug: 'beachfront-condo', image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800' },
  { slug: 'mountain-cabin', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800' },
  { slug: 'historic-brownstone', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800' },
  { slug: 'sunny-desert-villa', image: 'https://images.unsplash.com/photo-1516245834210-caddc14da757?q=80&w=800' },
  { slug: 'urban-townhouse', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800' },
  { slug: 'forest-edge-cabin', image: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800' },
  { slug: 'skyline-penthouse', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=800' },
  { slug: 'riverfront-cottage', image: 'https://images.unsplash.com/photo-1582268611954-eb803fde0c5b?q=80&w=800' },
  { slug: 'vineyard-estate', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800' },
  { slug: 'suburban-villa', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800' },
  { slug: 'eco-friendly-home', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5958?q=80&w=800' },
  { slug: 'artistic-studio', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=800' },
  { slug: 'colonial-manor', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800' },
  { slug: 'cliffside-retreat', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800' },
  { slug: 'city-center-apartment', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800' },
  { slug: 'mountain-lodge', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800' },
  { slug: 'urban-oasis', image: 'https://images.unsplash.com/photo-1516245834210-caddc14da757?q=80&w=800' },
  { slug: 'waterfront-villa', image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800' },
  { slug: 'classic-rowhouse', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800' },
];

async function updateImages() {
  for (const item of updates) {
    const { data, error } = await supabase
      .from('properties')
      .update({ image_urls: [item.image] })
      .eq('slug', item.slug);

    if (error) {
      console.error(`Error updating ${item.slug}:`, error.message);
    } else {
      console.log(`Updated ${item.slug} successfully.`);
    }
  }
}

updateImages();
