import React from "react";
import ListCard from "./ListCard";
import { connect } from "react-redux";
import { RootState } from "@/redux/reducers";
import { add_fav_post, remove_fav_post, get_favorites_posts } from "@/redux/actions/posts";
import { Post } from "@/Interfaces/PostsInterfaces";

interface SearchListProps {
    posts: Post[];
    add_fav_post: (id: number) => void;
    remove_fav_post: (id: number) => void;
    get_favorites_posts: () => void;
    aditional_classname?: string;
    
}

const SearchList: React.FC<SearchListProps> = ({ aditional_classname,posts,add_fav_post, remove_fav_post, get_favorites_posts }) => {
    return (
        <div className={`max-cont-list ${aditional_classname}`}>
            <ul className='ul-list'>
                {posts && posts.map((post, index) => (
                    <ListCard
                        index={post.id}
                        
                        key={index}
                        data={post}
                        add_fav_post={add_fav_post}
                        remove_fav_post={remove_fav_post}
                        get_favorites_posts={get_favorites_posts}
                    />
                ))}
            </ul>
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    // mapStateToProps if needed
});

export default connect(mapStateToProps, {
    add_fav_post,
    remove_fav_post,
    get_favorites_posts
})(SearchList);
