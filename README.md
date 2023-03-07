XIAO ZHANG
SCOTT CHEN
STEPHANE LUBENDO

Breakdown of Work:

Example below:
March 7th (First Sprint Complete)

Xiao Zhang:
I worked on the following tasks:

1. post.service.mock.ts: add some functions to use
2. post.controller: add some routes to:
   1) get /posts/:id
   2) get /posts/:id/delete
   3) post /posts
   4) get /search
3. add search.controller
4. change the ejs files in posts and search

Scott Chen:
I worked on the following tasks:

1. passport authentication
    - created local strategy
    - implemented authentication.middleware
2. authentication.controller:
    - implemented get and post /login routes
3. Implemented get /search route
    - created view models for users and posts
    - created search.controller

I also needed to research on Google the following things:

1. Create and set up Redis

Stephane Lubendo:
I worked on the following tasks:

1. I created the get posts feed - This task is responsible for showing the feed of all following and current user.
2. Created the logout function - This task is responsible for logging a user out.
3. Worked on register user. Created a function in AuthServices that creates user. - This task is responsible for creating a new user. (Still need to implement prisma etc)
4. Worked on the like function create a new array in database and new function in post service - This task is responsible for toggling the likes by users.
