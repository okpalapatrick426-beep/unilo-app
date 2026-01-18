'use client'

import Image from 'next/image'
import { PaystackButton } from 'react-paystack'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const title = searchParams.get('title') ?? 'Unknown Hostel'
  const price = Number(searchParams.get('price')) || 0
  const image = searchParams.get('image') || '/placeholder.png'

  const partialConfig = {
    reference: `${Date.now()}`,
    email: 'student@unilo.com',
    amount: 200000, // ₦2,000 huddle fee
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
    onSuccess: () => router.push('/success?type=partial'),
  }

  const fullConfig = {
    reference: `${Date.now()}`,
    email: 'student@unilo.com',
    amount: price * 100, // kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
    onSuccess: () =>
      router.push(`/success?type=full&title=${encodeURIComponent(title)}`),
  }

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Checkout</h1>

      <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
        <Image src={image} width={600} height={350} alt={title} />
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</h2>
      <p style={{ color: '#555', marginBottom: 20 }}>
        Price: ₦{price.toLocaleString()}
      </p>

      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 10 }}>Option A: Huddle</h3>
        <PaystackButton {...partialConfig} text="Pay ₦2,000" />
      </section>

      <section>
        <h3 style={{ marginBottom: 10 }}>Option B: Full Rent</h3>
        <PaystackButton {...fullConfig} text="Pay Full Rent" />
      </section>
    </main>
  )
}
