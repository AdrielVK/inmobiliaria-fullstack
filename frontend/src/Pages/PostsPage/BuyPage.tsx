import React, { useEffect } from 'react';
import "./Posts.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import SearchList from '@/Components/ListCard/SearchList';
import {FilteredPosts} from '@/Interfaces/PostsInterfaces';
import { add_fav_post,get_types_list, remove_fav_post, get_favorites_posts, get_operation_posts } from "@/redux/actions/posts";
import Empty from '@/Components/Errors/Empty';
import DeepSearch from '@/Components/Search/DeepSearch';

interface BuyPostsProps {
    filtered_posts: FilteredPosts | null;
    get_operation_posts:(operation:string) => void;
    get_favorites_posts:()=>void;
    types_list:{ type: string }[]  | null;
}

const BuyPosts: React.FC<BuyPostsProps> = ({
    filtered_posts,
    get_operation_posts,
    get_favorites_posts,
    types_list
}) => {
    
    
    const operation = 'sale'
    

    useEffect( ()  =>  {
        get_favorites_posts()
        get_operation_posts(operation)
        get_types_list()
    },[])

    return (
        <Layout>
            <Navbar/>
            <DeepSearch navigate_direction={'/filter/sale'} types_list={types_list? types_list:null} operation={'sale'}/>
            <h1 className='title-search'>Propiedades en venta</h1>
            {filtered_posts && filtered_posts.results.length > 0 ?  (
                <SearchList 
                    aditional_classname='ad_search'
                    posts={filtered_posts.results}
                />
            ):(
                <Empty text={'No hay propiedades disponibles'}/>
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
    remove_fav_post,
    get_favorites_posts,
    get_operation_posts,
    get_types_list,
})(BuyPosts);