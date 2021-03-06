import { DefaultLayout } from "../components/layouts/DefaultLayout";

function NotFound(): React.ReactElement {
    return (
        <DefaultLayout headerType="general">
            <h1 className="text-5xl text-white mt-20 p-16">404|Not Found</h1>
        </DefaultLayout>
    );
}

export default NotFound;
