import React, { useEffect } from 'react';
import "./Posts.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import SearchList from '@/Components/ListCard/SearchList';
import {FilteredPosts} from '@/Interfaces/PostsInterfaces';
import {set_empty_posts, add_fav_post,get_types_list, remove_fav_post, get_favorites_posts, get_operation_posts } from "@/redux/actions/posts";
import rentHouse from '@/assets/logo.svg';
import CompleteSearch from '@/Components/Search/CompleteSearch';
import Empty from '@/Components/Errors/Empty';

interface SearchPostsProps {
    filtered_posts: FilteredPosts | null;
    set_empty_posts: () => void;
    get_favorites_posts:()=>void;
    types_list:{ type: string }[]  | null;
}

const SearchPosts: React.FC<SearchPostsProps> = ({
    filtered_posts,
    set_empty_posts,
    get_favorites_posts,
    types_list
}) => {
    
    
    

    useEffect( ()  =>  {
        get_favorites_posts()
        set_empty_posts()
        get_types_list()
    },[])

    return (
        <Layout>
            <Navbar/>
            <CompleteSearch navigate_direction={'/search'} types_list={types_list? types_list:null} />
            {filtered_posts && filtered_posts.results.length > 0 ?  (
                <SearchList 
                aditional_classname='ad_search'
                posts={filtered_posts.results}
                />
                ):(
                    
                    filtered_posts && filtered_posts.results.length === 0 ? 
                    (
                        <Empty text={'No hay propiedades disponibles'}/>
                        ):(
                        <>    
                        <h1 className='title-search'>Comenza la busqueda</h1>
                        <img src={rentHouse} alt='casa en venta o alquiler' className='back-image'/>
                        </>
                    )
                
            )}
        </Layout>
    )
};

const mapStateToProps = (state:RootState) => ({
    filtered_posts: state.posts.filtered_posts_list,
    types_list: state.posts.types_list,
})

export default connect(mapStateToProps, {
    add_fav_post,
    set_empty_posts,
    remove_fav_post,
    get_favorites_posts,
    
    get_types_list,
})(SearchPosts);