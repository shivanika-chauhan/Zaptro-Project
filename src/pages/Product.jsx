import React, { useEffect, useState } from "react";
import { getData } from "../file/DataContext";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import WebmLoading from "../assets/2.webm";  
import GifLoading from "../assets/a.gif";    
import MobileFilter from "../components/MobileFIlter";

const Product = () => {
  const { data, fetchAllProduct } = getData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    if (fetchAllProduct) fetchAllProduct();
    window.scrollTo(0, 0);
  }, [fetchAllProduct]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
    setOpenFilter(false);
  };

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const filterData = (data || []).filter(
    (item) =>
      item?.title?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const dynamicPage = Math.max(1, Math.ceil(filterData.length / 8));

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          handleBrandChange={handleBrandChange}
          handleCategoryChange={handleCategoryChange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8">
              <FilterSection
                search={search}
                setSearch={setSearch}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                category={category}
                setCategory={setCategory}
                handleCategoryChange={handleCategoryChange}
                handleBrandChange={handleBrandChange}
              />

              {filterData.length > 0 ? (
                <div className="flex flex-col justify-center items-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 mt-10">
                    {filterData
                      .slice(page * 8 - 8, page * 8)
                      .map((product, index) => (
                        <ProductCard key={index} product={product} />
                      ))}
                  </div>

                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[400px]">
                  <img src={GifLoading} alt="No Products Found" className="w-32 h-32" />
                </div>
              )}

              <div className="flex-1"></div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={WebmLoading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
