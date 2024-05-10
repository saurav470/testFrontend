import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../reducer';
import { useState } from 'react';
import { IProducts } from '../Types';
import toast from 'react-hot-toast';
import axios from 'axios';
import { resetCart } from '../Slice/cartSlice';

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state: RootState) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { firstName, lastName, address } = formData;

  const handleBuy = async () => {
    try {
      if (!firstName || !lastName || !address) {
        toast.error('all field mandatory required');
      }
      const product = cart.map((product: IProducts) => product);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/buy`,
        {
          firstName,
          lastName,
          address,
          product,
        },
      );
      toast.success('product buy successfully');
      console.log(res);
      console.log(res.data);
      dispatch(resetCart());
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('something went wrong');
    }
  };

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <form
        onSubmit={handleOnSubmit}
        className="my-4 mt-6 flex w-full flex-col gap-y-4"
      >
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => handleOnChange(e)}
              placeholder="Enter first name"
              style={{
                boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => handleOnChange(e)}
              placeholder="Enter last name"
              style={{
                boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
              }}
              className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Last Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="address"
            value={address}
            onChange={(e) => handleOnChange(e)}
            placeholder="Enter address"
            style={{
              boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
            }}
            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
          />
        </label>
      </form>
      <button
        className="flex cursor-pointer 
         items-center
         gap-x-2 rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 "
        onClick={handleBuy}
      >
        Buy Now
      </button>
    </div>
  );
}
