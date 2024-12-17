'use client';

import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";
import style from "./style.module.css";

// Define props interface
interface FilterProps {
  onApplyFilters: (filters: any) => void;  // Replace 'any' with a more specific type if you know the structure
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]); 
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]);
      
  useEffect(() => {
    // Fetch Categories
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}products/product-categories`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      }
    })
    .then((response) => {
      setCategories(response.data); 
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
  }, []);

  useEffect(() => {
    // Fetch Sub Categories based on selected categories
    if (selectedCategories.length > 0) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/subcategories`, {
        categoryIds: selectedCategories
      }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      })
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sub-categories:", error);
      });
    }
  }, [selectedCategories]);

  useEffect(() => {
    // Fetch Sub-Sub Categories based on selected sub-categories
    if (selectedSubCategories.length > 0) {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/subsubcategories`, {
        subCategoryIds: selectedSubCategories
      }, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      })
      .then((response) => {
        setSubSubCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sub-sub-categories:", error);
      });
    }
  }, [selectedSubCategories]);

  const toggleSelection = (
    selectedItems: string[], 
    item: string, 
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected(
      selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSubSubCategories([]);
  };

  const applyFilters = () => {
    const filters = {
      categoryIds: selectedCategories.map((category) => parseInt(category)),
      subCategoryIds: selectedSubCategories.map((subCategory) => parseInt(subCategory)),
      subSubCategoryIds: selectedSubSubCategories.map((subSubCategory) => parseInt(subSubCategory)),
    };
  
    console.log("Applying Filters:", filters);
  
    // Check if onApplyFilters is a function
    if (typeof onApplyFilters === 'function') {
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/filter`, filters, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log("Filtered products:", response.data);
        onApplyFilters(response.data);  // This should now work correctly
      })
      .catch((error) => {
        console.error("Error applying filters:", error);
      });
    } else {
      console.error("onApplyFilters is not a function");
    }
  };
  

  return (
    <div>
      <section className={style.sale_filter_container}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <button onClick={() => setShowFilter(!showFilter)} className={style.filter_btn}>
                Filter Category button
              </button>
              <FaAngleDown className={style.btn_cat} />
            </div>
            <div className="col-12 col-md-6">
              <div className={style.sale_filter_container_right}>
                <p className={style.m_none}>
                  Showing 1-12 of 92 results
                </p>
                <select className={style.sort_dropdown} onChange={(e) => console.log(e.target.value)}>
                  <option value="">Default Sorting </option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                </select>
                <FaAngleDown className={style.z_10} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFilter && (
        <section className={style.filterContent}>
          <div className="container-fluid">
            <div className={style.filterInnerContent}>
              <div className="row">
                <div className="col-12">
                  <div className={style.filterInnerContentCategory}>
                    {/* Category Section */}
                    <div className={style.filterCategoryBox}>
                      {categories.map((category, index) => (
                        <div key={index} className={style.filterCheckbox}>
                          <label>{category.category_name}</label>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() =>
                              toggleSelection(
                                selectedCategories,
                                category.id,
                                setSelectedCategories
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {/* Sub Category Section */}
                    {selectedCategories.length > 0 && (
                      <div className={`${style.filterCategoryBox} ${style.filterSubCategoryBox}`}>
                        <div className={style.displa_flex}>
                          <div>
                            {subCategories.map((subCat, index) => (
                              <div key={index} className={style.filterCheckbox}>
                                <label>{subCat.sub_category_name}</label>
                                <input
                                  type="checkbox"
                                  checked={selectedSubCategories.includes(subCat.id)}
                                  onChange={() =>
                                    toggleSelection(
                                      selectedSubCategories,
                                      subCat.id,
                                      setSelectedSubCategories
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>

                          {/* Sub Sub Category Section */}
                          {selectedSubCategories.length > 0 && (
                            <div>
                              <div className={`${style.filterCategoryBox} ${style.filterSubSubCategoryBox}`}>
                                {subSubCategories.map((subSubCat, index) => (
                                  <div key={index} className={style.filterCheckbox}>
                                    <label>{subSubCat.sub_sub_category_name}</label>
                                    <input
                                      type="checkbox"
                                      checked={selectedSubSubCategories.includes(subSubCat.id)}
                                      onChange={() =>
                                        toggleSelection(
                                          selectedSubSubCategories,
                                          subSubCat.id,
                                          setSelectedSubSubCategories
                                        )
                                      }
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reset & Apply Filters Section */}
              <div className="row">
                <div className="col-12">
                  <div className={style.filterResetContainer}>
                    <button onClick={resetFilters} className={style.filterResetBtn}>
                      Reset Filter
                    </button>
                    <button onClick={applyFilters} className={style.applyFilterBtn}>
                      Apply Filter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Filter;
