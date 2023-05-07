import axios from "axios";
import { fakeUser } from "../zustand/store";

const BASE_URL = 'http://localhost:3001';

export const fetchUsers = async (url: string) => {
    const { data } = await axios.get(BASE_URL + url);
    return data;
}

export const postUser = async (url: string, newUser: fakeUser) => {
    const { data } = await axios.post(BASE_URL + url, newUser)
    return data;
}

export const deleteUser = async (url: string, userID: number) => {
    const { data } = await axios.delete(BASE_URL + url + '/' + userID)
    return data;
}

export const editUser = async (url: string, userID: number, newData: fakeUser) => {
    const { data } = await axios.put(BASE_URL + url + '/' + userID, newData)
    return data;
}