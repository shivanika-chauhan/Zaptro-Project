import { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  // fetching all products from api
  const fetchAllProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.in/api/products?limit=150");
      console.log("API Response:", res.data.products); //  check here
      setData(res.data.products); // products array directly set karo
    } catch (error) {
      console.log("API Error: ", error);
    }
  };
const getUniqueCategory = (data, property) =>{
      let newVal = data?.map((curElem) =>{
          return curElem[property]
      })
      newVal = ["All",...new Set(newVal)]
      return newVal
    }


  
    const categoryOnlyData = getUniqueCategory(data, "category")
    const brandOnlyData = getUniqueCategory(data, "brand")
  
  return (
    <DataContext.Provider value={{ data, setData, fetchAllProduct, categoryOnlyData,brandOnlyData }}>
      {children}
    </DataContext.Provider>
  );
};
 export const getData = ()=> useContext(DataContext)