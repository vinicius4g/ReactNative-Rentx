import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User as ModelUser } from '../database/model/User';
import { Car as ModelCar } from '../database/model/Car';

import { Q } from '@nozbe/watermelondb';

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/dot-notation */

/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  loadUserData: () => Promise<void>;
  loadingUser: boolean;
  loading: boolean;
  cars: ModelCar[];
  loadingCars: boolean;
  fetchCars: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [loadingUser, setLoadingUser] = useState(false);

  const [loading, setLoading] = useState(true);

  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        await userCollection.create(newUser => {
          // eslint-disable-next-line prettier/prettier
            newUser.user_id = String(user.id),
            // eslint-disable-next-line prettier/prettier
            newUser.name = user.name,
            // eslint-disable-next-line prettier/prettier
            newUser.email = user.email,
            // eslint-disable-next-line prettier/prettier
            newUser.driver_license = user.driver_license,
            // eslint-disable-next-line prettier/prettier
            newUser.avatar = user.avatar,
            // eslint-disable-next-line prettier/prettier
            newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(String(data.id));
        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update(userData => {
          // eslint-disable-next-line prettier/prettier
          userData.name = user.name,
            // eslint-disable-next-line prettier/prettier
          userData.driver_license = user.driver_license,
            // eslint-disable-next-line prettier/prettier
          userData.avatar = user.avatar
        
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error as any);
    }
  }

  async function fetchCars() {
    try {
      const carCollection = database.get<ModelCar>('cars');
      const cars = await carCollection.query().fetch();

      setCars(cars);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoadingCars(false);
    }
  }

  async function loadUserData() {
    setLoadingUser(true);

    const userCollection = database.get<ModelUser>('users');

    const response = await userCollection.query().fetch();

    if (response.length > 0) {
      const userData = response[0]._raw as unknown as User;
      api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

      setData(userData);
    }
    setLoadingUser(false);
    setLoading(false);
  }

  useEffect(() => {
    loadUserData();
    fetchCars();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn,
        signOut,
        updateUser,
        loadUserData,
        loadingUser,
        loading,
        cars,
        loadingCars,
        fetchCars,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
