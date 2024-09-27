import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

// Components
import CartModal from "./CartModal";
import CartButton from "../components/CartButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Context
import CartContext from "../components/CartContext";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const { addToCart, isCartOpen, handleCartOpen, handleCartClose } =
    useContext(CartContext);

  useEffect(() => {
    // Fetch the product details based on the ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/store-items/${id}`
        );
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity, selectedSize); // Ensure item is added before navigating
      navigate("/checkout");
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const Breadcrumbs = ({ productName }) => (
    <div className="flex items-center mb-4">
      <NavLink
        to="/shop"
        className="text-blue-500 hover:underline aesthet-nova-h3 text-xl"
      >
        Shop
      </NavLink>
      <span className="mx-2 aesthet-nova-h3 text-xl">/</span>
      <span className="text-gray-600 aesthet-nova-h3 text-xl opacity-50">
        {productName}
      </span>
    </div>
  );

  const ProductImage = ({ imageUrl, productName }) => (
    <img
      src={imageUrl}
      alt={productName}
      className="w-full md:w-1/2 object-contain mb-4 rounded md:mb-0 md:mr-8 bg-ingrain-board-color border-ingrain-color-orange border-2"
    />
  );

  const ProductInfo = ({
    product,
    quantity,
    selectedSize,
    setSelectedSize,
    handleAddToCart,
    handleBuyNow,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  }) => (
    <div className="flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-2 aesthet-nova">{product.name}</h1>
      <p className="text-2xl font-semibold mb-2 aesthet-nova-h1">
        ${(product.priceInCents / 100).toFixed(2)}
      </p>
      <SizeSelector
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        sizes={product.sizes}
      />
      <QuantityControls
        quantity={quantity}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleIncreaseQuantity={handleIncreaseQuantity}
      />
      <ActionButtons
        selectedSize={selectedSize}
        handleAddToCart={handleAddToCart}
        handleBuyNow={handleBuyNow}
      />
      <ProductDetails description={product.description} />
    </div>
  );

  const SizeSelector = ({ selectedSize, setSelectedSize, sizes }) => (
    <div className="flex items-center mb-4">
      <label htmlFor="size" className="mr-2 aesthet-nova-h2 hidden md:block">
        Size:
      </label>
      <select
        id="size"
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className="p-2 border rounded w-full aesthet-nova-h3"
      >
        <option value="" disabled>
          Select
        </option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );

  const QuantityControls = ({
    quantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  }) => (
    <div className="flex items-center mb-4">
      <div className="flex items-center mb-4 sm:hidden">
        <button
          onClick={handleDecreaseQuantity}
          className="btn rounded-r-none bg-neutral-200 border-neutral-950 bg-opacity-60"
        >
          <FontAwesomeIcon icon={quantity > 1 ? faMinus : faTrash} />
        </button>
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
          className="badge w-16 p-6 rounded-none border-neutral-950 bg-white text-center"
          min="1"
        />
        <button
          onClick={handleIncreaseQuantity}
          className="btn rounded-l-none bg-neutral-200 border-neutral-950 bg-opacity-60"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="hidden sm:flex items-center mb-4">
        <label htmlFor="quantity" className="mr-2 aesthet-nova-h2">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => {
            const value = Math.max(1, parseInt(e.target.value) || 1); // Ensure quantity is at least 1
            setQuantity(value);
          }}
          className="w-16 p-2 border rounded aesthet-nova-h3"
          min="1"
        />
      </div>
    </div>
  );

  const ActionButtons = ({ selectedSize, handleAddToCart, handleBuyNow }) => (
    <div className="flex flex-col mb-8">
      <button
        onClick={handleAddToCart}
        className={`addToCartTooltip w-full py-2 rounded mb-1 text-xl aesthet-nova-h2 ${
          selectedSize
            ? "bg-neutral-950 text-ingrain-color-orange"
            : "bg-neutral-950 text-ingrain-color-orange cursor-not-allowed"
        }`}
        disabled={!selectedSize}
      >
        Add to Cart
      </button>
      {!selectedSize && (
        <Tooltip anchorSelect=".addToCartTooltip" place="right">
          Select a size to add to Shopping Cart!
        </Tooltip>
      )}
      <button
        onClick={handleBuyNow}
        className={`buyNowTooltip w-full py-2 rounded mt-1 text-xl aesthet-nova-h2 ${
          selectedSize
            ? "bg-ingrain-color-orange"
            : "bg-ingrain-color-orange cursor-not-allowed"
        }`}
        disabled={!selectedSize}
      >
        Buy Now
      </button>
      {!selectedSize && (
        <Tooltip anchorSelect=".buyNowTooltip" place="right">
          Select a size to buy!
        </Tooltip>
      )}
    </div>
  );

  const ProductDetails = ({ description }) => (
    <div>
      <AccordionSection title="PRODUCT INFO" content={<p>{description}</p>} />
      <AccordionSection
        title="Return and Refund Policy"
        content={<p>Details about the return and refund policy...</p>}
      />
      <AccordionSection
        title="Shipping Information"
        content={<p>Details about shipping information...</p>}
      />
    </div>
  );

  const AccordionSection = ({ title, content }) => (
    <div className="collapse collapse-plus">
      <input type="radio" name="my-accordion-3" />
      <div className="collapse-title text-xl font-semibold aesthet-nova-h1">
        {title}
      </div>
      <div className="collapse-content text-lg aesthet-nova-h2">{content}</div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <CartButton onClick={handleCartOpen} className="absolute top-4 right-4" />
      <div className="bg-ingrain-board-color p-8 rounded-lg drop-shadow-xl max-w-4xl w-full m-8 mt-[200px]">
        <Breadcrumbs productName={product.name} />
        <div className="flex flex-col md:flex-row">
          <ProductImage imageUrl={product.image} productName={product.name} />
          <ProductInfo
            product={product}
            quantity={quantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            handleAddToCart={handleAddToCart}
            handleBuyNow={handleBuyNow}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
          />
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartClose} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
