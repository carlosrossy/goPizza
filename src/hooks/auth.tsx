import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";
import auth from '@react-native-firebase/auth'
import { Alert } from "react-native";

type AuthContextData = {
    SingIn: (email: string, password: string) => Promise<void>;
    islogin: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [islogin, setIsLogin] = useState(false)

    async function SingIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe e-mail e a senha')
        }

        setIsLogin(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(account => {
                console.log(account);
            })
            .catch(error => {
                const { code } = error;

                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    return Alert.alert('Login', 'E-mail e/ou senha inválida.');
                } else {
                    return Alert.alert('Login', 'Não foi possivel realizar o Login.');
                }
            })
            .finally(() => setIsLogin(false));
    }

    return (
        <AuthContext.Provider value={{
            SingIn,
            islogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }