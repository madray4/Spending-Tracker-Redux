import { EntriesContext } from "../context/EntriesContext";
import { useContext } from "react";

export const useEntriesContext = () =>{
  const context = useContext(EntriesContext);

  if(!context){
    throw Error('useEntriesContext must be used inside a EntriesContextProvidor');
  }

  return context;
};
