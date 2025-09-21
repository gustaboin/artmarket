// src/context/useCart.jsx lo tuve que separar xque daba error de importaciÃ³n circular

import { useContext } from "react";
import { CartContext } from "./CartContext";

export const useCart = () => useContext(CartContext);
