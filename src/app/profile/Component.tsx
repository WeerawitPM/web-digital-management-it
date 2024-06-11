import Header from "./Header";
import Password from "./Password";
import Picture from "./Picture";
import Profile from "./Profile";
import Signature from "./Signature";

export default function Component({ data }: { data: any }) {
    return (
        <>
            <Header />
            <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 py-12 min-h-screen">
                <Picture image={data?.image} />
                <Profile data={data} />
                <Signature oldLicense={data?.license} />
                <Password />
            </main>
        </>
    )
}