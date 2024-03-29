![NEXTJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NEXTAUTH](https://img.shields.io/badge/next%20auth-black?style=for-the-badge&logo=next%20Auth)
![TYPESCRIPT](https://img.shields.io/badge/Typescript-black?style=for-the-badge&logo=typescript)
![TAILWIND](https://img.shields.io/badge/tailwind-black?style=for-the-badge&logo=tailwindcss)
![PRISMA](https://img.shields.io/badge/prisma-black?style=for-the-badge&logo=prisma)
![DOCKER](https://img.shields.io/badge/docker-black?style=for-the-badge&logo=docker)
[![VERCEL](https://img.shields.io/badge/vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://food-ordering-ten.vercel.app)

## Food Ordering App using NextJs, Docker and Prisma

### **Deployed on VERCEL** : [Food Ordering](https://food-ordering-ten.vercel.app)

The app is meant to simulate making table reservations and placing orders at a restaurant.

### Mockup

<img src="./public/preview-CA.png" alt="app preview" width="700" height="400"/>

## User persona

As a restaurant owner, I want my waiters to be able to place client's food orders efficiently.
They should be able to access all the food and drinks available in the menu and place orders so the kitchen staff know what they need to prepare.
In order to place orders or make reservations user has to login to the app with their credentials.They can use either google authentication or a custom email address.

Each order will include an unique order id, the table number, the date, the logged in waiter/user email, the order contents and the total cost.
After the waiter adds all the items of the order in the cart he will have a button to place the order to the kitchen. They can always edit the orders until the order gets paid.

The order will be added to the order list database and a status will be displayed (WAITING CONFIRMATION, PREPARING, READY, PAYED).
All the orders can be seen in a separate section available just for logged in users.
The waiters will be able to finalise the bill to the clients upon request by pressing the PAY button on each order. This will trigger a confirmation message and if continued will change the status of the order to "PAYED".

## Description

The app is meant to be a web app for a restaurant business where clients can place orders online and see the restaurant's menu and find out more about the business. 

Staff can login to the app and make table reservations inside the restaurant. Orders can be previewed once the staff logs in the app.

NextJS and Typescript has been used for both frontend and backend. Tailwind CSS has been used for styling along Lucide React and React Icons for icons. The app employs NextAuth for handling login via Google.

Prisma has been used to create the database for products, users and managing table reservations and placing orders.

Docker was used initially in development to host a POSTGRESQL database locally. Vercel was used as a hosting platform for the app and for a production database.

## Using the app

1. First, run the docker engine in windows
2. In your terminal browse to docker folder

```bash
cd src/docker
```

3. Run docker

```bash
docker compose up
```

4. Checking the prisma database in the browser

```bash
npx prisma studio
```

5. Run you development server

```bash
npm run dev
```
