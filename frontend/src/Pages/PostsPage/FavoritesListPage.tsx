import React, { useEffect } from 'react';
import "./Posts.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import SearchList from '@/Components/ListCard/SearchList';
import {FilteredPosts} from '@/Interfaces/PostsInterfaces';
import { get_favorites_posts } from '@/redux/actions/posts';
import Empty from '@/Components/Errors/Empty';


interface FavoritesPostsProps {
    favorites_posts: FilteredPosts | null;
    get_favorites_posts: () => void;
    
    
}

const FavoritesPostsPage: React.FC<FavoritesPostsProps> = ({
    favorites_posts,
    get_favorites_posts,
    
    
}) => {

    useEffect(()=>{
        get_favorites_posts()
    },[])

    return (
        <Layout>
            <Navbar/>
            {favorites_posts && favorites_posts.results.length > 0 ? (
                
                    
                <>
                <h1 className='title-search favorite'>Tus favoritos</h1>
                <SearchList posts={favorites_posts.results}/>
                </>
                    
                    
                
            ) : (   
                <Empty text={'No tienes favoritos aun'}/>
            )}  
        </Layout>
    )
};

const mapStateToProps = (state:RootState) => ({
    favorites_posts: state.posts.favorites_posts_list
});

export default connect(mapStateToProps, {
    get_favorites_posts,
    
})(FavoritesPostsPage);