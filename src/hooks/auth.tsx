import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect
} from "react";

import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";


type User = {
    id: string;
    name: string;
    isAdmin: boolean;
}

type AuthContextData = {
    SingIn: (email: string, password: string) => Promise<void>;
    SingOut: () => Promise<void>;
    islogin: boolean;
    User: User | null;
}

type AuthProviderProps = {
    children: ReactNode;
}

const USER_COLLETION = '@gopizza:users';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [islogin, setIsLogin] = useState(false)
    const [User, setUser] = useState<User | null>(null)

    async function SingIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe e-mail e a senha')
        }

        setIsLogin(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(account => {
                firestore()
                    .collection('users')
                    .doc(account.user.uid)
                    .get()
                    .then(async (profile) => {
                        const { name, isAdmin } = profile.data() as User;

                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin
                            };

                            await AsyncStorage.setItem(USER_COLLETION, JSON.stringify(userData))
                            setUser(userData)
                        }
                    })
                    .catch(() => Alert.alert('login', 'não foi possivel buscar os dados de perfil do usuário'))
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

    async function loadUserStorageData() {
        setIsLogin(true);

        const storedUser = await AsyncStorage.getItem(USER_COLLETION);

        if (storedUser) {
            const userData = JSON.parse(storedUser) as User;
            console.log(userData);
            setUser(userData);
        }

        setIsLogin(false);
    }

    async function SingOut() {
        await auth().signOut();
        await AsyncStorage.removeItem(USER_COLLETION);
        setUser(null);
    }

    useEffect(() => {
        loadUserStorageData();
    }, [])

    return (
        <AuthContext.Provider value={{
            SingIn,
            islogin,
            User,
            SingOut
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