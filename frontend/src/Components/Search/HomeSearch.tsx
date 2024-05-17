import React, { useState } from "react";
import './search.css'
import searchIcon from '@/assets/search.svg'
import Select from "react-select";
import { filter_posts } from "@/redux/actions/posts";
import { RootState } from "@/redux/reducers";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

interface SearchHomeProps {
    types_list: { type: string }[]  | null;
    filter_posts: (filterParams:any) => void;
}

const SearchHome: React.FC<SearchHomeProps> = ({
    types_list,
    filter_posts
}) => {
    
    const [formData, setFormData] = useState({
        types: '',
        operation: '',
        city: '',
    })

    const {types,city,operation} = formData

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(types,city,operation)
        filter_posts(formData)
        navigate('/filter/search');
    }

    const options_operation:Option[] = [
        {value:'rent', label:'Alquiler'},
        {value:'sale', label:'Venta'},
        {value:'audiction', label:'Remate'},
        {value:'others', label:'Otros'}
    ]

    interface Option {
        label: string;
        value: string;
    }
    
    const options: Option[] =
    types_list?.map((item) => ({
      value: item.type,
      label: item.type,
    })) || [];
    
    /*types_list?.map((item) => ({
        return: console.log(item)
    }))*/

    

    return (
        <form className="form-search" onSubmit={(e) => {onSubmit(e)}}>
            <input 
            type="text" 
            className="item-search" 
            placeholder="¿A que ciudad queres mudarte?"
            id='city'
            value={city}
            name='city'
            onChange={e=>onChange(e)}
            />
            <Select
                isMulti
                name="operation"
                options={options_operation}
                onChange={
                    (newValue) => {
                        // tu lógica aquí
                        const values = newValue.map(option => option.value)
                        setFormData({...formData, operation: values.join(',') })
                        
                    }
                }
                placeholder="Tipo de operacion"
                className="drop-menu-type"
                styles={{
                    control: (styles) => {
                        return {
                            ...styles,
                            cursor:"pointer",
                            borderRadius:"none",
                            flex:1,

                        }
                        
                    }
                }}
            />
                
            
            <Select
                isMulti
                options={options}
                name="type"
                onChange={
                    (newValue) => {
                        // tu lógica aquí
                        const values = newValue.map(option => option.value)
                        setFormData({...formData, types: values.join(',') })
                        
                    }
                }                placeholder="Tipo de propiedad"
                className="drop-menu-type"
                styles={{
                    control: (styles) => {
                        return {
                            ...styles,
                            cursor:"pointer",
                            borderRadius:"none",
                            flex:1,

                        }
                        
                    }
                }}
            />
            <button className="search-icon" type='submit'>
                <img src={searchIcon} alt="search" />
            </button>
        </form>
    )
};

const mapStateToProps = (state:RootState) => ({
    filtered_posts_list: state.posts.filtered_posts_list
})
export default connect(mapStateToProps, {
    filter_posts
 })(SearchHome);
