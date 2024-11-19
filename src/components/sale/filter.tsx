'use client';

import React, { useState } from "react";
import style from "./style.module.css";

const Filter: React.FC = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);

  const categories = [
    {
      name: "Category 1",
      subCategories: [
        {
          name: "Sub Category 1-1",
          subSubCategories: ["Sub Sub Category 1-1-1", "Sub Sub Category 1-1-2"],
        },
        {
          name: "Sub Category 1-2",
          subSubCategories: ["Sub Sub Category 1-2-1", "Sub Sub Category 1-2-2"],
        },
      ],
    },
    {
      name: "Category 2",
      subCategories: [
        {
          name: "Sub Category 2-1",
          subSubCategories: ["Sub Sub Category 2-1-1", "Sub Sub Category 2-1-2"],
        },
      ],
    },
  ];

  const toggleSelection = (selectedItems: string[], item: string, setSelected: Function) => {
    setSelected(
      selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item]
    );
  };

  return (
 

  
            <div>
              {/* Common Top Section */}
            

              {/* Event Gallery Section */}
              <section className={style.sale_filter_container}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6">
                      <button onClick={() => setShowFilter(!showFilter)}>
                        Filter Category button
                      </button>
                    </div>
                    <div className="col-6">
                      <p>Showing 1-12 of 92 results</p>
                      <button>Sort Button</button>
                    </div>
                  </div>
                </div>
              </section>

              {showFilter && (
                <section className={style.filterContent}>
                  <div className="container-fluid">
                    <div className={style.filterInnerContent}>
                      <div className="row">
                        {/* Category Section */}
                        <div className="col-4">
                          {categories.map((category, index) => (
                            <div key={index}>
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
                              <label>{category.name}</label>
                            </div>
                          ))}
                        </div>

                        {/* Sub Category Section */}
                        <div className="col-4">
                          {categories
                            .filter((cat) => selectedCategories.includes(cat.name))
                            .flatMap((cat) => cat.subCategories)
                            .map((subCat, index) => (
                              <div key={index}>
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
                                <label>{subCat.name}</label>
                              </div>
                            ))}
                        </div>

                        {/* Sub Sub Category Section */}
                        <div className="col-4">
                          {categories
                            .filter((cat) => selectedCategories.includes(cat.name))
                            .flatMap((cat) =>
                              cat.subCategories.filter((subCat) =>
                                selectedSubCategories.includes(subCat.name)
                              )
                            )
                            .flatMap((subCat) => subCat.subSubCategories)
                            .map((subSubCat, index) => (
                              <div key={index}>
                                <input type="checkbox" />
                                <label>{subSubCat}</label>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              <section className={style.sale_container}>
                <div className="container-fluid">Content goes here</div>
              </section>
            </div>
    
  );
};

export default Filter;
