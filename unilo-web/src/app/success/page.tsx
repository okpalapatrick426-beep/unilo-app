import { getHostelDetails } from "@/action";
import Link from "next/link";

export default async function SuccessPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ title?: string }> 
}) {
  // 1. Await the title from the URL
  const { title } = await searchParams;
  const decodedTitle = decodeURIComponent(title || "");
  const hostel = await getHostelDetails(decodedTitle);

  if (!hostel) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Property details not found.</div>;
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '40px 20px',
      fontFamily: 'system-ui, -apple-system',
      textAlign: 'center'
    }}>
      {/* 2. SUCCESS ICON */}
      <div style={{ 
        width: '60px', 
        height: '60px', 
        backgroundColor: '#00cc66', 
        borderRadius: '8px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <span style={{ color: 'white', fontSize: '30px', fontWeight: 'bold' }}>✓</span>
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 10px 0' }}>Payment Successful!</h1>
      <p style={{ color: '#666', fontSize: '16px', marginBottom: '30px' }}>
        You have successfully unlocked the property location.
      </p>

      {/* 3. EXACT ADDRESS BOX */}
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        border: '2px dashed #00cc66', 
        borderRadius: '20px', 
        padding: '30px 20px',
        marginBottom: '40px',
        backgroundColor: '#fff'
      }}>
        <div style={{ color: '#00cc66', fontWeight: 'bold', fontSize: '13px', letterSpacing: '1px', marginBottom: '10px' }}>
          EXACT ADDRESS:
        </div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', lineHeight: '1.4' }}>
          {hostel.secret_location}
        </div>
        {/* Added Landlord Contact for extra value */}
        <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
          <span style={{ color: '#666', fontSize: '14px' }}>Contact: </span>
          <span style={{ fontWeight: '600' }}>{hostel.contact}</span>
        </div>
      </div>

      {/* 4. RETURN HOME BUTTON */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <button style={{ 
          backgroundColor: '#1a2233', 
          color: 'white', 
          padding: '15px 40px', 
          borderRadius: '30px', 
          border: 'none', 
          fontSize: '16px', 
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Return to Home
        </button>
      </Link>
    </main>
  );
}