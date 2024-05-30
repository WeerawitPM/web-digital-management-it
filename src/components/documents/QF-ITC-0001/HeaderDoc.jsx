import Link from "next/link"
import { Button } from "@chakra-ui/react"
import { useSession } from "next-auth/react"

export default function HeaderDoc({ doc_no }) {
    const { data: session } = useSession();

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between flex-wrap">
                    <div className="flex justify-start">
                        <div className="font-semibold text-md text-gray-800 my-auto">
                            ใบร้องขออุปกรณ์สารสนเทศ {doc_no}
                        </div>
                    </div>
                    <div className="justify-end">
                        <Link href={`/${session?.user?.role}/documents/QF-ITC-0001/pdf/${doc_no}`}>
                            <Button size="md">Export to PDF.</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}