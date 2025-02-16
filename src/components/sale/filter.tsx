
'use client';

import React, { useState, useEffect } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import axios from "axios";
import style from "./style.module.css";
import { IoMdClose } from "react-icons/io";
import { useLocale, useTranslations } from 'next-intl';

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
  id: string;
  img: string;
  title: string;
  des: string;
  sale_rent: string;
  slug: string;
  article_code: string;
  amount: string;
  thumbnail: {
    formats?: {
      large?: { url: string };
    };
    url: string;
  };
  createdAt: Date;
  queryString: string;
}
interface FilterParameters {
  sort: object;
  filters: Filter;
  sortOption: string;
  reset: boolean
}
// Define props for the Filter component
interface FilterProps {
  onFilterChange: (params: FilterParameters) => void;
  totalItems?: number
  totalLength?: number
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, totalItems, totalLength }) => {
  const t = useTranslations('productPage.filterComponent');
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [selectedSubSubCategories, setSelectedSubSubCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subSubCategories, setSubSubCategories] = useState<SubSubCategory[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();


  const getSortParameter = (sortOption: string): object => {
    switch (sortOption) {
      case "price-low-to-high":
        return {
          key: "amount",
          value: "asc"
        }; // Changed from amount:asc
      case "price-high-to-low":
        return {
          key: "amount",
          value: "desc"
        };  // Changed from amount:desc
      case "newest":
        return {
          key: "createdAt",
          value: "desc"
        };  // Added specific sort parameter
      case "rating":
        return {}; // Added specific sort parameter
      default:
        return {};
    }
  };
  useEffect(() => {
    // Fetch Categories
    setLoading(true);

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}product-categories?locale=${locale}`, {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          }
        });

        if (response.data && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError(t("error1"));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(t("error1"));
        setLoading(false);

      }
      finally {
        setLoading(false);
      }
    };

    fetchCategories();

  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategories.length > 0) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/subcategories?locale=${locale}`, {
            categoryIds: selectedCategories
          }, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }
          });

          if (Array.isArray(response.data)) {
            const titleMap = new Map();
            response.data.forEach((subCat: SubCategory) => {
              if (!titleMap.has(subCat.id)) {
                titleMap.set(subCat.id, subCat);
              }
            });
            const uniqueSubCategories = Array.from(titleMap.values());
            setSubCategories(uniqueSubCategories);
            setSubSubCategories([]);
            setSelectedSubSubCategories([]);
          } else {
            console.error("Unexpected response format:", response.data);
            setError(t("error2"));
          }
        } catch (error) {
          console.error("Error fetching sub-categories:", error);
          setError(t("error2"));
        }
      } else {
        setSubCategories([]);
        setSubSubCategories([]);
        setSelectedSubCategories([]);
        setSelectedSubSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [selectedCategories]);

  useEffect(() => {
    const fetchSubSubCategories = async () => {
      if (selectedSubCategories.length > 0) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}products/subsubcategories?locale=${locale}`,
            { subCategoryIds: selectedSubCategories },
            { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}` } }
          );

          if (Array.isArray(response.data)) {
            const titleMap = new Map();
            response.data.forEach((subSubCat: SubSubCategory) => {
              const key = `${subSubCat.id}-${subSubCat.sub_sub_category_name}`;
              if (!titleMap.has(key)) {
                titleMap.set(key, subSubCat);
              }
            });
            const uniqueSubSubCategories = Array.from(titleMap.values());
            setSubSubCategories(uniqueSubSubCategories);
          } else {
            console.error("Unexpected response format:", response.data);
            setError(t("error3"));
          }
        } catch (error) {
          console.error("Error fetching sub-sub-categories:", error);
          setError(t("error3"));
        }
      } else {
        setSubSubCategories([]);
        setSelectedSubSubCategories([]);
      }
    };

    fetchSubSubCategories();
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

  const resetFilters = async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    setShowFilter(false);
    if (window.innerWidth <= 1000) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const sort = {};
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedSubSubCategories([]);
    setSubCategories([]);
    setSubSubCategories([]);
    const filters: Filter = {
      categoryIds: [],
      subCategoryIds: [],
      subSubCategoryIds: [],
    };
    onFilterChange({
      sort,
      filters,
      sortOption,
      reset: false
    });
    setShowFilter(!showFilter)

  };

  const applyFilters = async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    setShowFilter(false);
    if (window.innerWidth <= 1000) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const sort = getSortParameter(sortOption);
    const filters: Filter = {
      categoryIds: selectedCategories.map((category) => parseInt(category)),
      subCategoryIds: selectedSubCategories.map((subCategory) => parseInt(subCategory)),
      subSubCategoryIds: selectedSubSubCategories.map((subSubCategory) => parseInt(subSubCategory)),
    };
    onFilterChange({
      sort,
      filters,
      sortOption,
      reset: false
    });
  };

  const handleSortChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSortOption(selectedValue);

    try {
      const filters: Filter = {
        categoryIds: selectedCategories.map((category) => parseInt(category)),
        subCategoryIds: selectedSubCategories.map((subCategory) => parseInt(subCategory)),
        subSubCategoryIds: selectedSubSubCategories.map((subSubCategory) => parseInt(subSubCategory)),
      };

      const sort = getSortParameter(selectedValue);

      onFilterChange({
        sort,
        filters,
        sortOption,
        reset: false
      });
    } catch (error) {
      console.error("Error fetching sorted and filtered products:", error);
      setError(t("error4"));
    }
  };

  return (
    <div>
      <section className={style.sale_filter_container}>
        <div className="container-fluid">
          <div className="row p-2 py-3" style={{ background: "#131313" }}>
            <div className="col-12 col-md-6">
              <button onClick={() => setShowFilter(!showFilter)} className={style.filter_btn}>
                {t('filterButton')}
                {showFilter ? (
                  <FaAngleUp className="fs-5" />
                ) : (
                  <FaAngleDown className="fs-5" />
                )}
              </button>

            </div>
            <div className="col-12 col-md-6">
              <div className={style.sale_filter_container_right}>
                <p className={style.m_none}>
                  {`${t("filterMessage1")}${totalLength} ${t("filterMessage2")} ${totalItems} ${t("filterMessage3")}`}
                </p>
                <select className={style.sort_dropdown} value={sortOption} onChange={handleSortChange}>
                  <option value="">{t('sortOption.default')}</option>
                  <option value="price-low-to-high">{t('sortOption.lowToHigh')}</option>
                  <option value="price-high-to-low">{t('sortOption.highToLow')}</option>
                  <option value="newest">{t('sortOption.newest')}</option>
                  {/* <option value="rating">Rating</option> */}
                </select>
                <FaAngleDown className={`${style.btn_cat} fs-5 text-white`} />
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
                          <label>{category?.category_name}</label>
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
              {!loading && (
                <div className={style.filter_btn_containeee}>
                  <button onClick={() => setShowFilter(!showFilter)} className="bg-transparent border-0 d-lg-block d-md-none d-none"><IoMdClose /></button>
                </div>
              )}
              {!loading && (
                <div className={style.filter_btn_containe}>
                  <button className={style.reset_btn} onClick={resetFilters}>{t("reset")}</button>
                  <button className={style.apply_btn} onClick={applyFilters}>{t("apply")}</button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Filter;
