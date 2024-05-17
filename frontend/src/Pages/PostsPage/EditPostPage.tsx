import React, { useEffect, useState } from 'react';
import "./Posts.css";
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import Navbar from '@/Components/Navbar/Navbar';
import Layout from '@/Components/Layouts/Layout';
import { PostDetail } from '@/Interfaces/PostsInterfaces';
import { User } from '@/Interfaces';
import { load_user } from '@/redux/actions/auth';
import { edit_price, edit_operation,edit_num_flat,edit_id_department,edit_title,edit_status, get_property, get_types_list, edit_type } from '@/redux/actions/posts';
import { useParams } from 'react-router';
import Select from "react-select";
import type { SingleValue} from 'react-select';


interface EditPostProps{
    types_list: { type: string }[]  | null;
    post: PostDetail | null
    user: User | null;
    loading_posts: boolean;
    load_user: ()=>void;
    isAuthenticated: boolean;
    edit_title: (uid:string, new_title:string) => void;
    get_property: (uid:string|undefined) => void;
    edit_status: (uid:string, status:string) => void;
    edit_type: (uid:string, type:string) => void;
    edit_operation : (uid:string, operation:string) => void;
    edit_num_flat: (uid:string, num_flat:number) => void;
    edit_price: (uid:string, price:number) => void;
    edit_id_department : (uid:string, id_department:string) => void
}

