import { server } from "@/main";
import axios from "axios";
import {createContext, useContext, useEffect, useState} from "react";

const ProductContext = createContext();

 
export const ProductProvider = ({children}) =>{
    const [products, setProducts] = useState([]);
    const [newProd, setNewProd] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1)
    const [totalpages, setTotalPages] = useState(1)
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [categories, setCategories] = useState([])

    async function fetchProducts(){
        setLoading(true)
        try {
            const {data} = await axios.get(`${server}/api/product/all`, {
  params: {
    search,
    category,
    sortByPrice: price,
    page
  }
});

            setProducts(data.products);
            setNewProd(data.newProduct);
            setCategories(data.categories);
            setTotalPages(data.totalpages);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const [product, setProduct] = useState([]);
    const [relatedProduct, setrelatedProduct] = useState([]);

    async function fetchProduct(id){
        setLoading(true);
        try {
            const {data} = await axios.get(`${server}/api/product/${id}`);

            setProduct(data.product);
            setrelatedProduct(data.relatedProducts);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[search, category, page , price]);

    return (<ProductContext.Provider value={{loading, products, newProd, search,
         setSearch, categories, category, setCategory, totalpages, price, setPrice, page, setPage, fetchProduct,fetchProducts, product, relatedProduct
         }}>{children}</ProductContext.Provider>
    );
};

export const ProductData = () => useContext(ProductContext);