import React, { useEffect, useState } from "react";
import Card from "../components/home/Card";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleDataFetch = async () => {
      try {
        const response = await fetch(
          "https://admin.refabry.com/api/all/product/get"
        );
        const result = await response.json();
        setProducts(result?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleDataFetch();
  }, []);


  return (
    <div className="bg-gray-500/5 py-20">
      <div className="w-fit md:w-[1200px] grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 mx-auto">
        {products?.map((product) => (
          <Card key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
}
