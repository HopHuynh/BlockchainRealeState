import React, { useContext, useEffect, useState } from "react";
import PropertyContext from "../../ContextApi/PropertyContext";
import "./styles/MyHomePage.css";
import IndvProperty from "../homepage/IndvProperty";
import UseGetOwner from "../../hooks/GetOwner";
import { useSigner } from "wagmi";

const MyHomePage = () => {
  const{data} = useSigner()
  const [owner , setOwner] = useState("")
  const { myHome  , salePost} = useContext(PropertyContext);
  const{GetOwner} = UseGetOwner()
  const getOwner = async ()=>{
   const res = await GetOwner()
   setOwner(()=> res)
   console.log("Owner" , res)
  }

  useEffect(()=>{
   getOwner();
  },[])

  if(!data) return
  return (
    <>
      <div className="yourPropertyTopic">
        Your Property Are displayed Here!!
      </div>
      {data._address===owner ? <IndvProperty posts={salePost} /> : <IndvProperty posts={myHome} />  }
     
    </>
  );
};

export default MyHomePage;
