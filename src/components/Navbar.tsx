import { AiOutlineShoppingCart } from 'react-icons/ai';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../reducer';

function Navbar() {
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const location = useLocation();

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== '/' ? 'bg-richblack-800' : ''
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex gap-2">
            <p className="text-3xl text-white">Ecommerce</p>
          </div>
        </Link>

        <div className="hidden items-center gap-x-4 md:flex">
          {
            <Link to="/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default Navbar;
