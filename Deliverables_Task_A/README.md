# Deliverables - Task A (Order Tracker Mobile App)

## 📋 Required Deliverables Summary

1. **Public GitHub Repository**:
   [https://github.com/JayanthSD2003/Digital_Heros_Mobile_Application_Development_Assessment](https://github.com/JayanthSD2003/Digital_Heros_Mobile_Application_Development_Assessment)

2. **Live Mock API URL**:
   [https://6a636b4ab30b52361e1a42f8.mockapi.io/Orders](https://6a636b4ab30b52361e1a42f8.mockapi.io/Orders)

3. **APK Download Link**:
   [Download Standalone Android APK](https://expo.dev/accounts/jayanthsd2003/projects/order-tracker/builds/df7c1541-9db1-4cb8-a892-5e941c1a0365)

4. **Expo Preview Link (Expo Go)**:
   `exp://192.168.1.6:8081`

5. **Live Web Preview**:
   `http://localhost:8080`

---

## 🚀 Task A Features Implemented

- **Mock API**: Seeded 8 realistic order records with `id`, `customer`, `items` array, `amount`, `status`, and `placed_at` timestamps.
- **Screen 1 (Orders List)**:
  - Live fetching from Mock API with pull-to-refresh (`RefreshControl`).
  - Search bar (by Order ID or Customer Name) + Horizontal Status Filter Tabs (`All`, `Placed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
  - Color-coded status chips with custom icons for each order status.
- **Screen 2 (Order Detail)**:
  - Customer information card & order timestamps.
  - Itemized order breakdown showing unit prices, quantities, and subtotal.
  - Payment summary table.
  - **Vertical Status Timeline**: Interactive step progression tracking order status from *Placed* to *Delivered* (or *Cancelled*).
- **State Handling**: Shimmering loading skeletons (`SkeletonLoader`), clean empty state (`EmptyState`), and error retry state (`ErrorState`).
- **Mandatory Live Build Requirement**: Visible footer credit reading *"Built for Digital Heroes Training Task"* linked to [digitalheroesco.com](https://digitalheroesco.com).
