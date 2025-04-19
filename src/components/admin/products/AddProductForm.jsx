import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { addProduct } from "../../../api/Product.js";
import { upload_area } from "../../../assets/images/assets.js";

const categories = [
  "fruit",
  "vegetables",
  "bakery",
  "baking_need",
  "meat_fish",
  "cooking",
  "snacks",
  "diabetic",
  "beverages",
  "dish_detergent",
  "oil",
  "beauty_health",
];

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [review, setReview] = useState("");
  const [inStock, setInStock] = useState(true);
  
  const [type, setType] = useState("");

  const { navigate,  axios, setLoading, setProducts , toast, isAdmin} = useAppContext();

  useEffect(() => {
    if (price && offer) {
      const discount = parseFloat(price) * (parseFloat(offer) / 100);
      const discountedPrice = parseFloat(price) - discount;
      setOfferPrice(discountedPrice.toFixed(2));
    } else {
      setOfferPrice("");
    }
  }, [price, offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description: description.split("\n"),
      category,
      price,
      offerPrice,
      offer: offer || 0,
      review: review || 0,
      inStock,
      type,
    };

    const formData = new FormData();
    formData.append("productData", JSON.stringify(productData));

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      setLoading(true);
      const data = await addProduct(axios, formData, setProducts, toast, isAdmin);

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/admin/products");
  };

  return (
    <div className="px-8 mb-30 sm:px-20 sm:mb-20 sm:mt-30">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-6 text-gray-800">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Product Images (up to 5)</h3>
            <div className="flex gap-2 flex-wrap">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <label key={index} htmlFor={`image${index}`}>
                    <input
                      onChange={(e) => {
                        const updatedFiles = [...files];
                        updatedFiles[index] = e.target.files[0];
                        setFiles(updatedFiles);
                      }}
                      accept="image/*"
                      type="file"
                      id={`image${index}`}
                      hidden
                    />
                    <img
                      className="max-w-24 cursor-pointer"
                      src={
                        files[index]
                          ? URL.createObjectURL(files[index])
                          : upload_area
                      }
                      alt="uploadArea"
                      width={100}
                      height={100}
                    />
                  </label>
                ))}
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Product Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type here"
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Product Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type here"
              className="w-full border border-gray-300 rounded px-3 py-2 min-h-[8rem]"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block font-medium mb-1">
                Product Price
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
                placeholder="0"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="offer" className="block font-medium mb-1">
                Offer (%)
              </label>
              <input
                id="offer"
                type="number"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                min="0"
                step="0.01"
                placeholder="0"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="offerPrice" className="block font-medium mb-1">
                Product Offer Price (auto)
              </label>
              <input
                id="offerPrice"
                type="number"
                value={offerPrice}
                readOnly
                className="w-full border border-gray-300 rounded px-3 py-2 bg-blue-200"
              />
            </div>

            <div>
              <label htmlFor="review" className="block font-medium mb-3">
                Review
              </label>
              <div className="flex gap-4 items-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label key={value} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="review"
                      value={value}
                      checked={review === String(value)}
                      onChange={() => setReview(String(value))}
                      required
                      className="w-5 h-5"
                    />
                    <span className="pl-2">{value}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className="block font-medium mb-1">
                Product Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="Popular">Popular</option>
                <option value="Newest">Newest</option>
                <option value="Featured">Featured</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 mt-7">
              <input
                id="stock"
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-5 h-5"
              />
              <label htmlFor="stock" className="text-sm font-medium">
                In Stock
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end sm:-translate-y-10">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
