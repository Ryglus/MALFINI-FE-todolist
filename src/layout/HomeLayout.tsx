
import { Outlet } from 'react-router-dom';
import {Container} from "@mantine/core";


const HomeLayout = () => {

    return (
        <>
            <Container>
                <Outlet />
            </Container>
        </>
    );
};

export default HomeLayout;