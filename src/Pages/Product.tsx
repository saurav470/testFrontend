import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IProducts } from '../Types';
import toast from 'react-hot-toast';
import { addToCart } from '../Slice/cartSlice';

const Product = () => {
  const dispatch = useDispatch();
  const [product, setProducts] = useState<IProducts[] | []>([]);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = (product: IProducts) => {
    console.log(product);

    dispatch(addToCart(product));
    return;
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/products`,
        );
        const data: IProducts[] = res.data.data;
        setProducts(data);
      } catch (error) {
        console.log('Could not fetch Products.', error);
        toast.error('Could not fetch Products.');
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {product?.map((product: IProducts) => (
        <div
          key={product.id}
          className="border-gray-100 relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border bg-white shadow-md"
        >
          <a
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              className="object-cover"
              src={product.image}
              alt="product image"
            />
          </a>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-slate-900 text-xl tracking-tight">
                {product.title}
              </h5>
            </a>
            <div className="mb-5 mt-2 flex items-center justify-between">
              <p>
                <span className="text-slate-900 text-3xl font-bold">
                  ₹ {product.price}
                </span>
              </p>
              <div className="flex items-center">
                <span className="ml-3 mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {product.rating.rate}
                </span>
              </div>
            </div>
            <div
              onClick={() => handleAddToCart(product)}
              className="flex items-center justify-center rounded-md bg-pure-greys-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pure-greys-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
