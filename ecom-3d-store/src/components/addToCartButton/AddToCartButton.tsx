// components/AddToCartButton.tsx
'use client';

import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";


export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCartStore();

  const handleClick = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (

    <button
      onClick={() => {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          modelUrl: product.modelUrl,
        })
        toast.success(`${product.name} added to cart! 🛒`);
      }
      }
      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all"
    >
      Add to Cart
    </button>
    

  );
}
