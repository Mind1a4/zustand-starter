import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  isCartOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  addItem: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }

      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  //                  2
  increaseQuantity: (itemId) =>
    //    useCartStore = obj
    set((state) => ({
      //                  cart[]
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (itemId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  removeItem: (itemId) =>
    set((state) => ({
      // { id: 1, name: "Product 1", price: 20 },
      // { id: 2, name: "Product 2", price: 35 },
      // { id: 3, name: "Product 3", price: 50 },
      // { id: 4, name: "Product 4", price: 60 },
      cart: state.cart.filter((item) => item.id !== itemId),
    })),

  cleareCart: () => set({ cart: [] }),
}));

export default useCartStore;
