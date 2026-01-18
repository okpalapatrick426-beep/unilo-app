import { getAllHostels } from "@/action";
import Link from "next/link";

export default async function Page() {
  // Fetch data first to avoid "hostels is not defined" error
  const hostels = await getAllHostels() || [];

  return (
    <main style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '100px', fontFamily: 'Circular, -apple-system, system-ui, sans-serif' }}>
      
      {/* 1. STICKY TOP SEARCH BAR */}
      <div style={{ position: 'sticky', top: 0, backgroundColor: '#fff', padding: '12px 24px', zIndex: 100, borderBottom: '1px solid #ebebeb' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', borderRadius: '1000px', boxShadow: '0 3px 12px rgba(0,0,0,0.08)', border: '0.5px solid #ddd' }}>
          <span style={{ marginRight: '16px' }}>🔍</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#222' }}>Start your search</div>
            <div style={{ fontSize: '12px', color: '#717171' }}>Anywhere • Any week • Add guests</div>
          </div>
        </div>
      </div>

      {/* 2. HORIZONTAL SCROLL SECTION (Like "Recently Viewed") */}
      <div style={{ padding: '24px 0 0 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', letterSpacing: '-0.5px' }}>Recently viewed</h2>
        
        <div style={{ 
          display: 'flex', 
          overflowX: 'auto', 
          gap: '16px', 
          paddingRight: '24px',
          scrollbarWidth: 'none', // Hides scrollbar on Firefox
          msOverflowStyle: 'none', // Hides scrollbar on IE/Edge
        }}>
          {/* Webkit hide scrollbar hack */}
          <style>{`div::-webkit-scrollbar { display: none; }`}</style>

          {hostels.map((hostel: any, index: number) => (
            <div key={index} style={{ minWidth: '160px', width: '160px', flexShrink: 0 }}>
              {/* Square Image with Heart */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', marginBottom: '8px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400" 
                  alt="hostel"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
                />
                <div style={{ position: 'absolute', top: '8px', right: '8px', color: '#fff', fontSize: '18px', filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }}>♡</div>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '600', margin: 0, color: '#222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {hostel.junction || 'Nigeria'}
              </h3>
              <p style={{ margin: '0', color: '#717171', fontSize: '13px' }}>1 bed • ★ 4.9</p>
              
              <Link href={`/success?type=partial&title=${encodeURIComponent(hostel.title)}`} style={{ textDecoration: 'none' }}>
                <button style={{ marginTop: '8px', width: '100%', padding: '6px', fontSize: '11px', borderRadius: '6px', backgroundColor: '#e31c5f', color: '#fff', border: 'none', fontWeight: '600' }}>
                  Speak to Agent
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 3. VERTICAL POPULAR SECTION */}
      <div style={{ padding: '32px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px' }}>Popular homes</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {hostels.slice(0, 4).map((hostel: any, index: number) => (
            <div key={index}>
               <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '12px', overflow: 'hidden', marginBottom: '8px' }}>
                  <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </div>
               <div style={{ fontSize: '14px', fontWeight: '600' }}>{hostel.title}</div>
               <div style={{ fontSize: '13px', color: '#717171' }}>₦{hostel.price?.toLocaleString()} night</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BOTTOM NAVIGATION */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '65px', backgroundColor: '#fff', borderTop: '1px solid #ebebeb', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 1000 }}>
        <div style={{ textAlign: 'center', color: '#e31c5f' }}><div style={{ fontSize: '20px' }}>🔍</div><div style={{ fontSize: '10px', fontWeight: '600' }}>Explore</div></div>
        <div style={{ textAlign: 'center', color: '#717171' }}><div style={{ fontSize: '20px' }}>♡</div><div style={{ fontSize: '10px' }}>Wishlists</div></div>
        <div style={{ textAlign: 'center', color: '#717171' }}><div style={{ fontSize: '20px' }}>👤</div><div style={{ fontSize: '10px' }}>Profile</div></div>
      </div>
    </main>
  );
}