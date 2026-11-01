import { auth } from "@/auth";
import RegisterComp from "@/components/reigster";
import { redirect } from "next/navigation";

export default async function LoginPage({searchParams}:  { searchParams: { error?: string } }){
   const params = await searchParams;

  return <RegisterComp searchParams={params.error as string} />
}