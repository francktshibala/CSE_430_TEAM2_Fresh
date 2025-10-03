
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReviewsList from '@/app/ui/reviews-list';
import ReviewForm from '@/app/ui/review-form';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string;
  user: {
    name: string;
  };
  category: {
    name: string;
  };
}

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshReviews, setRefreshReviews] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Mock data for different product IDs
        const mockProducts: { [key: number]: Product } = {
          1: {
            id: 1,
            name: 'Handcrafted Ceramic Bowl',
            description: 'Beautiful handmade ceramic bowl perfect for serving or decoration. Made with love by local artisans.',
            price: 45.99,
            image: '/ceramic-bowls.webp',
            user: { name: 'Maria Rodriguez' },
            category: { name: 'Pottery' }
          },
          2: {
            id: 2,
            name: 'Wooden Animal Sculpture',
            description: 'Unique hand-carved wooden animal sculpture. Each piece is one-of-a-kind and showcases traditional woodworking techniques.',
            price: 89.99,
            image: '/animal-wood.webp',
            user: { name: 'Carlos Mendez' },
            category: { name: 'Wood Carving' }
          },
          3: {
            id: 3,
            name: 'Artisan Jewelry Set',
            description: 'Elegant handcrafted jewelry set featuring natural stones and silver. Perfect for special occasions or everyday wear.',
            price: 125.50,
            image: '/jewelry.webp',
            user: { name: 'Ana Silva' },
            category: { name: 'Jewelry' }
          }
        };
        
        const mockProduct = mockProducts[productId];
        
        if (!mockProduct) {
          setError('Product not found');
          return;
        }
        
        setProduct(mockProduct);
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleReviewSubmitted = () => {
    setRefreshReviews(prev => prev + 1);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666'
      }}>
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#c33'
      }}>
        {error || 'Product not found'}
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Product Details */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '40px',
          alignItems: 'start'
        }}>
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          </div>
          
          <div>
            <h1 style={{ 
              color: '#8B4513', 
              fontSize: '32px', 
              marginBottom: '10px' 
            }}>
              {product.name}
            </h1>
            
            <p style={{ 
              color: '#666', 
              fontSize: '16px', 
              marginBottom: '15px' 
            }}>
              by {product.user.name} • {product.category.name}
            </p>
            
            <p style={{ 
              fontSize: '28px', 
              fontWeight: 'bold', 
              color: '#8B4513',
              marginBottom: '20px'
            }}>
              ${product.price}
            </p>
            
            {product.description && (
              <p style={{ 
                color: '#555', 
                lineHeight: '1.6',
                marginBottom: '30px',
                fontSize: '16px'
              }}>
                {product.description}
              </p>
            )}
            
            <button style={{
              backgroundColor: '#8B4513',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '4px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '30px' 
      }}>
        <div>
          <ReviewForm 
            productId={productId} 
            onReviewSubmitted={handleReviewSubmitted}
          />
        </div>
        
        <div>
          <ReviewsList 
            productId={productId} 
            refreshTrigger={refreshReviews}
          />
        </div>
      </div>
    </div>
  );

}