import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import axios from "axios";

const Products = () => {
  const styles = {
    activeTab: {
      background: "#6b21a8"
    }
  };

  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [activeTab, setActiveTab] = useState('Coffee')
  const [products, setProducts] = useState([])

  const navigate = useNavigate();

  const handleClick = (info) => {
    // Navigate to ProductDetail with the element information
    navigate("/productDetail", {state: { info }});
  };

  {/* Fetch all categories */}
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:8800/category");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllCategories();
  }, []);

  {/* Fetch all products */}
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/product");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchAllProducts();
  }, []);

  {/* Functions for Sort Products by Price */}
  useEffect(() => {
    setProducts([...products.sort((a, b) => a.productPrice - b.productPrice)]);
  }, [])

  function sortProductsByPrice(e) {
    e.stopPropagation();

    if (e.target.value == "LowToHigh") {
      setProducts([...products.sort((a, b) => a.productPrice - b.productPrice)]);
    } else if (e.target.value == "HighToLow") {
      setProducts([...products.sort((a, b) => b.productPrice - a.productPrice)]);
    }
  }

  {/* Render all category tabs */}
  const categoryNav = categories.map(category => {
    return (
      <div
        key={category.id}
        className="bg-primary-bg w-40 p-3 text-white text-xl font-semibold text-center rounded-xl cursor-pointer"
        style={{...(activeTab === category.categoryName ? styles.activeTab : {})}}
        onClick={() => setActiveTab(category.categoryName)}
      >
        <img src="./assets/drink.svg" alt="Category" />
        {category.categoryName}
      </div>
    )
  })

  {/* Render all products in a category */}
  const categorySection = categories.map(category => {
    return (
      <div key={category.id} id={category.categoryName} className="mb-5">
        {activeTab === category.categoryName && (
        <div>
            <h2 className="mb-5 text-2xl font-bold tracking-tight text-primary-text border-b border-gray-300 pb-2">Menu</h2>
            <div className="flex justify-between items-center">
              {/* Search Products */}
              <div>
                <div className="xl:w-96">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <input
                        type="search"
                        className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon2"
                        onChange={(e) => setSearch(e.target.value)} />

                    {/* <!--Search icon--> */}
                    <span
                        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                        id="basic-addon2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Sort Products by Price */}
              <div>
                Sort Products by Price
                <select className="mx-3 px-3 border-solid border-2 border-primary-bg text-primary-text rounded-xl" name="price" id="price" onChange={(e) => sortProductsByPrice(e)}>
                  <option value="LowToHigh">Low to High</option>
                  <option value="HighToLow">High to Low</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products
              .filter(product => { return search.toLowerCase() === '' ? product : product.productName.toLowerCase().includes(search)})
              .filter(product => product.categoryID == category.id)
              .map(product => {
                return (
                  <div key={product.id} className="group relative cursor-pointer" onClick={() => handleClick({id: product.id, category: category.categoryName, name: product.productName, desc: product.productDesc, price: product.productPrice, image: product.productImage})}>
                    {/* Product Image */}
                    <img
                      alt="Hi"
                      src={`./assets/${product.productImage}`}
                      className="relative aspect-square w-full rounded-lg object-cover lg:aspect-auto lg:h-72 shadow-lg"
                    />

                    {/* Best Selling */}
                    {product.bestSelling ? 
                      <div className="absolute top-3 right-3 px-3 bg-primary-bg text-white rounded-xl">
                        Best Selling
                      </div>
                      : 
                      <div></div>
                    }
            
                    {/* Product Name & Price */}
                    <div className="mt-4 flex flex-col gap-1">
                      <h3 className="text-lg font-medium hover:text-yellow-500 transition-colors">
                        <a>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.productName}
                          
                        </a>
                      </h3>
                      <p className="text-gray-600">{`$${product.productPrice}`}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  })

  return (
    <>
      <Navbar isMenu={true} isContact={false} isAbout={false} />
      <div className="bg-white font-poppins">
        <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">          
          {/* Category Tabs */}
          <h2 className="text-2xl font-bold tracking-tight text-primary-text mb-5">Categories</h2>
          <div className="grid grid-cols-6 mb-10">
            {categoryNav}
          </div>

          {/* Products of a Category */}
          {categorySection}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Products
