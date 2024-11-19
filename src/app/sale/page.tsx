'use client';

import React, { useState } from "react";
import style from "./style.module.css";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";

const Page: React.FC = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

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

  return (
    <Wrapper>
      <HeaderOne />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <div className={style["without-banner"]}>
              {/* Common Top Section */}
              <div className={style.topSection}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <h1 className={style.pageTitle}>Event Gallery</h1>
                    </div>
                  </div>
                </div>
              </div>

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
                    <div className="row">
                      {/* Category Section */}
                      <div className="col-4">
                        <h3>Categories</h3>
                        {categories.map((category, index) => (
                          <div key={index}>
                            <input
                              type="checkbox"
                              checked={selectedCategory === category.name}
                              onChange={() =>
                                setSelectedCategory(
                                  selectedCategory === category.name ? null : category.name
                                )
                              }
                            />
                            <label>{category.name}</label>
                          </div>
                        ))}
                      </div>

                      {/* Sub Category Section */}
                      {selectedCategory && (
                        <div className="col-4">
                          <h3>Sub Categories</h3>
                          {categories
                            .find((cat) => cat.name === selectedCategory)
                            ?.subCategories.map((subCat, index) => (
                              <div key={index}>
                                <input
                                  type="checkbox"
                                  checked={selectedSubCategory === subCat.name}
                                  onChange={() =>
                                    setSelectedSubCategory(
                                      selectedSubCategory === subCat.name ? null : subCat.name
                                    )
                                  }
                                />
                                <label>{subCat.name}</label>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* Sub Sub Category Section */}
                      {selectedSubCategory && (
                        <div className="col-4">
                          <h3>Sub Sub Categories</h3>
                          {categories
                            .find((cat) => cat.name === selectedCategory)
                            ?.subCategories.find((subCat) => subCat.name === selectedSubCategory)
                            ?.subSubCategories.map((subSubCat, index) => (
                              <div key={index}>
                                <input type="checkbox" />
                                <label>{subSubCat}</label>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              <section className={style.sale_container}>
                <div className="container-fluid">Content goes here</div>
              </section>
            </div>
          </main>
          <FooterOne />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
