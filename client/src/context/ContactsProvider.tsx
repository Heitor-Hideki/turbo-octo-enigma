import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface IContactContext {
  contacts: {
    id: string;
    name: string;
    number: string;
  }[],
  createContact(id: any, name: any): void;
}

const ContactsContext = React.createContext<IContactContext | undefined>(undefined);

export function useContacts() {
  const context = useContext(ContactsContext);

  if (context === undefined) {
    throw Error(
      "Item must be used inside of a RadioGroup, " +
        "otherwise it will not function correctly."
    ); 
  }

  return context;
}
 
export function ContactsProvider({children}) {
  const [contacts, serContacts] = useLocalStorage('contacts', []) 

  const createContact = (id, name) => {
    serContacts(prevContacts => {
      return [...prevContacts, {id, name}]
    })
  }

  return (
    <ContactsContext.Provider value={{contacts, createContact}}>
      {children}
    </ContactsContext.Provider>
  )
}
