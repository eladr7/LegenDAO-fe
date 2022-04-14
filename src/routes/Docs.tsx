import { DefaultLayout } from "../components/layouts/DefaultLayout";

function Docs(): React.ReactElement {
    return (
        <DefaultLayout headerType="general">
            <h1 className="text-5xl text-white mt-20 p-8">LEGEND-DAO#Docs</h1>
        </DefaultLayout>
    );
}

export default Docs;
