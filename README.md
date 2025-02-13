Hi! I'm glad to represent my blog application

If you want to start it, clone 'blog-app' repository. You can see two folders: 'client' and 'server'.
1. RUNNING SERVER
   1.1. Move to the 'server' folder.
   1.2. Run 'npm install'.
   1.3. Create .env file and past there environment variables:
        PORT=5000
        DB_URL=mongodb+srv://vadimvlad20032002:Cwt7g6IWFJJ3D3OG@blog-app.t71bf.mongodb.net/?retryWrites=true&w=majority&appName=blog-app
        JWT_ACCESS_SECRET=jwtsecretkey
        JWT_REFRESH_SECRET=jwtrefsecretkey
   1.4. Run server by 'npm run dev' command.
   1.5. You have to see 'Listening port 5000' message in console.

2. RUNNING CLIENT
   2.1. Move to the 'client' folder.
   2.2. Run 'npm install'.
   2.3. Run 'npm start'. 
   2.4. You have to see the site on browser.
