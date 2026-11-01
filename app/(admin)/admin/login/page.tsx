import { auth } from "@/auth";
import LoginComp from "@/components/LoginComp";
import { redirect } from "next/navigation";

export default async function LoginPage({searchParams}:  { searchParams: { error?: string } }){
   const params = await searchParams;

   const session = await auth();
   if(session){
    redirect("/admin")
   }

  return <LoginComp searchParams={params.error as string} />
}