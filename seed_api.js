const sampleOrders = [
  { id: '101', customer: 'Alex Rivera', items: [{ name: 'Pro Wireless Headphones', qty: 1, price: 149.99 }, { name: 'USB-C Cable 2m', qty: 2, price: 15.00 }], amount: 179.99, status: 'Delivered', placed_at: '2026-07-24T10:30:00Z' },
  { id: '102', customer: 'Sophia Chen', items: [{ name: 'Ergonomic Mechanical Keyboard', qty: 1, price: 129.50 }], amount: 129.50, status: 'Shipped', placed_at: '2026-07-24T14:15:00Z' },
  { id: '103', customer: 'Marcus Johnson', items: [{ name: '4K UltraHD Monitor 27"', qty: 1, price: 349.99 }, { name: 'HDMI 2.1 Cable', qty: 1, price: 20.00 }], amount: 369.99, status: 'Processing', placed_at: '2026-07-25T08:00:00Z' },
  { id: '104', customer: 'Emma Watson', items: [{ name: 'Noise Cancelling Earbuds', qty: 1, price: 89.99 }], amount: 89.99, status: 'Placed', placed_at: '2026-07-25T11:00:00Z' },
  { id: '105', customer: 'David Kim', items: [{ name: 'Smart Fitness Watch v2', qty: 1, price: 199.00 }], amount: 199.00, status: 'Cancelled', placed_at: '2026-07-23T18:45:00Z' },
  { id: '106', customer: 'Liam O\'Connor', items: [{ name: 'Precision Gaming Mouse', qty: 1, price: 65.00 }, { name: 'RGB Mousepad XL', qty: 1, price: 25.00 }], amount: 90.00, status: 'Delivered', placed_at: '2026-07-22T09:12:00Z' },
  { id: '107', customer: 'Olivia Taylor', items: [{ name: 'Desk LED Lamp with Charger', qty: 1, price: 45.00 }], amount: 45.00, status: 'Shipped', placed_at: '2026-07-24T16:20:00Z' },
  { id: '108', customer: 'Noah Williams', items: [{ name: 'Aluminum Laptop Stand', qty: 1, price: 49.99 }, { name: 'Webcam Cover 3-pack', qty: 1, price: 9.99 }], amount: 59.98, status: 'Processing', placed_at: '2026-07-25T09:30:00Z' }
];

async function seed() {
  console.log('Seeding mockapi...');
  for (const item of sampleOrders) {
    try {
      const res = await fetch('https://6a636b4ab30b52361e1a42f8.mockapi.io/Orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      const data = await res.json();
      console.log('Created order:', item.id, 'Response ID:', data.id, 'Status code:', res.status);
    } catch (err) {
      console.error('Error seeding item', item.id, err);
    }
  }
}

seed();
