import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authentication";
import { Layout } from "lucide-react";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;