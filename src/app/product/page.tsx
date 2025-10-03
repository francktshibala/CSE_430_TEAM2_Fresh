import { getAllProducts } from '@/lib/data';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        color: '#8B4513', 
        fontSize: '32px', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        All Products
      </h1>
      
      {products.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '50px',
          backgroundColor: 'white',
          borderRadius: '8px'
        }}>
          <p style={{ color: '#666', fontSize: '18px' }}>
            No products available yet.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/product/${product.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    marginBottom: '15px'
                  }}
                />
                <h3 style={{
                  color: '#8B4513',
                  fontSize: '18px',
                  marginBottom: '10px'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  color: '#8B4513',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}