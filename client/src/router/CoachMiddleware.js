import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const CoachMiddleware = (props) => {

    const [loaded, setLoaded] = useState(false);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (!user.isLogged) {
            setLoaded(false);
        } else {
            setLoaded(true);
        }
    }, [user]);

    if (!localStorage.getItem("token")) {
        return <Navigate to={"/auth/login"} />;
    }

    switch (loaded) {
        case true: {
            if (user.role === "coach") {
                return props.children;
            }

            return <Navigate to={"/auth/login"} />;
        }
        case false: {
            return <h1>Loading</h1>;
        }
        default:
            return <h1>Loading</h1>;
    }
};

