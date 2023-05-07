import { create } from "zustand";
import { formType } from "../components/InputForm";

export type usersList = {
    id: number,
    name: string,
    email: string,
    gender: string,
    address: {
      city: string,
      street: string,
    },
    phone: string
  }

  export type fakeUser = {
    name: string,
    email: string,
    gender: string,
    address: {
      city: string,
      street: string,
    },
    phone: string
  }

  export type editableUser = {
    data: formType,
    currentID: number
  }

  export const emptyFormData = {
    name: '',
    email: '',
    city: '',
    street: '',
    gender: '',
    phone: ''
  }

  type Store = {
    users: [] | usersList[],
    formVisibility: boolean,
    defaultData: editableUser,
    setUsers: (newUserSet: usersList[]) => void,
    addUser: (newUser: usersList) => void,
    deleteUserTemp: (userID: number) => void,
    editUserTemp: (userID: number, newData: usersList) => void,
    showForm: () => void,
    fillForm: (formData: editableUser) => void,
  }
  

const store = (set: any) => ({
    users: [],
    formVisibility: false,
    defaultData: { data: emptyFormData, currentID: 0 }, // default data for form
    setUsers: (newUserSet: usersList[]) => set(() => ({ 
      users: newUserSet
     })),
     addUser: (newUser: usersList) => set((store: any) => ({ 
      users: [...store.users, newUser]
     })),
     deleteUserTemp: (userID: number) => set((store: any) => ({
      users: store.users.filter((user: usersList) => user.id !== userID)
     })),
     editUserTemp: (userID: number, newData: usersList) => set((store: any) => ({
      users: store.users.map((user: usersList) => {
        if (user.id === userID) {
          return newData
        }
        else return user;
      })
     })),
     showForm: () => set((store: any) => ({
      formVisibility: !store.formVisibility
     })),
     fillForm: (formData: editableUser) => set(() => ({
      defaultData: formData
     }))
})

export const useStore = create<Store>(store);