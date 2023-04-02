import express from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction, Router } from "express";
import IComment from "./src/interfaces/comment.interface";
// import { checkPostPrivilege, ensureAuthenticated } from "../src/middleware/authentication.middleware";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// getAllPosts
app.get("/posts", async (req: Request, res: Response) => {
  try {
    const id = 1; // billgates
    // const username = req.user.username;
    const userData = await prisma.users.findUnique({
      where: { id: id },
      include: { following: true },
    });
    // PostViewModel this
    console.log("GATEEEESS", userData);

    const allPosts = await prisma.posts.findMany({
      where: {
        OR: [{ userId: { in: userData.following.map((u) => u.id) } }, { userId: userData.id }],
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: { commentList: true },
    });

    // get usernames from allPosts
    const allUsernames = await Promise.all(
      allPosts.map(async (post) => {
        return await prisma.users.findUnique({
          select: {
            username: true,
          },
          where: { id: post.userId },
        });
      })
    );
    console.log("USERNAMES", allUsernames);

    // get number of comments for each post
    const eachPostCommentLength = allPosts.map((post) => post.commentList.length);
    console.log("LENGTH", eachPostCommentLength);

    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ Error: "Can't get posts." });
  }
});

// getPostById
app.get("/posts/:id", async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);
    const post = await prisma.posts.findUnique({
      where: { postId: postId },
      include: { commentList: true },
    });

    // get all comments of the post
    const comments = post.commentList;
    comments.sort((a: IComment, b: IComment) => b.createdAt.getTime() - a.createdAt.getTime());
    console.log("SORTEDCOMMENTS", comments);

    // get usernames from each comment
    const allUsernames = await Promise.all(
      comments.map(async (comment) => {
        return await prisma.users.findUnique({
          select: {
            username: true,
          },
          where: { id: comment.userId },
        });
      })
    );
    console.log("USERNAMES", allUsernames);

    // const getCommentsById = await prisma.comments.findMany({ where: { postId: postId },  orderBy: { createdAt: 'desc' }  });
    // const getUsernameById = await prisma.users.findUnique({ where: { id: post.userId } })[0].username;

    res.json(post);
  } catch (error) {
    res.status(500).json({ Error: "Can't get post." });
  }
});

// createComment
app.post("/posts/:id/comment", async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);
    const { userId, message } = req.body;
    const addCommentToPost = await prisma.comments.create({
      data: {
        postId: postId,
        userId: userId,
        message: message,
      },
    });
    res.json(addCommentToPost);
  } catch {
    res.status(500).json({ Error: "Unable to create comment." });
  }
});

// createPost
app.post("/posts", async (req: Request, res: Response) => {
  try {
    const { userId, message } = req.body;
    const addPost = await prisma.posts.create({
      data: {
        userId: userId,
        message: message,
        likes: 0,
      },
    });
    res.json(addPost);
  } catch (error) {
    res.status(500).json({ Error: "Can't get all posts." });
  }
});

// deletePost
app.get("/posts/:id/delete", async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.id);
    // delete comments associated with post
    // delete likes associated with post
    const deletePost = await prisma.posts.delete({ where: { postId: postId } });
    res.json(deletePost);
  } catch (error) {
    res.status(500).json({ Error: "Unable to delete the post." });
  }
});

// search
app.get("/search", async (req: Request, res: Response) => {
  try {
    const searchFor = String(req.query.query);
    const searchUser = await prisma.users.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: searchFor,
            },
          },
          {
            lastName: {
              contains: searchFor,
            },
          },
        ],
      },
    });

    const searchPost = await prisma.posts.findMany({
      where: {
        message: {
          contains: searchFor,
        },
      },
    });

    res.json(searchUser);
    res.json(searchPost);
  } catch (error) {
    res.status(500).json({ Error: "Unable to search." });
  }
});

// changeFollow
app.get("/search/follow", async (req: Request, res: Response) => {
  const currentUserId = 1;
  const followingUserId = 3;
  //   const currentUserId = req.user.id;
  //   const followingUserId = +req.query.userId;

  // ======== check if current user is following user ===========
  const currentUser = await prisma.users.findUnique({
    where: { id: currentUserId },
    include: { following: true },
  });
  const isFollowing = currentUser.following.filter((followingUser) => followingUser.id === followingUserId);
  console.log("HUH", isFollowing);

  if (isFollowing.length === 0) {
    //===== follow user ======
    const followUser = await prisma.users.update({
      where: {
        id: currentUserId,
      },
      data: {
        following: {
          connect: { id: followingUserId },
        },
      },
    });
  } else {
    //===== follow user ======
    // first get the entire user object
    // const followingUser = await prisma.users.findUnique({
    //   where: {
    //     id: followingUserId,
    //   },
    //   include: {
    //     following: true,
    //     followers: true,
    //     liked: true,
    //   },
    // });

    // unfollow user
    const unfollowUser = await prisma.users.update({
      where: {
        id: currentUserId,
      },
      data: {
        following: {
          disconnect: { id: followingUserId },
        },
      },
    });
  }
});

app.listen(8050, () => {
  console.log("Server is running on port 8050");
});
