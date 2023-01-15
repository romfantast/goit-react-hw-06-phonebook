import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";


const contactsInitialState= [
  {id: 'id-1', name: 'Rosie Simpson', phone: '459-12-56'},
  {id: 'id-2', name: 'Hermione Kline', phone: '443-89-12'},
  {id: 'id-3', name: 'Eden Clements', phone: '645-17-79'},
  {id: 'id-4', name: 'Annie Copeland', phone: '227-91-26'},
]
const contactSlice = createSlice({
    // Ім'я слайсу
    name: "contacts",
    // Початковий стан редюсера слайсу
    initialState: contactsInitialState,
    // Об'єкт редюсерів
    reducers:  {
        addContact: {
            reducer(state, action) {
              state.push(action.payload);
            },
            prepare(name) {
              return {
                payload: {
                  ...name,
                  id: nanoid(),
                },
              };
            },
          },
    deleteContact(state, action) {
      const index = state.findIndex(task => task.id === action.payload);
      state.splice(index, 1);
    }
  }})
  
  // Генератори екшенів
  export const { addContact, deleteContact } = contactSlice.actions;
  // Редюсер слайсу
  export const contactReducer = contactSlice.reducer;