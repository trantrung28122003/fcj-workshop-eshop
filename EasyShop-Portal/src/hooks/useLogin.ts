
import { jwtDecode } from 'jwt-decode';

const isUserLogin = (): boolean => {
  const storedAuth = localStorage.getItem("authentication");
  if (!storedAuth) return false;

  try {
    const authData: { IdToken: string } = JSON.parse(storedAuth);
    return !!authData.IdToken; 
  } catch (error) {
    console.error("Lỗi parse JSON:", error);
    return false;
  }
};
const getCredentials = (): string => {
 const storedAuth = localStorage.getItem("authentication");
  if (!storedAuth) return "";
  try {
    
    const authData: { IdToken: string } = JSON.parse(storedAuth);
    return authData.IdToken || ""; 

  } catch (error) {
    console.error("Lỗi parse JSON:", error);
    return "";
  }
};

const hasAdminRole = (): boolean => {
  const storedAuth = localStorage.getItem("authentication");
  if (!storedAuth) return false;

  try {
    const authData = JSON.parse(storedAuth);
    const idToken = authData.IdToken;
    const decoded: any = jwtDecode(idToken);
    const groups: string[] = decoded["cognito:groups"] || [];
    return groups.includes("admin");
  } catch (error) {
    console.error("Lỗi khi decode token:", error);
    return false;
  }
};

export { isUserLogin, getCredentials, hasAdminRole };