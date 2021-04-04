import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

interface Props {
    children: React.ReactNode
}

type DataContextType = {
    data: Data[];
    setData: Dispatch<SetStateAction<any>>
}

export const DataContext = createContext<DataContextType>({data: [], setData: ()=>{}});

export const DataContextProvider: React.FC<Props> = ({ children }) => {

    const [data, setData] = useState([]);

    return (
        <DataContext.Provider value={{ data, setData }}>
            { children}
        </DataContext.Provider>
    );
}