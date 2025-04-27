import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function Card({ product }) {
  const imageUrl = "https://admin.refabry.com/storage/product/";

  const { image, name, price, discount_amount, id } = product || {};

  const navigate = useNavigate();

  const discount = Math.ceil(
    (parseInt(discount_amount) / parseInt(price)) * 100
  );

  const handleQuickView = () => {
    navigate(`product/${id}`, { state: { product } });
  };

  return (
    <div className="card bg-white w-full h-full shadow-md font-montserrat px-3 py-3">
      <figure className="relative overflow-hidden">
        <img
          className="w-full h-full object-top object-cover transition-all hover:scale-125 duration-700"
          src={`${imageUrl}${image}`}
          alt="Shoes"
        />
        <p className="absolute top-2 left-2 bg-gray-800 text-white font-extralight px-2 text-sm">
          {" "}
          - {discount}%
        </p>
      </figure>
      <div className="card-body flex items-center justify-between py-2">
        <h2 className="card-title font-semibold">{name?.toUpperCase()}</h2>
        <div className="flex items-center justify-center">
          <FaBangladeshiTakaSign />
          <p>{price}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-x-2 mt-5">
        <button className="w-full col-span-1 border border-gray-600 bg-gray-600 p-2">
          <IoIosHeartEmpty className="size-6 mx-auto text-white" />
        </button>
        <button
          onClick={handleQuickView}
          className="col-span-3 border border-gray-400 hover:bg-gray-400 hover:text-white text-center p-2 transition-all duration-500"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}
