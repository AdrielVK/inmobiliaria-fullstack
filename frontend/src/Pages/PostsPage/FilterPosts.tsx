import React, { useEffect } from 'react';
import "./Posts.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import SearchList from '@/Components/ListCard/SearchList';
import {FilteredPosts} from '@/Interfaces/PostsInterfaces';
import { add_fav_post, remove_fav_post, get_favorites_posts } from "@/redux/actions/posts";
import Empty from '@/Components/Errors/Empty';

interface FilterPostsProps {
    filtered_posts: FilteredPosts | null;
    
    get_favorites_posts:()=>void;
}

const FilterPosts: React.FC<FilterPostsProps> = ({
    filtered_posts,
    
    get_favorites_posts
}) => {
    
    useEffect( ()  =>  {

        get_favorites_posts()
    },[])

    return (
        <Layout>
            <Navbar/>
            {filtered_posts && filtered_posts.results.length > 0 ?  (
                <SearchList 
                    
                    posts={filtered_posts.results}
                />
            ):(
                <Empty text={'No hay propiedades disponibles'}/>
            )}
        </Layout>
    )
};

const mapStateToProps = (state:RootState) => ({
    filtered_posts: state.posts.filtered_posts_list
})

export default connect(mapStateToProps, {
    add_fav_post,
    remove_fav_post,
    get_favorites_posts,
})(FilterPosts);