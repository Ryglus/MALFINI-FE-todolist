import { useNavigate, useLocation } from 'react-router-dom';

export const useNavigateToMainIfNotOnMain = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return () => {
        const mainPageRoute = '/';

        if (location.pathname !== mainPageRoute) {
            navigate(mainPageRoute);
        }
    };
};
