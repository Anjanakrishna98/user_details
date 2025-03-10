import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest, setEditUser } from '../slice';
import UserForm from './UserForm';
import { Plus, Edit2, Loader, Mail, MapPin, User as UserIcon } from 'lucide-react';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleEdit = (user) => {
    dispatch(setEditUser(user));
    setOpenModal(true);
  };

  const handleAddUser = () => {
    dispatch(setEditUser(null));
    setOpenModal(true);
  };

  // Function to generate a color based on name (for avatar backgrounds)
  const getAvatarBg = (name) => {
    const colors = ['bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800'];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-12 bg-blue-600 rounded"></div>
            <h2 className="text-3xl font-bold text-white">User Management</h2>
          </div>
          <button
            className="bg-blue-700 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all duration-300"
            onClick={handleAddUser}
          >
            <Plus size={18} className="bg-blue-500 bg-opacity-30 p-0.5 rounded-full" />
            <span className="font-medium">Add New User</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12 bg-gray-800 rounded-2xl shadow-lg">
            <Loader className="animate-spin text-blue-500 mr-2" size={24} />
            <p className="text-gray-300 font-medium">Loading users data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user.id} className="bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-blue-700 to-blue-400"></div>
                <div className="p-6">
                  <div className="flex items-center mb-5">
                    {/* User Avatar */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 ${getAvatarBg(user.name)}`}>
                      {getInitials(user.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white capitalize">{user.name}</h3>
                      <button
                        className="mt-1 text-blue-300 text-sm flex items-center hover:text-blue-200"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit2 size={14} className="mr-1" />
                        Edit Profile
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <Mail size={16} className="mr-3 flex-shrink-0 text-blue-400" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    
                    <div className="flex items-start text-gray-300">
                      <MapPin size={16} className="mr-3 mt-1 flex-shrink-0 text-blue-400" />
                      <span className="capitalize">
                        {user.address.street}, {user.address.city}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <button
                    className="w-full bg-gray-700 text-blue-300 py-2 rounded-lg hover:bg-blue-900 font-medium text-sm transition-colors"
                    onClick={() => handleEdit(user)}
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {users.length === 0 && !loading && (
          <div className="bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-900 rounded-full flex items-center justify-center">
              <UserIcon size={40} className="text-blue-300" />
            </div>
            <p className="text-gray-400 mb-6">No users found</p>
            <button
              className="bg-blue-700 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 hover:bg-blue-600 shadow-md transition-all"
              onClick={handleAddUser}
            >
              <Plus size={18} className="bg-blue-500 bg-opacity-30 p-0.5 rounded-full" />
              <span className="font-medium">Add Your First User</span>
            </button>
          </div>
        )}

        {openModal && (
          <UserForm openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </div>
    </div>
  );
};

export default UserList;

