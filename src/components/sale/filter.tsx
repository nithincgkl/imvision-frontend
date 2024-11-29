'use client';

import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import style from "./style.module.css";

const Filter: React.FC = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<string[]>([]);

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
<<<<<<< HEAD
=======
    // ... Other categories
>>>>>>> 73267724d945092babd7a2ed86c06831c4e93d83
  ];

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

  const filteredSubCategories = categories
    .filter((cat) => selectedCategories.includes(cat.name))
    .flatMap((cat) => cat.subCategories);

  const filteredSubSubCategories = categories
    .filter((cat) => selectedCategories.includes(cat.name))
    .flatMap((cat) => 
      cat.subCategories.filter((subCat) => 
        selectedSubCategories.includes(subCat.name)
      )
    )
    .flatMap((subCat) => subCat.subSubCategories);

  return (
    <div>
<<<<<<< HEAD
=======
      {/* Common Top Section */}
      {/* Event Gallery Section */}
>>>>>>> 73267724d945092babd7a2ed86c06831c4e93d83
      <section className={style.sale_filter_container}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
<<<<<<< HEAD
              <button 
                onClick={() => setShowFilter(!showFilter)} 
                className={style.filter_btn}
              >
                Filter Category
=======
            
              
              <button onClick={() => setShowFilter(!showFilter)} className={style.filter_btn}>
                Filter Category button 
>>>>>>> 73267724d945092babd7a2ed86c06831c4e93d83
              </button>
              <FaAngleDown  className={style.btn_cat} />
            </div>
            <div className="col-6">
              <div className={style.sale_filter_container_right}>
<<<<<<< HEAD
                <p className={style.m_none}>Showing 1-12 of 92 results</p>
                <select 
                  className={style.sort_dropdown} 
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="">Sort By</option>
=======
                <p className={style.m_none}>
                  Showing 1-12 of 92 results 
                </p>
                <select className={style.sort_dropdown} onChange={(e) => console.log(e.target.value)}>
                  <option value="">Default Sorting </option>
>>>>>>> 73267724d945092babd7a2ed86c06831c4e93d83
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Rating</option>
                </select>
<<<<<<< HEAD
=======
                <FaAngleDown  className={style.z_10} />
>>>>>>> 73267724d945092babd7a2ed86c06831c4e93d83
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
                          <label>{category.name}</label>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.name)}
                            onChange={() =>
                              toggleSelection(
                                selectedCategories,
                                category.name,
                                setSelectedCategories
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {/* Sub Category Section */}
<<<<<<< HEAD
                    {selectedCategories.length > 0 && (
                      <div className={`${style.filterCategoryBox} ${style.filterSubCategoryBox}`}>
                        <div className={style.displa_flex}>
                          <div>
                            {filteredSubCategories.map((subCat, index) => (
                              <div key={index} className={style.filterCheckbox}>
                                <label>{subCat.name}</label>
                                <input
                                  type="checkbox"
                                  checked={selectedSubCategories.includes(subCat.name)}
                                  onChange={() =>
                                    toggleSelection(
                                      selectedSubCategories,
                                      subCat.name,
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
                                {filteredSubSubCategories.map((subSubCat, index) => (
                                  <div key={index} className={style.filterCheckbox}>
                                    <label>{subSubCat}</label>
                                    <input
                                      type="checkbox"
                                      checked={selectedSubSubCategories.includes(subSubCat)}
                                      onChange={() =>
                                        toggleSelection(
                                          selectedSubSubCategories,
                                          subSubCat,
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

                    {selectedCategories.length > 0 && (
                      <div className={style.filter_btn_containe}>
                        <button 
                          className={style.reset_btn}
                          onClick={resetFilters}
                        >
                          Reset Filter
                        </button>
                        <button className={style.apply_btn}>
                          Apply Filter
                        </button>
                      </div>
                    )}
=======
                    <div
                      className={
                        filteredSubCategories.length > 0
                          ? `${style.filterCategoryBox} ${style.filterSubCategoryBox}`
                          : ''
                      }
                    >
                      <div className={style.displa_flex}>
                        <div>
                          {filteredSubCategories.map((subCat, index) => (
                            <div key={index} className={style.filterCheckbox}>
                              <label>{subCat.name}</label>
                              <input
                                type="checkbox"
                                checked={selectedSubCategories.includes(subCat.name)}
                                onChange={() =>
                                  toggleSelection(
                                    selectedSubCategories,
                                    subCat.name,
                                    setSelectedSubCategories
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>

                        {/* Sub Sub Category Section */}
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
                      </div>
                    </div>

<<<<<<< HEAD
                    {selectedCategories.length > 0 && (
                      <div className={style.filter_btn_containe}>
                        <button className={style.reset_btn}>Reset Filter</button>
                        <button className={style.apply_btn}>Apply Filter</button>
                      </div>
                    )}
=======

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
>>>>>>> 2bf320d648f23f27a986222212b8fc64694c0716
>>>>>>> 73267724d945092babd7a2ed86c06831c4e93d83
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