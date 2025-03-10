import { call, put, takeEvery } from 'redux-saga/effects';
import { 
    createUserRequest, createUserSuccess, createUserFailure, 
    fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure, 
    updateUserRequest, updateUserSuccess, updateUserFailure 
} from './slice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createUserApi = async (userData) => {
    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
    return await response.json();
};

const fetchUsersApi = async () => {
    const response = await fetch('http://localhost:5000/users');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();
};

const updateUserApi = async (userData) => {
    const response = await fetch(`http://localhost:5000/users/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return await response.json();
};

function* createUser(action) {
    try {
        const newUser = yield call(createUserApi, action.payload);
        yield put(createUserSuccess(newUser));
        toast.success("🎉 User added successfully!");
    } catch (error) {
        yield put(createUserFailure(error.message));
        toast.error("❌ Failed to create user!");
    }
}

function* fetchUsers() {
    try {
        const users = yield call(fetchUsersApi);
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        yield put(fetchUsersFailure(error.message));
        toast.error("❌ Failed to fetch users!");
    }
}

function* updateUser(action) {
    try {
        const updatedUser = yield call(updateUserApi, action.payload);
        yield put(updateUserSuccess(updatedUser));
        toast.success("🔄 User updated successfully!");
    } catch (error) {
        yield put(updateUserFailure(error.message));
        toast.error("❌ Failed to update user!");
    }
}

export default function* userSaga() {
    yield takeEvery(createUserRequest.type, createUser);
    yield takeEvery(fetchUsersRequest.type, fetchUsers);
    yield takeEvery(updateUserRequest.type, updateUser);
}
