import { DefaultLayout } from "../components/layouts/DefaultLayout";

function NotFound(): React.ReactElement {
    return (
        <DefaultLayout>
            <h1 className="text-5xl text-white mt-20 p-8">404|Not Found</h1>
        </DefaultLayout>
    );
}

export default NotFound;
