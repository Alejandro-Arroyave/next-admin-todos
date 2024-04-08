# Development

Steps to run development app:

1. Run Database

   ```
   docker compose up -d
   ```

2. Create a copy of .env.template and rename to .env
3. Replace environment variables
4. Execute command `npm install`
5. Execute command `npm run dev`
6. Execute these prisma comments
   ```
   npx prisma migrate dev
   npx prisma generate
   ```
7. Execute seed to create local database (`localhost:3000/api/seed`)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
