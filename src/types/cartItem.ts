// types/cartItem.ts
export interface CartItem {
    id: number;         // Unique ID for the product
    name: string;       // Product name
    type: string;       // Type (e.g., "Rental" or "Sale")
    count: number;      // Quantity of the product in the cart
    price: number;      // Price per unit
    image: string;      // Image URL of the product
  }
  