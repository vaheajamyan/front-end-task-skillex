# Skillex
## Task: Build a Dynamic Filtering System for a Product Catalog (React.js without TypeScript) "You can use any library which you prefer"

## Objective
Implement a dynamic filtering system for a product catalog using **React.js** (without TypeScript) that allows users to filter products based on multiple criteria such as category, price range, brand, and rating.

## Task Details

### 1. Data Fetching
- Fetch product data from a given use mock data.
- Ensure efficient data fetching and handle pagination if necessary.

### 2. Filter Options
- Display available filters for **category**, **brand**, **price range slider**, and **rating** in a sidebar or filter panel.
- Allow users to apply multiple filters simultaneously.

### 3. Real-Time Filtering
- Implement real-time filtering as users interact with the filter options.
- Use **debouncing** (with `setTimeout` or a custom hook) to prevent unnecessary renders and API calls when filtering by text input (e.g., price range or search).

### 4. Responsive Design
- Ensure the filtering system works smoothly on mobile and desktop devices.
- Implement a **collapsible filter menu** for smaller screens using React state to manage visibility.

### 5. User Feedback
- Show a **loading spinner** (using a component or library like `react-spinners`) while fetching or applying filters.
- Display a **"no products found"** message if no products match the current filters.

### 6. Optimization
- Ensure the filtering and rendering processes are optimized for performance, particularly when dealing with large datasets.

### 7. Sort Options (Bonus)
- Add the ability to **sort products** by different criteria such as price, rating, and popularity.
- Allow the sorting options to integrate with the filtering, updating the product list accordingly.

### 8. Extra (Bonus)
- Implement **localStorage** to save user filter and sorting preferences so they persist when users revisit the page or refresh.

## Example Stack
- **React.js**: You can use (`useState`, `useEffect`, `useMemo`) for state and side effects or library which you prefer.
- **CSS or SCSS**: For styling the filter UI and making it responsive.
- **Debouncing**: Use a custom hook or utility function for optimizing real-time filtering inputs.

## Expected Deliverables
- A fully functional product filtering system that works without page reloads.
- A responsive and user-friendly UI that provides feedback during loading/filtering states.
- Bonus: Sorting and persistent filter preferences using `localStorage`.

---

## Mock Data

Here is an example of mock data you can use for the task also if you want you can modify it:

```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "category": "Electronics",
    "brand": "Brand A",
    "price": 99.99,
    "rating": 4.5,
    "imageUrl": "https://example.com/images/headphones.jpg"
  },
  {
    "id": 2,
    "name": "Bluetooth Speaker",
    "category": "Electronics",
    "brand": "Brand B",
    "price": 49.99,
    "rating": 4.0,
    "imageUrl": "https://example.com/images/speaker.jpg"
  },
  {
    "id": 3,
    "name": "Running Shoes",
    "category": "Footwear",
    "brand": "Brand C",
    "price": 59.99,
    "rating": 4.2,
    "imageUrl": "https://example.com/images/shoes.jpg"
  },
  {
    "id": 4,
    "name": "Smartphone",
    "category": "Electronics",
    "brand": "Brand D",
    "price": 499.99,
    "rating": 4.8,
    "imageUrl": "https://example.com/images/smartphone.jpg"
  },
  {
    "id": 5,
    "name": "Leather Jacket",
    "category": "Clothing",
    "brand": "Brand E",
    "price": 199.99,
    "rating": 4.7,
    "imageUrl": "https://example.com/images/jacket.jpg"
  }
]
