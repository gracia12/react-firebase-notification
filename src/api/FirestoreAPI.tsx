import { firestore, auth } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import moment from "moment";

const postsRef: any = collection(firestore, "posts");
const userRef: any = collection(firestore, "users");
const likeRef: any = collection(firestore, "likes");
const commentsRef: any = collection(firestore, "comments");
const connectionRef: any = collection(firestore, "connections");
const notificationCollection: any = collection(firestore, "notification");

export const postStatus = (object: any): void => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getStatus = (setAllStatus: any): void => {
  const q: any = query(postsRef, orderBy("timeStamp"));
  onSnapshot(q, (response: any) => {
    setAllStatus(
      response.docs.map((docs: any) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getAllUsers = (setAllUsers: any): void => {
  onSnapshot(userRef, (response: any) => {
    setAllUsers(
      response.docs.map((docs: any) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleStatus = (setAllStatus: any, id: string): void => {
  const singlePostQuery: any = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response: any) => {
    setAllStatus(
      response.docs.map((docs: any) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getUserByID = (userEmail: string, setCurrentProfile: any): void => {
  try {
    const currentUserQuery: any = query(userRef, where("email", "==", userEmail));
    onSnapshot(currentUserQuery, (response: any) => {
      setCurrentProfile(
        response.docs.map((docs: any) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const getSingleUser = (setCurrentUser: any, email: string): void => {
  const singleUserQuery: any = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response: any) => {
    setCurrentUser(
      response.docs.map((docs: any) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object: any): void => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err: any) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser: any): void => {
  onSnapshot(userRef, (response: any) => {
    setCurrentUser(
      response.docs
        .map((docs: any) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item: any) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userID: string, payload: any): void => {
  const userToEdit: any = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export const getLikesByUser = (userId: string, postId: string, setLiked: any, setLikesCount: any): void => {
  try {
    const likeQuery: any = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response: any) => {
      const likes: any = response.docs.map((doc: any) => doc.data());
      const likesCount: number = likes?.length;

      const isLiked: boolean = likes.some((like: any) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const postComment = (
  recipientUserId: string,
  postData: any,
  userId: string,
  postId: string,
  comment: string,
  timeStamp: any,
  currentUserName: string
): void => {
  try {
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name: currentUserName,
    });

    if (userId != recipientUserId) {
      const notificationData: any = {
        userName: auth.currentUser.displayName,
        recipientUserId: recipientUserId,
        senderUserEmail: auth.currentUser.email,
        senderUserId: auth.currentUser.uid,
        type: "comment",
        postID: postId,
        postData: postData,
        timestamp: moment().format(),
        isRead: false,
      };

      addDoc(notificationCollection, notificationData);
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const getComments = (postId: string, setComments: any): void => {
  try {
    const singlePostQuery: any = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response: any) => {
      const comments: any = response.docs.map((doc: any) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const updatePost = (id: string, status: string, postImage: string): void => {
  const docToUpdate: any = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Post has been updated!");
  } catch (err: any) {
    console.log(err);
  }
};

export const deletePost = (id: string): void => {
  const docToDelete: any = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err: any) {
    console.log(err);
  }
};

export const addConnection = (userId: string, targetId: string): void => {
  try {
    const connectionToAdd: any = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success("Connection Added!");
  } catch (err: any) {
    console.log(err);
  }
};

export const getConnections = (userId: string, targetId: string, setIsConnected: any): void => {
  try {
    const connectionsQuery: any = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response: any) => {
      const connections: any = response.docs.map((doc: any) => doc.data());

      const isConnected: boolean = connections.some(
        (connection: any) => connection.userId === userId
      );

      setIsConnected(isConnected);
    });
  } catch (err: any) {
    console.log(err);
  }
};

export const likePost = (
  userId: string,
  recipientUserId: string,
  postData: any,
  postId: string,
  liked: boolean
): void => {
  try {
    const docToLike: any = doc(likeRef, `${userId}_${postId}`);
    const docToNotify: any = doc(
      notificationCollection,
      `${recipientUserId}_${postId}`
    );

    if (liked) {
      deleteDoc(docToLike);
      deleteDoc(docToNotify);
    } else {
      setDoc(docToLike, { userId, postId });

      if (userId !== recipientUserId) {
        const notificationData: any = {
          userName: auth.currentUser.displayName,
          recipientUserId: recipientUserId,
          senderUserEmail: auth.currentUser.email,
          senderUserId: auth.currentUser.uid,
          type: "like",
          postID: postId,
          postData: postData,
          timestamp: moment().format(),
          isRead: false,
        };
        setDoc(docToNotify, notificationData);
      }
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const getNotifications = async (userId: string, setNotifications: any): void => {
  const getNotifQuery: any = query(
    notificationCollection,
    where("recipientUserId", "==", userId),
    orderBy("timestamp", "desc")
  );
  onSnapshot(getNotifQuery, (response: any) => {
    setNotifications(
      response.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const readNotifications = async (id: string): void => {
  const docToUpdate: any = doc(notificationCollection, id);

  updateDoc(docToUpdate, { isRead: true });
};
