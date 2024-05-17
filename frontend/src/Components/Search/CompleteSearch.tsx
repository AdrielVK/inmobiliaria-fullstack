import React, { useState } from "react";
import './search.css'
import searchIcon from '@/assets/search.svg'
import Select from "react-select";
import { filter_posts } from "@/redux/actions/posts";
import { RootState } from "@/redux/reducers";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

interface CompleteSearchProps {
    types_list: { type: string }[]  | null;
    filter_posts: (filterParams:any) => void;
    navigate_direction: string;
    
}

const CompleteSearch: React.FC<CompleteSearchProps> = ({
    types_list,
    filter_posts,
    
    navigate_direction
}) => {
    
    const [formData, setFormData] = useState({
        types: '',
        operation: '',
        city: '',
        price__gte: '',
        price__lte: '',
        province: '',
        street: '',
        services: '',
        currency_price: '',
    })

    const {city,price__gte,price__lte,province,street} = formData

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate();
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        filter_posts(formData)
        navigate(`${navigate_direction}`);
    }

    const options_currency:Option[] = [
        {value:'ARS', label:'ARS'},
        {value:'USD', label:'USD'},
        {value:'OTHER', label:'OTHER'},
    ]

    const options_services:Option[] = [
        {value:'electricity', label:'Electricidad'},
        {value:'gas', label:'Gas'},
        {value:'water', label:'Agua'},
        {value:'sewer', label:'Cloaca'},
        {value:'care', label:'Cuidado'},
        {value:'maintenance', label:'Mantenimiento'},
    ]

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
        <form className="form-search-deep" onSubmit={(e) => {onSubmit(e)}}>
            <input 
            type="text" 
            className="item-search-deep ext" 
            placeholder="Ciudad"
            id='city'
            value={city}
            name='city'
            onChange={e=>onChange(e)}
            />
            <input 
            type="number" 
            className="item-search-deep" 
            placeholder="Precio maximo"
            id='price__gte'
            value={price__gte}
            name='price__gte'
            onChange={e=>onChange(e)}
            />
            <input 
            type="number" 
            className="item-search-deep" 
            placeholder="Precio minimo"
            id='price__lte'
            value={price__lte}
            name='price__lte'
            onChange={e=>onChange(e)}
            />
            <input 
            type="text" 
            className="item-search-deep" 
            placeholder="Provincia"
            id='province'
            value={province}
            name='province'
            onChange={e=>onChange(e)}
            />
            <input 
            type="text" 
            className="item-search-deep" 
            placeholder="Calle"
            id='province'
            value={street}
            name='street'
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
                name="services"
                options={options_services}
                onChange={
                    (newValue) => {
                        // tu lógica aquí
                        const values = newValue.map(option => option.value)
                        setFormData({...formData, services: values.join(',') })
                        
                    }
                }
                placeholder="Servicios"
                className="drop-menu-type-deep"
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
                name="currency_price"
                options={options_currency}
                onChange={
                    (newValue) => {
                        // tu lógica aquí
                        const values = newValue.map(option => option.value)
                        setFormData({...formData, currency_price: values.join(',') })
                        
                    }
                }
                placeholder="Moneda"
                className="drop-menu-type-deep"
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
                className="drop-menu-type-deep"
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
            <button className="search-icon-deep" type='submit'>
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
 })(CompleteSearch);
