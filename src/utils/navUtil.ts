import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateToMainIfNotOnMain = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return () => {
        // Define your main page route, e.g., '/'
        const mainPageRoute = '/';

        // Check if current location is not the main page
        if (location.pathname !== mainPageRoute) {
            console.log("navigating to main")
            navigate(mainPageRoute);
        }
    };
};
