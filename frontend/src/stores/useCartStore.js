import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const response = await axios.get("/coupons");
      if (response.data) {
        const coupon = {
          ...response.data,
          discountPercentage: response.data.discount,
        };
        set({ coupon, isCouponApplied: true });
        get().calculateTotals();
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const response = await axios.post("/coupons/validate", { code });
      const couponData = {
        ...response.data,
        discountPercentage: Number(response.data.discount),
      };

      set((prev) => {
        const subtotal = prev.cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const discount = subtotal * (couponData.discountPercentage / 100);
        const total = subtotal - discount;

        return {
          coupon: couponData,
          isCouponApplied: true,
          subtotal,
          total,
        };
      });

      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  clearCart: () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
    toast.success("Cart cleared");
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...product, quantity: 1 }];

        return { cart: newCart };
      });

      get().calculateTotals();
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  removeFromCart: async (productId) => {
    await axios.delete(`/cart`, { data: { productId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== productId),
    }));
    get().calculateTotals();
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }

    await axios.put(`/cart/${productId}`, { quantity });

    set((prevState) => {
      const updatedCart = prevState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      return { cart: updatedCart };
    });

    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart, coupon } = get();

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon) {
      const discountPercent = Number(coupon?.discountPercentage) || 0;
      const discount = subtotal * (discountPercent / 100);
      total = subtotal - discount;
    }

    set({ subtotal, total });
  },
}));
