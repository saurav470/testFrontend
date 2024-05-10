import { useSelector } from 'react-redux';
import { RootState } from '../reducer';
import RenderCartCourses from '../components/RenderCartCourses';
import RenderTotalAmount from '../components/RenderTotalAmount';

export default function Cart() {
  const { total, totalItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="mx-auto  mt-3 w-11/12">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">Cart</h1>
      <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
        {totalItems} Product in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your cart is empty
        </p>
      )}
    </div>
  );
}
