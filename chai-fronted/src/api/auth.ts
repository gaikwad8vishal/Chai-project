import { createContext, useContext, useState, ReactNode } from "react";

// ✅ Define Auth Context Type
interface AuthContextType {
  user: string | null;
  signIn: (username: string) => void;
  signOut: () => void;
}

// ✅ Context ko create karna mat bhool!
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user") || null);

  const signIn = (username: string) => {
    setUser(username);
    localStorage.setItem("user", username);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children} {/* ✅ Yeh ab kaam karega! */}
    </AuthContext.Provider>
  );
};

// ✅ Custom Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
