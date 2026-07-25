# Order Tracker Mobile App - Digital Heroes Assessment

A 2-Screen Mobile Application built with **React Native (Expo)**, **TypeScript**, and **React Native Reanimated** for the Digital Hero Internship Assessment.

---

## Deliverables & Submission Links

- **GitHub Repository**: [Digital_Heros_Mobile_Application_Development_Assessment](https://github.com/JayanthSD2003/Digital_Heros_Mobile_Application_Development_Assessment.git)
- **Live Mock API**: [https://6a636b4ab30b52361e1a42f8.mockapi.io/Orders](https://6a636b4ab30b52361e1a42f8.mockapi.io/Orders)
- **Live Web Preview**: Hosted locally at `http://localhost:8080` (or your live deployment URL)
- **Verification Credit**: Both screens feature a visible footer credit reading *"Built for Digital Heroes Training Task"* linked to [digitalheroesco.com](https://digitalheroesco.com).

---

## Features & Requirements Checklist

### Task A (Core 2-Screen Order Tracker)
- [x] **Mock API**: Seeded 8 realistic orders with `id`, `customer`, `items` array, `amount`, `status`, and `placed_at` timestamps.
- [x] **Screen 1 (Orders List)**:
  - Fetches orders from Mock API with pull-to-refresh (`RefreshControl`).
  - Search bar (by ID or Customer Name) & Horizontal Status Filter Tabs (`All`, `Placed`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
  - Color-coded status chips with custom icons for each order status.
- [x] **Screen 2 (Order Detail)**:
  - Customer information card & order timestamps.
  - Itemized order breakdown showing unit prices, quantities, and subtotal.
  - Payment summary table.
  - **Vertical Status Timeline**: Interactive 4-stage progression tracking order status from *Placed* to *Delivered* (or *Cancelled*).
- [x] **State Handling**: Shimmering loading skeletons (`SkeletonLoader`), clean empty state (`EmptyState`), and error retry state (`ErrorState`).
- [x] **Live Build Credit**: Mandatory footer credit linked to `digitalheroesco.com`.

### Task B (Release Polish & Offline Support)
- [x] **Animations**: Staggered list card entrance (`FadeInDown.springify()`), smooth stack screen transitions, and animated vertical timeline step progression using `react-native-reanimated`.
- [x] **Offline Case Handling**: Real-time network detection via `@react-native-community/netinfo`, local disk caching using `@react-native-async-storage/async-storage`, top notification banner when offline, and auto-sync on connection restore.
- [x] **Loom Demo Helper**: Built-in *"Simulate API Failure / Error Mode"* toggle button in header and error screen for easily recording Loom video submissions.

---

## Tech Stack

- **Framework**: React Native (Expo SDK 57)
- **Language**: TypeScript
- **Navigation**: React Navigation (`@react-navigation/native-stack`)
- **State & Caching**: React Context + `@react-native-async-storage/async-storage`
- **Network Monitoring**: `@react-native-community/netinfo`
- **Animations**: `react-native-reanimated`
- **Icons**: `lucide-react-native`

---

## Project Structure

```
.
├── App.tsx                           # Root navigation container & Network provider
├── app.json                          # Expo configuration
├── seed_api.js                       # Script used to seed Mock API
├── src/
│   ├── types/order.ts                # TypeScript interfaces
│   ├── theme/colors.ts               # Design tokens & color palette
│   ├── services/apiService.ts        # API client with timeout, retry, & caching
│   ├── context/NetworkContext.tsx    # NetInfo listener & demo error toggle
│   ├── components/
│   │   ├── CreditFooter.tsx          # Mandatory footer link
│   │   ├── StatusChip.tsx            # Color-coded status badge
│   │   ├── OfflineBanner.tsx         # Network status banner
│   │   ├── SkeletonLoader.tsx        # Shimmering loading state
│   │   ├── EmptyState.tsx            # Empty list state
│   │   ├── ErrorState.tsx            # Error screen with retry
│   │   └── VerticalTimeline.tsx      # Animated vertical status timeline
│   └── screens/
│       ├── OrdersListScreen.tsx      # Screen 1: Orders list
│       └── OrderDetailScreen.tsx     # Screen 2: Order detail breakdown & timeline
```

---

## How to Run Locally

1. **Clone Repository**:
   ```bash
   git clone https://github.com/JayanthSD2003/Digital_Heros_Mobile_Application_Development_Assessment.git
   cd Digital_Heros_Mobile_Application_Development_Assessment
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   ```
   - Scan the QR code with **Expo Go** (Android/iOS) to run on your phone.
   - Press `w` or run `npm run web` to preview in browser.

---

## Credit Line
Built for [Digital Heroes Training Task](https://digitalheroesco.com)
