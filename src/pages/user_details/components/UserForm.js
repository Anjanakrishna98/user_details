import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUserRequest, updateUserRequest, setEditUser } from '../slice';
import { validationSchema } from '../validate';
import { X, Save, User, Mail, MapPin, Building } from 'lucide-react';

const UserForm = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('address.street', user.address.street);
      setValue('address.city', user.address.city);
    } else {
      reset();
    }
  }, [user, setValue, reset]);

  const onSubmit = (data) => {
    if (user) {
      dispatch(updateUserRequest({ id: user.id, ...data }));
    } else {
      dispatch(createUserRequest(data));
    }
    setOpenModal(false);
    dispatch(setEditUser(null));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="h-2 bg-gradient-to-r from-blue-700 to-blue-400"></div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {user ? 'Edit User' : 'Create New User'}
            </h2>
            <button
              onClick={() => setOpenModal(false)}
              className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    {...register('name')}
                    className="pl-10 w-full h-12 bg-gray-700 border border-gray-600 text-white rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    {...register('email')}
                    className="pl-10 w-full h-12 bg-gray-700 border border-gray-600 text-white rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Street</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    {...register('address.street')}
                    className="pl-10 w-full h-12 bg-gray-700 border border-gray-600 text-white rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter street address"
                  />
                </div>
                {errors.address?.street && (
                  <p className="mt-1.5 text-red-400 text-sm">{errors.address.street.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">City</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    {...register('address.city')}
                    className="pl-10 w-full h-12 bg-gray-700 border border-gray-600 text-white rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter city name"
                  />
                </div>
                {errors.address?.city && (
                  <p className="mt-1.5 text-red-400 text-sm">{errors.address.city.message}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                type="button"
                className="flex-1 px-4 py-3 bg-gray-700 text-gray-300 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
              >
                <Save size={18} />
                {user ? 'Update User' : 'Save User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;


