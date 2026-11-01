"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/store";
import { auth, signIn, signOut } from "@/auth";
import bcrypt from "bcryptjs";

export async function requireAdmin() {
  const session = await auth();
  if(!session || session?.user?.role !== 'ADMIN')
  {
      redirect("/admin/login");
  }
}
export async function registerUser(email: string, password: string) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email: email}
        })
        if(existingUser){
            return {success: false, message: "User already exists"}
        }
        const passwordHash = bcrypt.hashSync(password, 10)
        const newUser = await prisma.user.create({
            data: {
                email,
                password: passwordHash,
            }
        })
        return {success: true, message: "User registered successfully", user: newUser}
    } catch (error) {
        console.error(error)
        return {success: false, message: "There's an error somewhere"}
    }
}

export async function Login(email: string, password: string) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email: email}
        })
        if(!existingUser){
            return {success: false, message: "User does not exist"}
        }
        const isMatch = bcrypt.compareSync(password, existingUser.password)
        if(!isMatch){
            return {success: false, message: "Incorrect password"}
        }
        await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        return { success: true, message: "Login successful", redirect: "" };
    } catch (error) {
        console.error(error)
        return {success: false, message: "There's an error somewhere"}
    }
}

export async function logout(){
    await signOut(
        {redirectTo: "/admin/login"}
    )
}

// "Ankara Wrap Dress" -> "ankara-wrap-dress"
function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "item";
}

// If the slug is already taken, add -2, -3 ...
async function uniqueSlug(base: string) {
  let slug = base;
  let n = 2;
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

// Used for both "add item" and "edit item". An edit has a hidden "id" field.
export async function saveProduct(formData: FormData) {
  requireAdmin();

  const id = Number(formData.get("id")) || null;
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const price = Math.round(Number(formData.get("price")));
  const inStock = formData.get("inStock") === "on";

  const formPage = id ? `/admin/products/${id}` : "/admin/products/new";

  if (!name || !description || !imageUrl) {
    redirect(`${formPage}?error=${encodeURIComponent("Please fill in every field.")}`);
  }
  if (!categories.includes(category)) {
    redirect(`${formPage}?error=${encodeURIComponent("Please pick a category.")}`);
  }
  if (!Number.isFinite(price) || price <= 0) {
    redirect(`${formPage}?error=${encodeURIComponent("Price must be a number above 0.")}`);
  }

  if (id) {
    // Editing: keep the slug so existing links keep working
    await prisma.product.update({
      where: { id },
      data: { name, description, category, imageUrl, price, inStock },
    });
  } else {
    const slug = await uniqueSlug(slugify(name));
    await prisma.product.create({
      data: { name, slug, description, category, imageUrl, price, inStock },
    });
  }

  redirect("/admin");
}

export async function toggleStock(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id"));
  const product = await prisma.product.findUnique({ where: { id } });
  if (product) {
    await prisma.product.update({ where: { id }, data: { inStock: !product.inStock } });
  }
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  requireAdmin();
  const id = Number(formData.get("id"));
  await prisma.product.deleteMany({ where: { id } });
  redirect("/admin");
}
