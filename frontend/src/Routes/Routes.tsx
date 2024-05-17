import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/UsersPage/LoginPage";
import UserPage from "../Pages/UsersPage/UserPage";
import RegisterPage from "@/Pages/UsersPage/RegisterPage";
import ActivatePage from "@/Pages/UsersPage/ActivatePage";
import Error404 from "@/Pages/Error/Error404";
import ResetPassword from "@/Pages/UsersPage/ResetPassword";
import ProfilePage from "@/Pages/UsersPage/ProfilePage";
import RegisterPublisherPage from "@/Pages/UsersPage/RegisterPublisherPage";
import FilterPosts from "@/Pages/PostsPage/FilterPosts";
import FavoritesPostsPage from "@/Pages/PostsPage/FavoritesListPage";
import RentPage from "@/Pages/PostsPage/RentPage";
import BuyPage from "@/Pages/PostsPage/BuyPage";
import SearchPage from "@/Pages/PostsPage/SearchPage";
import DetailPost from "@/Pages/PostsPage/DetailPost";
import MessagesInbox from "@/Pages/MessagesPage/MessagesInbox";
import ChatPage from "@/Pages/MessagesPage/ChatPage";
import CreatePostPage from "@/Pages/PostsPage/CreatePostPage";
import EditPostPage from "@/Pages/PostsPage/EditPostPage";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "*", element: <Error404/>},
            {path: "/", element: <HomePage/>},
            {path: "/login", element: <LoginPage/>},
            {path: "/filter/search", element: <FilterPosts/>},
            {path: "user", element: <UserPage/>},
            {path: "/register", element: <RegisterPage/>},
            {path: "/userprofile", element: <ProfilePage/>},
            {path: "/activate/:uid/:token", element: <ActivatePage/>},
            {path: "/register/publisher", element: <RegisterPublisherPage/>},
            {path: "/password/reset/confirm/:uid/:token", element: <ResetPassword/>},
            {path: "/favorites", element: <FavoritesPostsPage/>},
            {path: "/filter/rent", element: <RentPage/>},
            {path: "/filter/sale", element: <BuyPage/>},
            {path: "/search", element: <SearchPage/>},
            {path: "/detail/:uid", element: <DetailPost/>},
            {path: "messages", element: <MessagesInbox/>},
            {path: "messages/chat/:id_sender", element: <ChatPage/>},
            {path: "/post", element:<CreatePostPage/>},
            {path: "edit/:uid", element:<EditPostPage/>}
        ],
    }
])