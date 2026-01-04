import { createContext, useContext, ReactNode } from 'react';
import { usePersistence } from '../hooks/usePersistence';

interface UserContextType {
    userName: string;
    setUserName: (name: string) => void;
    isRegistered: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const { data: userName, updateData: setUserName } = usePersistence<string>('user_name', '');

    const isRegistered = userName.trim().length > 0;

    return (
        <UserContext.Provider value={{ userName, setUserName, isRegistered }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
