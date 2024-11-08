'use client';

import { updateCookieValue } from '@/utils/actions';
import { getCookie } from 'cookies-next';
import { createContext, useEffect, useReducer } from 'react';

const cartCookie = getCookie('cart');

interface CartItem {
  documentId: string;
  title: string;
  price: number;
}

interface Cart {
  items: CartItem[];
}

let initialCart: Cart = {
  items: [],
};

if (cartCookie) {
  const parsedCart = JSON.parse(cartCookie) as CartItem[];
  initialCart = { items: parsedCart };
} else {
  initialCart = { items: [] };
}

const CartContext = createContext({
  cart: initialCart,
  addItem: (item: any) => {},
  removeItem: (item: any) => {},
  clearCart: () => {},
  totalCart: 0,
});

function cartReducer(state: any, action: any) {
  // Logica de agregar item
  if (action.type === 'ADD_ITEM') {
    // Buscar si el item es existente: true o false
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.gameId === action.item.gameId
    );

    // Crear copia del estado
    const updatedItems = [...state.items];

    // Si existe item
    if (existingCartItemIndex > -1) {
      // Item existente
      const exisitingItem = state.items[existingCartItemIndex];

      // Agrear +1 en cantidad
      const updatedItem = {
        ...exisitingItem,
        quantity: exisitingItem.quantity + 1,
      };

      // Reemplazar el item con el actualizado en la copia del estado
      updatedItems[existingCartItemIndex] = updatedItem;

      // Si no existe agregamos el item a la copia del estado, +1 en cantidad
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    // Retornar items actualizados
    return { ...state, items: updatedItems };
  }

  // Logica eliminar item
  if (action.type === 'REMOVE_ITEM') {
    // Buscar si el item es existente: true o false
    const existingCartItemIndex = state.items.findIndex(
      (item: any) => item.gameId === action.item.gameId
    );

    // Item existente
    const exisitingCartItem = state.items[existingCartItemIndex];

    // Copia del estado
    const updatedItems = [...state.items];

    // Si la cantidad es 1
    if (exisitingCartItem.quantity === 1) {
      // Eliminar item en la copia del estado
      updatedItems.splice(exisitingCartItem, 1);

      // Si hay mayor cantidad
    } else {
      // Restamos -1 en la cantidad del item
      const updatedItem = {
        ...exisitingCartItem,
        quantity: exisitingCartItem.quantity - 1,
      };

      // Reemplazar el item con el actualizado en la copia del estado
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // Retornar items actualizados
    return { ...state, items: updatedItems };
  }

  // Limpiar estado
  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Creamos el reducer, con su estado: cart y sus funciones para actualizarlo, dispatch
  const [cart, dispatchCartAction] = useReducer(cartReducer, initialCart);

  // Asignamos el dispatch de tipo ADD_ITEM, para addItem
  function addItem(item: any) {
    dispatchCartAction({ type: 'ADD_ITEM', item });
  }

  // Asignamos el dispatch de tipo REMOVE_ITEM, para removeItem
  function removeItem(item: any) {
    dispatchCartAction({ type: 'REMOVE_ITEM', item });
  }

  // Asignamos el dispatch de tipo CLEAR_CART para clearCart
  function clearCart() {
    dispatchCartAction({ type: 'CLEAR_CART' });
  }

  useEffect(() => {
    updateCookieValue({ cookieName: 'cart', newValue: cart.items });
  }, [cart]);

  const newTotal = cart.items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  // Agremos el estado y las funciones de actualizar del Reducer al Contexto global
  const cartContext = {
    cart: cart,
    addItem,
    removeItem,
    clearCart,
    totalCart: newTotal,
  };

  // Creamos el provider con el estado que tiene el reducer y sus funciones, agregamos children para poder rellenarlo
  return <CartContext.Provider value={cartContext}> {children} </CartContext.Provider>;
};

export default CartContext;
