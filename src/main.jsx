import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/theme-provider'
import { UserProvider } from './context/UserContext'
import { ProductProvider } from './context/ProductContext'
import { CartProvider } from './context/CartContext'


export const server = "http://localhost:5000";

export const categories = [
  "Smartphone", "Laptop", "Tablet", "Television", "Camera", "Headphones", "Gaming Console", "Smartwatch", "Power Bank", "Monitor",
  "Refrigerator", "Microwave", "Air Conditioner", "Washing Machine", "Vacuum Cleaner", "Water Purifier", "Dishwasher", "Tshirt", "Jeans", "Jackets",
  "Dresses", "Shoes", "Watch", "Bags", "Accessories", "Sunglasses", "Jewelry", "Makeup", "Sofa", "Bed", "Dining Table", "Chairs", "Wardrobe",
  "Bookshelf", "Home Decor", "Curtains", "Rugs", "Kitchenware", "Cookware", "Tableware", "Cutlery", "Storage Containers", "Water Bottles",
  "Toys", "Baby Clothing", "Baby Gear", "School Bags", "Stationery", "Fitness Equipment", "Sporting Goods", "Yoga Mats", "Bicycles", "Gym Accessories",
  "Car Accessories", "Motorcycle Accessories", "Helmets", "Car Care", "Groceries", "Books", "Healthcare Products", "Pet Supplies",
  "Office Supplies", "Gardening Tools", "Power Tools", "Cleaning Supplies", "Musical Instruments"
];


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
)
