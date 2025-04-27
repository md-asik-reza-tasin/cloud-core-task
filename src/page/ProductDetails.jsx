import React, { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLocation } from "react-router";

export default function ProductDetails() {
  const [order, setOrder] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const imageUrl = "https://admin.refabry.com/storage/product/";

  const location = useLocation();
  const { product } = location?.state || {};

  const { id, image, name: productName, category, short_desc, discount_amount, price } = product || {};

  const lines = short_desc?.split(/\r?\n/) || [];

  const handleImageClick = () => {
    if (image) {
      window.open(`${imageUrl}${image}`, "_blank");
    }
  };

  const discount = Math.ceil(
    (parseInt(discount_amount) / parseInt(price)) * 100
  );
  const previousPrice = parseInt(discount_amount) + parseInt(price);

  const handleOrder = () => {
    setOrder(product);
    setQuantity(1);
  };

  const handleIncrease = () => {
    if (order) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (order && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Confirm Order API Call
  const handleConfirmOrder = async () => {
    if (!order) {
      alert("Please order first!");
      return;
    }

    if (!name || !phone || !address) {
      alert("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("https://admin.refabry.com/api/public/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_ids: id.toString(),
          s_product_qty: quantity.toString(),
          c_phone: phone,
          c_name: name,
          courier: "steadfast", // fixed as your example
          address: address,
          advance: null,
          cod_amount: (parseInt(price) * quantity).toString(),
          discount_amount: null,
          delivery_charge: "80",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order Placed Successfully!");
        console.log(data);
      } else {
        alert("Failed to place order. Please try again.");
        console.error(data);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-500/5 min-h-screen py-5 px-3">
      <div className="flex flex-col lg:flex-row gap-5 w-full max-w-[1200px]">
        {/* Left Side - Product Info */}
        <div className="flex flex-col md:flex-row bg-white w-full h-fit shadow-md font-montserrat px-4 py-4">
          <div className="md:w-1/2 w-full h-full relative flex justify-center items-center">
            <img
              onClick={handleImageClick}
              className="w-full max-h-[400px] object-contain cursor-pointer"
              src={`${imageUrl}${image}`}
              alt=""
            />
            <p className="absolute top-2 left-2 bg-gray-800 text-white font-extralight px-2 text-sm">
              -{discount}%
            </p>
          </div>

          <div className="md:w-1/2 w-full relative flex flex-col justify-between mt-5 md:mt-0">
            <div>
              <div className="w-full flex justify-between items-start">
                <div className="whitespace-nowrap">
                  <p className="font-semibold text-lg">{productName?.toUpperCase()}</p>
                  <p className="text-xs text-red-500">{category?.name}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end text-gray-400">
                    <FaBangladeshiTakaSign />
                    <p className="line-through text-sm">{previousPrice}</p>
                  </div>
                  <p className="text-2xl font-bold text-black mt-1">{price}</p>
                </div>
              </div>

              {/* Description Section */}
              <div className="mt-5">
                {lines.map((line, index) => (
                  <p key={index} className="text-sm mb-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                onClick={handleOrder}
                className="outline outline-2 outline-blue-500 text-blue-500 px-6 py-2 hover:bg-blue-500 hover:text-white transition-all duration-300 text-sm rounded-md"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-white w-full lg:w-1/3 h-fit shadow-md font-montserrat px-4 py-4">
          <h1 className="font-semibold text-lg underline underline-offset-8 mb-5">
            Your Order
          </h1>

          <div className="flex flex-col gap-5">
            {/* Quantity */}
            <div className="flex justify-between items-center">
              <p>Quantity</p>
              <div className="flex items-center gap-x-4">
                <button
                  onClick={handleIncrease}
                  className="border px-2 hover:bg-gray-200"
                >
                  +
                </button>
                <p>{quantity}</p>
                <button
                  onClick={handleDecrease}
                  className="border px-2 hover:bg-gray-200"
                  disabled={quantity <= 1}
                >
                  -
                </button>
              </div>
            </div>

            {/* Price Section */}
            <div className="flex justify-between items-center">
              <p>Price</p>
              <div className="flex items-center justify-center gap-x-1">
                <FaBangladeshiTakaSign />
                <p>{order ? quantity * parseInt(order.price) : 0}</p>
              </div>
            </div>

            {/* Customer Info */}
            <input
              type="text"
              placeholder="Name"
              className="border p-2 text-sm outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-2 text-sm outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-2 text-sm outline-none"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {/* Confirm Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={!order || loading}
              className="w-full text-center border-blue-500 border p-2 bg-blue-500 text-white disabled:border-gray-400 disabled:bg-gray-400"
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>

            {!order && <p className="text-center text-red-600">Please Order First</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
