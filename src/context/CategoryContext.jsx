import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CategoryContext = createContext();

const CATEGORY_API = "https://68e45f7a8e116898997ba866.mockapi.io/category";

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await axios.get(CATEGORY_API);
      setCategories(res.data);
    } finally {
      setLoadingCategories(false);
    }
  };

  const addCategory = async (data) => {
    const res = await axios.post(CATEGORY_API, data);
    setCategories([...categories, res.data]);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loadingCategories,
        addCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);