const EditPostPage : React.FC<EditPostProps> = ({
    post,
    user,
    loading_posts,
    load_user,
    isAuthenticated,
    edit_title,
    get_property,
    edit_status,
    edit_type,
    edit_operation,
    edit_id_department,
    edit_price,
    edit_num_flat,
}) => { 
    
    interface Option {
        label: string;
        value: string;
    }

    

    const options_operation: Option[] = [
        {value:'rent', label:'Alquiler'},
        {value:'sale', label:'Venta'},
        {value:'audiction',label: 'Remate'},
        {value:'others',label: 'Otro'},
    ]

    const [isDept, setIsDept] = useState(false)

    const options: Option[] = [
        {value:'casa', label:'Casa'},
        {value:'casa_duplex', label:'Casa Duplex'},
        {value:'casa_triplex',label: 'Casa triplex'},
        {value:'departamento',label: 'Departamento'},
        {value:'monoambiente',label: 'Monoambiente'},
        {value:'departamento piso', label:'Departamento piso'},
        {value:'departamento penthouse', label:'Departamento penthouse'},
        {value:'departamento semipiso', label:'Departamento semipiso'},
        {value:'departamento duplex', label:'Departamento duplex'},
        {value:'departamento triplex', label:'Departamento triplex'},
        {value:'ph', label:'Ph'},
        {value:'oficina',label: 'Oficina'},
        {value:'consultorio',label: 'Consultorio'},
        {value:'quinta',label: 'Quinta'},
        {value:'chacra',label: 'Chara'},
        {value:'galpon',label: 'Galpon'},
        {value:'deposito',label: 'Deposito'},
        {value:'campo', label:'Campo'},
        {value:'hotel', label:'Hotel'},
        {value:'fondo de comercio', label:'Fondo de comercio'},
        {value:'edificio',label: 'Edificio'},
        {value:'cochera',label: 'Cochera'},
        {value:'otros', label:'Otros'}
    ];

    const onChange = (e:React.ChangeEvent<HTMLInputElement>, fx:(p:string )=>void) => {
        if (e.target.value != undefined){

            fx(e.target.value)
        }
    };

    const [editTitle, setEditTitle] = useState(false)
    const params = useParams();
    const uid = params.uid

    const submit_title:React.MouseEventHandler<HTMLParagraphElement>  = (e) => {
        e.preventDefault()
        if (post && title != post.property.title){

            edit_title(post.property.uid,title)
        }
        handleEdit();
    }

    const onChangeSelectOperation = (value:SingleValue<Option>)=>{
        if ( value && value != operation){
            setOperation(value)
        }
    }

    const onChangeSelect = (value:SingleValue<Option>)=>{
        if ( value && value != type){
            setType(value)
        }
    }

    const submit_status= () => {
        if (post){

            edit_status(post.property.uid, post.property.status)
        }
    }

    useEffect(() => {
        get_types_list()
        get_property(uid)
        defineDept()
    },[])
    

    const defineDept = () => {
        const rangeValues = options.slice(3,11).map(option => option.value)
        if (type && rangeValues.includes(type.value)){
            setIsDept(true)
        } else{
            setIsDept(false)
        }
    }

    
    useEffect(() => {
        if (post) {
            setTitle(post.property.title);
            setType({ value: post.property.type, label: post.property.type });
            setOperation({ value: post.property.operation, label: post.property.operation });
            setIdDept(post.property.id_department)
            setPrice(post.property.price)
        }
        
    }, [post]);

    const [title, setTitle] = useState<string>(post? post.property.title:'')
    const [type, setType] = useState<Option >(post? {value:post.property.type, label:post.property.type} : {value:'otros', label:'Otros'})
    const [operation, setOperation] = useState<Option >(post? {value:post.property.operation, label:post.property.operation} : {value:'others', label:'Otro'})
    const [numFlat, setNumFlat] = useState<undefined | number>(post? post.property.num_flat : undefined)
    const [idDept, setIdDept] = useState<undefined | string>(post? post.property.id_department : undefined)
    const [price, setPrice] = useState<number>(post? post.property.price : 0)
    
    
    useEffect(() => {
        defineDept()
    }, [post, type])

    const onSubmitOperation = () => {
        if (post && type.value != post.property.operation){
            edit_operation(post.property.uid, operation.value)
        }
    }

    const onSubmitType = () => {
        if (post && type.value != post.property.type){

            edit_type(post.property.uid, type.value)
        }
    }

    const submit_id_dept = () => {
        if (post && idDept && idDept != post.property.id_department){
            edit_id_department(post.property.uid, idDept)
        }
    }

    const submit_num_flat = () => {
        if (post && numFlat && numFlat != post.property.num_flat){

            edit_num_flat(post.property.uid, numFlat)
        }
    }
    const submit_price = () => {
        if (post && price != post.property.price){
            edit_price(post.property.uid, price)

        }
    }

    const handleEdit = () => {
        
        setEditTitle(!editTitle)
    }

    return(


        <Layout>
            <Navbar/>
            {
                post && isAuthenticated && (user?.id === post?.property.author.id) ?
                <div className='container-edit'>

                    <div className='title-edit'>
                        {
                            editTitle?
                                <label htmlFor='title' className='label-input-edit-post'>
                                    <p className='title-edit-p'>Titulo:</p>
                                    <input
                                    id='title'
                                    value={title}
                                    name='title'
                                    type='text'
                                    onChange={e=>onChange(e, setTitle)}
                                    required
                                    className='input-string edit-t'
                                    placeholder='Titulo'
                                    />
                                    <p className='edit-p'  onClick={submit_title}>Guardar</p>

                                </label>
                                
                                :
                                <>
                                <p className='title-edit-p'>Titulo:</p>
                                <p>{post?.property.title}</p>
                                <p className='edit-p' onClick={handleEdit}>Editar</p>
                            
                            </>
                        }
                    </div>
                    <div className='type-edit'>

                    
                        <Select
                            value={type}
                            options={options}
                            name="operation"
                            onChange={onChangeSelect}                
                            placeholder="Tipo de propiedad"
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
                        {
                            post.property.type === type.value ?
                            <span className='edit-type'></span>
                            :
                            <p className='edit-type' onClick={onSubmitType}>Guardar</p>
                        
                        }
                    </div>
                    <div className='type-edit'>

                    
                        <Select
                            value={operation}
                            options={options_operation}
                            name="type"
                            onChange={onChangeSelectOperation}                
                            placeholder="Tipo de propiedad"
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
                        {
                            post.property.operation === operation.value ?
                            <span className='edit-type'></span>
                            :
                            <p className='edit-type' onClick={onSubmitOperation}>Guardar</p>
                        
                        }
                    </div>
                    <div className='status-edit'>
                        <button onClick={submit_status} className={post?.property.status === 'draft' ? 'button-edit-publisher':'button-edit-drafter'}>{post?.property.status === 'draft' ? 'Publicar':'Ocultar' }</button>
                    </div>
                    {
                        isDept ?
                        <>
                        <div className='type-edit'>
                            <label htmlFor='num_flat' className='label-input-edit-post'>
                                <p className='title-edit-p'>Piso:</p>
                                <input
                                    id='num_flat'
                                    value={numFlat}
                                    name='num_flat'
                                    type='number'
                                    onChange={e=>{
                                        if (e.target.value != undefined && !isNaN(parseInt(e.target.value))){
                                            setNumFlat(parseInt(e.target.value))
                                        }
                                    }}
                                    
                                    className='input-string edit-t'
                                    placeholder={post.property.num_flat?`${post.property.num_flat}`:'0'}
                                />
                                <p className='edit-p'  onClick={submit_num_flat}>Guardar</p>

                            </label> 
                        </div>
                        <div className='type-edit'>
                            <label htmlFor='id_dept' className='label-input-edit-post'>
                                <p className='title-edit-p'>Identificador dto:</p>
                                <input
                                    id='id_dept'
                                    value={idDept}
                                    name='num_flat'
                                    type='text'
                                    onChange={e=>onChange(e, setIdDept)}
                                    
                                    className='input-string edit-t'
                                    placeholder={idDept?`Identificador del departamento ${idDept}`:`Ingrese el identificador del departamento`}
                                />
                                <p className='edit-p'  onClick={submit_id_dept}>Guardar</p>

                            </label>
                        </div>
                        
                        </>
                        :
                        <></>
                    }
                    <div className='type-edit'>
                        <label htmlFor='price' className='label-input-edit-post'>
                            <p className='title-edit-p'>Precio:</p>
                            <input
                                id='price'
                                value={price}
                                name='price'
                                type='number'
                                onChange={e=>{
                                    if (e.target.value != undefined && !isNaN(parseInt(e.target.value)) && parseInt(e.target.value) > 0){
                                        setPrice(parseInt(e.target.value))
                                    }
                                }}
                                
                                className='input-string edit-t'
                                placeholder={`${post.property.price}`}
                            />
                            <p className='edit-p'  onClick={submit_price}>Guardar</p>

                        </label>
                    </div>
                </div>
                :
                <div  className='title-edit'>
                    No tienes permisos...
                </div>


            }
        </Layout>
    )


};

const mapStateToProps = (state:RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading_posts: state.posts.loading_posts,
    post: state.posts.post,
})

export default connect(mapStateToProps, {
    load_user,
    edit_title,
    get_property,
    edit_status,
    edit_type,
    edit_operation,
    edit_id_department,
    edit_num_flat,
    edit_price,
})(EditPostPage)