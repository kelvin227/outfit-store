# Outfit Store

A simple online store: customers browse items and order on WhatsApp.
Built with Next.js (App Router), Prisma and PostgreSQL.

## Set up

1. `npm install`
2. Copy `.env.example` to `.env` and fill in the values
   (database address, store name, WhatsApp number, admin password).
3. `npm run db:push` creates the tables in your database.
4. `npm run db:seed` adds sample items.
5. `npm run dev` then open http://localhost:3000

## Admin panel

Go to http://localhost:3000/admin and log in with the `ADMIN_PASSWORD` from your `.env`.
From there you can add items, edit them, mark them sold out or available, and delete them.
Images are links for now: paste the web address of a photo.

## Where things live

- `prisma/schema.prisma`: what a product looks like in the database
- `lib/store.ts`: store name, categories, price format, WhatsApp link
- `app/page.tsx`: the home page (product grid and filter)
- `app/products/[slug]/page.tsx`: one product's page with the order button
- `components/ProductCard.tsx`: one item in the grid
- `app/globals.css`: all the styling, in one file
- `lib/auth.ts`: the admin login check
- `app/admin/`: the admin pages and their actions (add, edit, delete)
- `components/ProductForm.tsx`: the add/edit form
