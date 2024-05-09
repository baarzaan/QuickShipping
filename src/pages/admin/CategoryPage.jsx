import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCategories } from "../../context/CategoriesContext";
import { IoIosAdd, IoMdArrowBack } from "react-icons/io";
import AddSubCategory from "../../components/admin/modals/AddSubCategory";
import { RiDeleteBin4Line } from "react-icons/ri";
import DeleteModal from "../../components/admin/modals/DeleteModal";

const CategoryPage = () => {
  const { user } = useAuth();
  const { categorySlug } = useParams();
  const { categories, deleteCategory, getSubCategories, subCategories } =
    useCategories();
  const [category, setCategory] = useState(null);
  const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getCategory = () => {
    const foundCategory = categories.find(
      (category) => category.categorySlug == categorySlug
    );
    // console.log(foundCategory);
    setCategory(foundCategory);
  };

  useEffect(() => {
    getCategory();
  }, [categories, categorySlug]);

  useEffect(() => {
    if (category) {
      getSubCategories(category.id);
    }
  }, [category, subCategories]);

  return (
    <>
      {user ? (
        <>
          {user.isAdmin ? (
            <>
              {category ? (
                <div className="flex flex-col justify-center items-center gap-10 w-full">
                  <header className="flex justify-between items-center w-full h-14 mainShadow px-2">
                    <button
                      onClick={() => history.back()}
                      className="hover:bg-[#969393]/25 rounded-full p-1 transform transition-all ease-in duration-100 active:scale-95"
                    >
                      <IoMdArrowBack size={25} />
                    </button>

                    <h3 className="text-lg font-semibold">
                      {category.categoryName}
                    </h3>

                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() =>
                          setShowAddSubCategoryModal(!showAddSubCategoryModal)
                        }
                        className="flex justify-center items-center gap-0.5 p-2 hover:bg-[#969393]/25 rounded-md transform transition-all ease-in-out duration-100 active:scale-95"
                      >
                        <IoIosAdd size={25} />
                        Add sub category
                      </button>

                      <button
                        onClick={() => setShowDeleteModal(!showDeleteModal)}
                        className="flex justify-center items-center gap-0.5 p-2 bg-red-600 text-white hover:bg-red-700 rounded-md transform transition-all ease-in-out duration-100 active:scale-95"
                      >
                        <RiDeleteBin4Line size={25} />
                        Delete category
                      </button>
                    </div>
                  </header>

                  {showAddSubCategoryModal && (
                    <AddSubCategory
                      showAddSubCategoryModal={showAddSubCategoryModal}
                      setShowAddSubCategoryModal={setShowAddSubCategoryModal}
                      category={category}
                    />
                  )}

                  {showDeleteModal && (
                    <DeleteModal
                      showDeleteModal={showDeleteModal}
                      setShowDeleteModal={setShowDeleteModal}
                      category={category}
                      deleteFunction={deleteCategory}
                    />
                  )}

                  <div className="flex flex-col justify-center items-center gap-7 w-full">
                    <div className="flex flex-col justify-center items-center gap-2 py-2 w-full border-b border-b-[#969393]/25">
                      <h2 className="text-xl font-semibold">Sub categories</h2>
                      <div className="flex flex-wrap justify-center items-center gap-5">
                        {subCategories.length > 0 ? (
                          <>
                            {subCategories.map((subCategory, index) => (
                              <Link
                                key={index}
                                to={`/admin/subCategory/${subCategory.subCategorySlug}`}
                                className="w-[150px] p-1.5 border border-[#e4e4e5] rounded-md text-center transform transition-all ease-in-out duration-200 hover:-translate-y-1 active:scale-95"
                              >
                                {subCategory.subCategoryName}
                              </Link>
                            ))}
                          </>
                        ) : (
                          <>No sub category found</>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-2">
                      <h2 className="text-xl font-semibold">Products</h2>
                    </div>
                  </div>
                </div>
              ) : (
                <>Category not found</>
              )}
            </>
          ) : (
            <>404</>
          )}
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
};

export default CategoryPage;
