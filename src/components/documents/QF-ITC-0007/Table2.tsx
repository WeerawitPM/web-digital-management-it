import Image from "next/image";
import uncheck from "@/images/uncheck.png";
import checked from "@/images/check-mark.png";

export default function Table2({ requestFor }: { requestFor: any }) {
    return (
        <table className="w-full text-sm text-black">
            <tbody>
                <tr>
                    <td><div className="mt-5 text-center font-bold text-base">อีเมล</div></td>
                </tr>
                <tr>
                    <td className="flex flex-row gap-3">
                        <div>ขอเข้าใช้งานอีเมลของ</div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company === "VCS" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>VCS</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company === "VCST" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>VCST</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company === "BVS" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>BVS</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company === "AAA" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>AAA</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company === "TKM" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>TKM</div>
                        </div>
                        <div>โดยมีรายละเอียด ดังนี้</div>
                    </td>
                </tr>
                <tr>
                    <td className="flex">
                        <div className="mr-5">Username: {requestFor?.email_username}</div>
                    </td>
                </tr>
                <tr>
                    <td className="flex flex-row gap-3">
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company_type === "@vcsthai.com" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>@vcsthai.com</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company_type === "@vcsthailand.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>@vcsthailand.co.th</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company_type === "@bvs.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>@bvs.co.th</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company_type === "@aaa.co.th" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>@aaa.co.th</div>
                        </div>
                        <div className="flex flex-row gap-1">
                            <Image
                                src={requestFor?.email_company_type === "@tkm-thaikin.com" ? checked : uncheck}
                                alt='checkbox'
                                height={20}
                                width={20}
                                unoptimized
                            />
                            <div>@tkm-thaikin.com</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="font-bold">วันที่เลิกใช้งาน: {requestFor?.email_end_date && new Date(requestFor?.email_end_date).toLocaleDateString('th-TH')}</td>
                </tr>
            </tbody>
        </table>
    );
}