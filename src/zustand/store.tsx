import { create } from "zustand";

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
  

const store = (set: any) => ({
    users: [],
    formVisibility: false,
    setUsers: (newUserSet: usersList[]) => set(() => ({ 
      users: newUserSet
     })),
     addUser: (newUser: usersList) => set((store: any) => ({ 
      users: [...store.users, newUser]
     })),
     deleteUserTemp: (userID: number) => set((store: any) => ({
      users: store.users.filter((user: usersList) => user.id !== userID)
     })),
     showForm: () => set((store: any) => ({
      formVisibility: !store.formVisibility
     }))
})

export const useStore = create(store);