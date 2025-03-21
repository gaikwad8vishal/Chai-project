import { createContext, useContext, useState, ReactNode } from "react";

// 🔥 Define AuthContext Type
interface AuthContextType {
  user: string | null;
  signIn: (username: string) => void;
  signOut: () => void;
}

// ✅ Pehle Context Banayein (Yeh Missing Tha)
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Ab AuthProvider Ko Sahi Karein
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
      {children} {/* ✅ Yeh Ab Properly Work Karega */}
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
