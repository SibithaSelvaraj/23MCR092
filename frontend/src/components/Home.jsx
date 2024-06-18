import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Home = () => {
  const[product,setProduct] = useState([])
  const getProduct = ()=>{
    axios.get("http://localhost:4000/api/getProduct")
    .then(
        (d)=>{
                console.log(d.data);
                setProduct(d.data)
        }
    ).catch((err)=>{
        console.log(err);
    })
  }
  useEffect(()=>{
    getProduct()
  },[])                   //display while aft refreshing the page
  console.log("hi");
  return(
    <>
        {product.map((item, index) => (
           <> 
            <p>{item.name} {item.price}</p>
           </>

      ))}
    </>
  )
}

export default Home
