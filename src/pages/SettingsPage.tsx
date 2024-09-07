import ThemeToggle from "../components/individual/ThemeToggle.tsx";
import TagCRUDLSection from "../components/ui/TagCRUDLSection.tsx";
import {Divider, Stack} from "@mantine/core";

function SettingsPage() {

    return (
        <div
            style={{
                height: '100%',
                padding: '20px'
            }}
        >
            <Stack>
                <ThemeToggle/>
                <Divider />
                <TagCRUDLSection/>
            </Stack>


        </div>
    );
}

export default SettingsPage;
