import { RiDeleteBin6Line } from 'react-icons/ri';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../Slice/cartSlice';

import { RootState } from '../reducer';
import { IProducts } from '../Types';

export default function RenderCartCourses() {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-1 flex-col">
      {cart.map((product: IProducts, indx: number) => (
        <div
          key={product.id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && 'border-b border-b-richblack-400 pb-6'
          } ${indx !== 0 && 'mt-6'} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={product?.image}
              alt={product?.title}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {product?.title}
              </p>
              <p className="text-sm text-richblack-300">{product?.category}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{product?.rating?.rate}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 px-[12px] py-3 text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {product?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
