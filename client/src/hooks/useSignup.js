import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async ({ username, email, password, confirmPassword, gender }) => {
        const success = handleInputs({ username, email, password, confirmPassword, gender });

        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, confirmPassword, gender })
            });

            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            
            //localStorage
            localStorage.setItem("chat-user",JSON.stringify(data))

            //context
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    function handleInputs({ username, email, password, confirmPassword, gender }) {
        if (!username || !email || !password || !confirmPassword || !gender) {
            toast.error('Please fill all the fields');
            return false;
        }
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return false;
        }
        if (password.length < 6) {
            toast.error('Password must contain at least 6 characters');
            return false;
        }
        return true;
    }

    return { loading, signup };
};

export default useSignup;
