import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { Link } from "react-router-dom";
import { FormatMoney } from "../utils/FormatMoney";
import { useProducts } from "../context/ProductsContext";
import { useAuth } from "../context/AuthContext";
import { ReverseTruncate } from "../utils/ReverseTruncate";

const ProductCard = ({ product, onAddToCart }) => {
  const { user } = useAuth();
  const { getUserWishLists, wishLists, getUserCart, toggleWishList } =
    useProducts();

  useEffect(() => {
    if (user) {
      getUserWishLists(user);
      getUserCart(user);
    }
  }, [user]);

  const isWishListed = wishLists.some(
    (wishList) => wishList.product.id == product.id
  );

  return (
    <div className="relative w-[250px] h-[300px]">
      <Link to={`/product/${product.id}`}>
        {product.productThumbnailImageURL ? (
          <img
            src={product.productThumbnailImageURL}
            loading="lazy"
            className="w-full h-full rounded-md object-cover"
            alt=""
          />
        ) : (
          <div
            className="flex flex-col gap-2 justify-center items-center"
            style={{ zIndex: 999 }}
          >
            <div className="loader"></div>
          </div>
        )}
      </Link>

      <div className="absolute top-0 right-0 w-full p-2 flex flex-row-reverse justify-between items-center">
        {isWishListed ? (
          <button
            onClick={() =>
              user
                ? toggleWishList(user, product)
                : alert("تکایە سەرەتا بچۆ ژوورەوە")
            }
            className="bg-black/50 rounded-full p-1 text-white active:scale-95 transform transition-all ease-in-out duration-200"
          >
            <IoIosHeart
              color="red"
              size={30}
              title="بیسڕەوە لە لستی دڵخوازەکانم"
            />
          </button>
        ) : (
          <button
            onClick={() =>
              user
                ? toggleWishList(user, product)
                : alert("تکایە سەرەتا بچۆ ژوورەوە")
            }
            className="bg-black/50 rounded-full p-1 text-white active:scale-95 transform transition-all ease-in-out duration-200"
          >
            <IoIosHeartEmpty size={30} title="زیادبکە بۆ لیستی دڵخوازەکانم" />
          </button>
        )}

        <button
          onClick={() =>
            user ? onAddToCart(product) : alert("تکایە سەرەتا بچۆ ژوورەوە")
          }
          className="bg-black/50 rounded-full p-1.5 text-white active:scale-95 transform transition-all ease-in-out duration-200"
        >
          <FiShoppingCart size={25} title="زیادبکە بۆ سەبەتەی کڕین" />
        </button>
      </div>

      <Link
        to={`/product/${product.id}`}
        className="absolute bottom-0 right-0 w-full h-10 p-1.5 flex flex-row-reverse justify-between items-center bg-black/50 text-white rounded-br-md rounded-bl-md"
      >
        <strong className="text-lg text-right">
          {ReverseTruncate(product.productName, 8)}
        </strong>
        <strong className="text-base">
          {FormatMoney(product.productPrice)} IQD
        </strong>
      </Link>
    </div>
  );
};

export default ProductCard;
