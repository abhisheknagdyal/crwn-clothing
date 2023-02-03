import { useState ,createContext, useEffect} from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utlis.js";


export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    
    useEffect(()=>{
        const getCategoriesMap = async () =>{
           const categoryMap = await getCategoriesAndDocuments();
           console.log(categoryMap);
        }
        getCategoriesMap();
    },[]);

    const value = {categoriesMap};
    return(
        <CategoriesProvider.Provider value={value}>
            {children}
        </CategoriesProvider.Provider>
    )
}