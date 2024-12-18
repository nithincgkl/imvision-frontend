'use client';

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";
=======
import React, { useState } from "react";
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
import style from "./style.module.css";

// Define types for categories and filters
interface Category {
  id: string;
  category_name: string;
}

interface SubCategory {
  id: string;
  sub_category_name: string;
}

interface SubSubCategory {
  id: string;
  sub_sub_category_name: string;
}

interface Filter {
  categoryIds: number[];
  subCategoryIds: number[];
  subSubCategoryIds: number[];
}

interface Product {
  id: number;
  img: string;
  title: string;
  des: string;
  sale_rent: string;
  slug:string
}

// Define props for the Filter component
interface FilterProps {
  onApplyFilters: (products: Product[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
<<<<<<< HEAD
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subSubCategories, setSubSubCategories] = useState<SubSubCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch Categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}products/product-categories`, {
          headers: {
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch Sub Categories based on selected categories
    const fetchSubCategories = async () => {
      if (selectedCategories.length > 0) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/subcategories`, {
            categoryIds: selectedCategories
          }, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
          });
          setSubCategories(response.data);
        } catch (error) {
          console.error("Error fetching sub-categories:", error);
          setError("Failed to load sub-categories. Please try again later.");
        }
      }
    };

    fetchSubCategories();
  }, [selectedCategories]);

  useEffect(() => {
    // Fetch Sub-Sub Categories based on selected sub-categories
    const fetchSubSubCategories = async () => {
      if (selectedSubCategories.length > 0) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/subsubcategories`, {
            subCategoryIds: selectedSubCategories
          }, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
          });
          setSubSubCategories(response.data);
        } catch (error) {
          console.error("Error fetching sub-sub-categories:", error);
          setError("Failed to load sub-sub-categories. Please try again later.");
        }
      }
    };

    fetchSubSubCategories();
  }, [selectedSubCategories]);

  const toggleSelection = (
    selectedItems: string[], 
    item: string, 
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
=======

  const categories = [
    {
      name: "Sale",
      subCategories: [
        {
          name: "Indoor LED screen",
          subSubCategories: ["beMatrix", "P1.24"],
        },
        {
          name: "LED CASE",
          subSubCategories: ["beMatrix", "P1.24"],
        },
      ],
    },
    {
      name: "Rent",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
    {
      name: "LED Screens",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
    {
      name: "Photo",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
    {
      name: "Electricity & power",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
    {
      name: "Sound",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
    {
      name: "Light",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
    {
      name: "Fair",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
    {
      name: "Rigging",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },




  ];

  const toggleSelection = (selectedItems: string[], item: string, setSelected: Function) => {
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
    setSelected(
      selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item]
    );
  };

<<<<<<< HEAD
  const resetFilters = () => {
    // Reset local state
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSubSubCategories([]);

    // Pass empty array to trigger default rent products
    onApplyFilters([]);
  };

  const applyFilters = async () => {
    const filters: Filter = {
      categoryIds: selectedCategories.map((category) => parseInt(category)),
      subCategoryIds: selectedSubCategories.map((subCategory) => parseInt(subCategory)),
      subSubCategoryIds: selectedSubSubCategories.map((subSubCategory) => parseInt(subSubCategory)),
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/filter`, filters, {
        headers: {
          Authorization:`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      const transformedData = response.data.map((item: any) => {
        const imageUrl =
          (item.product_images && item.product_images.length > 0 && item.product_images[0].url) ||
          (item.thumbnail && item.thumbnail.url) ||
          'No image is available';

        return {
          id: item.id,
          img: imageUrl,
          title: item.title,
          des: item.description || '',
          sale_rent: item.sale_rent,
        };
      });

      onApplyFilters(transformedData);
    } catch (error) {
      console.error("Error applying filters:", error);
      setError("Failed to apply filters. Please try again later.");
    }
  };

=======
  const filteredSubCategories = categories
    .filter((cat) => selectedCategories.includes(cat.name))
    .flatMap((cat) => cat.subCategories);

>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
  return (



    <div>
<<<<<<< HEAD
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
                  <option value="">Default Sorting</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                </select>
                <FaAngleDown className={style.z_10} />
              </div>
=======
      {/* Common Top Section */}


      {/* Event Gallery Section */}
      <section className={style.sale_filter_container}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <button onClick={() => setShowFilter(!showFilter)} className={style.filter_btn}>
                Filter Category button
              </button>
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
            </div>
            <div className="col-6">
  <div className={style.sale_filter_container_right}>
    <p className={style.m_none}>Showing 1-12 of 92 results</p>
    <select className={style.sort_dropdown} onChange={(e) => console.log(e.target.value)}>
      <option value="">Sort By</option>
      <option value="price-low-to-high">Price: Low to High</option>
      <option value="price-high-to-low">Price: High to Low</option>
      <option value="newest">Newest</option>
      <option value="rating">Rating</option>
    </select>
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
                    <div className={style.filterCategoryBox} >
                      
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

                      {/* <div>

                      {selectedCategories.length > 0 ? "" :

                        <div>
                          <p>Select Any Category</p>
                        </div>
                      }
                      </div> */}


                    </div>

                    {/* Sub Category Section */}
<<<<<<< HEAD
                    {selectedCategories.length > 0 && (
                      <div className={`${style.filterCategoryBox} ${style.filterSubCategoryBox}`}>
                        <div className={style.displa_flex}>
                          <div>
                            {subCategories.map((subCat, index) => (
=======
                    <div className={
                      filteredSubCategories.length > 0
                        ? `${style.filterCategoryBox} ${style.filterSubCategoryBox}`
                        : ''
                    }>

                      <div className={style.displa_flex}>

                        <div>

                          {categories
                            .filter((cat) => selectedCategories.includes(cat.name))
                            .flatMap((cat) => cat.subCategories)
                            .map((subCat, index) => (
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
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
<<<<<<< HEAD
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
=======
                        </div>
                        {/* Sub Sub Category Section strat */}
                        <div>

                          <div
                            className={
                              categories
                                .filter((cat) => selectedCategories.includes(cat.name))
                                .flatMap((cat) =>
                                  cat.subCategories.filter((subCat) =>
                                    selectedSubCategories.includes(subCat.name)
                                  )
                                )
                                .flatMap((subCat) => subCat.subSubCategories).length > 0
                                ? `${style.filterCategoryBox} ${style.filterSubSubCategoryBox}`
                                : ''
                            }
                          >
                            {categories
                              .filter((cat) => selectedCategories.includes(cat.name))
                              .flatMap((cat) =>
                                cat.subCategories.filter((subCat) =>
                                  selectedSubCategories.includes(subCat.name)
                                )
                              )
                              .flatMap((subCat) => subCat.subSubCategories)
                              .map((subSubCat, index) => (
                                <div key={index} className={style.filterCheckbox}>
                                  <label>{subSubCat}</label>
                                  <input type="checkbox" />
                                </div>
                              ))}
                          </div>


                        </div>
                        {/* Sub Sub Category Section end */}

                      </div>

                    </div>


                    {selectedCategories.length > 0 ? <div className={style.filter_btn_containe}>
  <button className={style.reset_btn}>Reset Filter</button>
  <button className={style.apply_btn}>Apply Filter</button>
</div> : ""


}

{/* <div>

                      {selectedCategories.length > 0 ? "" :

                        <div>
                          <p>Select Any Category</p>
                        </div>
                      }
                      </div> */}
>>>>>>> fbb4335b1d4ede1833c9f0a8d60ef79009d0c5b0
                  </div>
                </div>
              </div>

              <div className={style.filterActionButtons}>
                <button className={style.applyFilterButton} onClick={applyFilters}>
                  Apply Filters
                </button>
                <button className={style.resetFilterButton} onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </section>
      )}


    </div>

  );
};

export default Filter;
