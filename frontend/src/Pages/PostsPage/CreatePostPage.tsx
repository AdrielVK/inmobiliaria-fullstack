
import React, {useState, ChangeEvent, useEffect} from 'react';
import "./Posts.css";
import Layout from '@/Components/Layouts/Layout';
import { RootState } from '@/redux/reducers';
import { connect } from 'react-redux';
import { User } from '@/Interfaces';
import Select from "react-select";
import type { ActionMeta, SingleValue} from 'react-select';
import StandarBotton from '@/Components/Buttons/StandarButton';
import { check_authenticated, load_user } from '@/redux/actions/auth';
import { create_post } from '@/redux/actions/posts';
import Loading from '@/Components/Loadings/Loading';
import PostCreateModal from '@/Components/Modals/PostCreateModal';
import { PostDetail } from '@/Interfaces/PostsInterfaces';
import { Navigate, useNavigate } from 'react-router';

interface CreatePostPage {
    isAuthenticated: boolean;
    user: User | null;
    load_user: ()=>void;
    create_post: (formData:FormData)=>void;
    loading_posts: boolean;
    post: PostDetail | null ;
    msg: string | null;
    check_authenticated: () => void;
}



const CreatePostPage: React.FC<CreatePostPage> = ({
    isAuthenticated,
    user,
    load_user,
    create_post,
    loading_posts,
    msg,
    post,
    check_authenticated
}) => {

    const [terrain_sup, setTerrain_sup] = useState<number | ''>('')
    const [cover_sup, setCover_sup] = useState<number | ''>('')
    const [total_sup, setTotalsup] = useState<number | ''>('')
    const [latitude, setLatitude] = useState<number>(0)
    const [longitude, setLongitude] = useState<number>(0)
    const [antiquity, setAntiquity] = useState<number | ''>('')
    const [price, setPrice] = useState<number | ''>('')
    const [expenses, setExpenses] = useState<number | ''>('')
    const [financing, setFinancing] = useState<boolean>(false)
    const [value_feature, setValue_feature] = useState<number>(1)
    const [name_feature, setName_feature] = useState<string>('')
    const [features, setFeatures] = useState<FeatureObject[]>([])

    const addFeature = (vf:number, nf:string) => {
        const newFeature:FeatureObject = {name:nf,value:vf} 
        setFeatures(prevFeatures => [...prevFeatures, newFeature]);
    }
    
    const resetFeatures = () => {
        setFeatures([])
    }

    type FeatureObject = {
        name:string,
        value:number
    }

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (name_feature){
            addFeature(value_feature,name_feature)
        }
    };
    const [formData, setFormData] = useState({
        
        type: '',
        operation: '',
        title: '',
        currency_price: '',
        description: '',
        province:'',
        city: '',
        street: '',
        state: 'available',
        currency_expenses: '',
        id_department: '',
        services: '',
        street_number:'',
        num_flat:'',
    })
    
    const {
        state,
        title,
        description,
        province,
        city,
        street,
        id_department,
        type,
        street_number,
        num_flat,
        services,
        operation,
        currency_expenses,
        currency_price
    } = formData;

    const resetTerrainSup = () => {
        setTerrain_sup('')
    }
    const resetTotalSup = () => {
        setTotalsup('')
    }
    const resetCoverSup = () => {
        setCover_sup('')
    }
    const resetAntiquitySup = () => {
        setAntiquity('')
    }
    const resetPrice= () => {
        setPrice('')
    }
    const resetExpenses = () => {
        setExpenses('')
    }

    const onChangeNumbers = (e:React.ChangeEvent<HTMLInputElement>, valueInput:string) => {
        if (e.target.value != '' && e.target.value.length < 11){
            switch(valueInput){
                case 'value_feature':
                    if (parseFloat(e.target.value) > 0){
                        setValue_feature(parseFloat(e.target.value))
                    }
                    break
                
                case 'latitude':
                    setLatitude(parseFloat(e.target.value))
                    break
                case 'longitude':
                    setLongitude(parseFloat(e.target.value))
                    break
                
                
                default:
                    break                    
            }
        }
    };

    const onChangeNumbersPositive = (e:React.ChangeEvent<HTMLInputElement>, inputValue:string ) => {
        if ((e.target.value && !isNaN(Number(e.target.value)) && e.target.value.length < 9)){

            switch(inputValue){
                case 'terrain_sup':
                    setTerrain_sup(parseFloat(e.target.value))
                    break
                
                case 'cover_sup':
                    setCover_sup(parseFloat(e.target.value))
                    break
                case 'total_sup':
                    setTotalsup(parseFloat(e.target.value))
                    break
                case 'antiquity':
                    setAntiquity(parseFloat(e.target.value))
                    break
                case 'price':
                    setPrice(parseFloat(e.target.value))
                    break
                case 'expenses':
                    setExpenses(parseFloat(e.target.value))
                    break
                default:
                    break
            }
        }
    };

    const onChangeNumbersFields = (e:React.ChangeEvent<HTMLInputElement>, ) => {
        if ((e.target.value && !isNaN(Number(e.target.value))) || e.target.value === ''){

            setFormData({...formData, [e.target.name]: e.target.value})
        }
    };
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>, ) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const onChangeText = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };


    const handleChangeType = (value: SingleValue<OptionStrings>, actionMeta:ActionMeta<OptionStrings>) => {
        setFormData({...formData, type: value?.value != undefined ? value.value : ''})
        const rangeValues = options_type.slice(3, 11).map(option => option.value);
        if(value && rangeValues.includes(value.value)){
            
            setIsDept(true)
        } else {
            setIsDept(false)
        }
    }

    const handleChangeCurrencyPrice= (value: SingleValue<OptionStrings>, actionMeta:ActionMeta<OptionStrings>) => {
        setFormData({...formData, currency_price: value?.value != undefined ? value.value : ''})
    }

    const handleChangeCurrencyExpenses= (value: SingleValue<OptionStrings>, actionMeta:ActionMeta<OptionStrings>) => {
        setFormData({...formData, currency_expenses: value?.value != undefined ? value.value : ''})
    }

    const handleChangeState= (value: SingleValue<OptionStrings>, actionMeta:ActionMeta<OptionStrings>) => {
        setFormData({...formData, state: value?.value != undefined ? value.value : 'available'})
    }

    const handleChangeOperation = (value: SingleValue<OptionStrings>, actionMeta:ActionMeta<OptionStrings>) => {
        setFormData({...formData, operation: value?.value != undefined ? value.value : ''})
    }

    /*const handleChangeFinancig = (value: SingleValue<Option>, actionMeta:ActionMeta<Option>) => {
        setFormData({...formData, financing: value?.value != undefined ? true : false})
    }*/

    

    const [imagesForm, setImagesForm] = useState<File[] | null>(null)

    const [videoForm, setVideoForm] = useState<File|null>(null)

    const resetVideoForm = () => {
        setVideoForm(null)
    }

    const resetImagesForm = () => {
        setImagesForm(null)
        
    }

    const handleChangeFeature= (value: SingleValue<OptionStrings>, actionMeta:ActionMeta<OptionStrings>) => {
        if(value){

            setName_feature(value.value)
        }
    }
    
    const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const imagesArray = Array.from(files);
            setImagesForm(imagesArray)
        }
    };

    const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setVideoForm(file);
        }
    };

    const [isDept, setIsDept] = useState(false)

    
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        

        const formData = new FormData()
        formData.append('type', type)
        formData.append('state', state)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('services', services)
        formData.append('province', province)
        formData.append('city', city)
        formData.append('street', street)
        formData.append('street_number', street_number)
        formData.append('latitude', latitude.toString())
        formData.append('longitude', longitude.toString())
        formData.append('operation', operation)
        formData.append('price', price.toString())
        formData.append('currency_price', currency_price)
        
        if (terrain_sup){
            formData.append('terrain_sup', terrain_sup.toString())
        }
        if(num_flat){
            formData.append('num_flat', num_flat)
        }
        if(id_department){
            formData.append('id_department', id_department)
        }
        if(features){
            formData.append('features', JSON.stringify(features))
        }
        if (total_sup){
            formData.append('total_sup', total_sup.toString())
        }
        if(cover_sup){
            formData.append('cover_sup', cover_sup.toString())
        }
        if(antiquity){
            formData.append('antiquity', antiquity.toString())
        }
        if(expenses){
            formData.append('expenses', expenses.toString())
        }
        if(currency_expenses){
            formData.append('currency_expenses', currency_expenses)
        }
        if(financing){
            formData.append('financing', financing.toString())
        }
        if(imagesForm){

            for (let i = 0; i < imagesForm.length; i++) {
                formData.append('imagenes', imagesForm[i]);
            }
        }

        if(videoForm){
            formData.append('video', videoForm, videoForm.name)
        }
        create_post(formData)
        setModal(true)
        console.log(modal)
    }

    const translateFeature = (ft:string, value:number) => {
        switch(ft){
            case 'bedrooms':
                if(value > 1){
                    return 'Habitaciones'
                } else {
                    return 'Habitacion'
                }
                
            case 'toilets':
                if(value > 1){
                    return 'Tocadores'
                } else {
                    return 'Tocador'
                }
            case 'bathroom':
                if(value > 1){
                    return 'Banios'
                } else {
                    return 'Banio'
                }
            case 'environments':
                if(value > 1){
                    return 'Ambientes'
                } else {
                    return 'Ambiente'
                }
            case 'flats':
                if(value > 1){
                    return 'Pisos'
                } else {
                    return 'Piso'
                }
            case 'garage':
                if(value > 1){
                    return 'Cocheras'
                } else {
                    return 'Cochera'
                }
            default:
                return ft
        }
    }

    const options_feature:OptionStrings[] = [
        {value:'bedrooms', label:'Habitaciones'},
        {value:'toilets', label:'Tocador'},
        {value:'bathroom',label: 'Banio'},
        {value:'environments',label: 'Ambientes'},
        {value:'flats',label: 'Pisos'},
        {value:'garage', label:'Cocheras'},
        
        
        
    ]

    const options_type:OptionStrings[] = [
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
    ]

    const options_operation:OptionStrings[] = [
        {value:'rent', label:'Alquiler'},
        {value:'sale', label:'Venta'},
        {value:'audiction',label: 'Remate'},
        {value:'others',label: 'Otro'},
    ]

    

    const options_services:Option[] = [
        {value:'electricity', label:'Electricidad'},
        {value:'gas', label:'Gas'},
        {value:'water',label: 'Agua'},
        {value:'sewer',label: 'Cloaca'},
        {value:'care',label: 'Cuidado'},
        {value:'maintenance',label: 'Mantenimiento'},
    ]

    const options_currency:OptionStrings[] = [
        {value:'ARS', label:'ARS'},
        {value:'USD', label:'USD'},
        {value:'OTHER',label: 'Otro'},
    ]

    const options_state:OptionStrings[] = [
        {value:'available', label:'Disponible'},
        {value:'reserved', label:'Reservada'},
        
    ]

    interface OptionStrings {
        label: string ;
        value: string ;
    }

    interface Option {
        label: string ;
        value: string | boolean | undefined;
    }

    const [modal, setModal] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleModal = (e:React.MouseEvent) => {
        e.stopPropagation()
        setModal(!modal)
    }

    const redirect = (e:React.MouseEvent) => {
        e.stopPropagation()
        if (post){

            navigate(`/detail/${post.property.uid}`)
        }
    }
    
    useEffect(()=>{
        if (!user || isAuthenticated===false) {
            check_authenticated()
            load_user()
        }
    },[user, isAuthenticated])

    return(
        <Layout>
            {
                modal ? 
                <>
                    
                    {
                        post && msg ?
                        <PostCreateModal text={msg} text_button='Ir a la publicacion' onClose={handleModal} onNav={redirect} />
                        :
                        <>
                            {
                                msg? 
                                <PostCreateModal text={msg} text_button='Reintentar' onClose={handleModal} onNav={handleModal} />
                                :
                                <></>
                            }
                        </>
                    }
                    
                </>
                :
                <></>
            }
            {
                isAuthenticated && user?.type === "publisher"?
                (
                    
                    <form className='form-create-post' method='POST' encType='multipart/form-data' onSubmit={(e) => {onSubmit(e)}}>
                        <div className='cont-element-post-create'>
                            
                            <label htmlFor='type' className='label-input-create-post first-input'>
                            Tipo del inmueble:
                            <Select
                                id='type'
                                required
                                name='type'
                                options={options_type}
                                onChange={handleChangeType}
                                className="select-input-create-post"
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
                            </label>
                            <label htmlFor='state' className='label-input-create-post'>
                                Estado:
                                <Select
                                    id='state'
                                    required
                                    name='state'
                                    options={options_state}
                                    onChange={handleChangeState}
                                    className="select-input-create-post"
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
                            </label>

                            <label htmlFor='title' className='label-input-create-post'>
                                Titulo:
                                <input
                                id='title'
                                value={title}
                                name='title'
                                type='text'
                                onChange={e=>onChange(e)}
                                required
                                className='input-string'
                                placeholder='Titulo'
                                />
                            </label>

                            <label htmlFor='description' className='label-input-create-post'>
                                Descripcion:
                                <textarea
                                    value={description}
                                    id='description'
                                    name='description'
                                    style={{ resize: 'none' }}
                                    onChange={e=>onChangeText(e)}
                                    required
                                    className='input-text-area'
                                    placeholder='Descripcion (hasta 300 caracteres)'
                                />
                            </label>

                            

                            <label htmlFor='services' className='label-input-create-post'>
                                Servicios:
                                <Select
                                    isMulti
                                    required
                                    id='services'
                                    name='services'
                                    options={options_services}
                                    onChange={
                                        (newValue) => {
                                            // tu lógica aquí
                                            const values = newValue.map(option => option.value)
                                            setFormData({...formData, services: values.join(',') })
                                            
                                        }
                                    }
                                    className="select-input-create-post"
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
                            </label>

                            
                            <p className='subtitle-form'>Ubicacion del inmueble</p>

                            <label htmlFor='province' className='label-input-create-post'>
                                Provincia:
                                <input
                                id='province'
                                value={province}
                                name='province'
                                type='text'
                                onChange={e=>onChange(e)}
                                required
                                className='input-string'
                                placeholder='Provincia'
                                />
                            </label>

                            <label htmlFor='city' className='label-input-create-post'>
                                Ciudad:
                                <input
                                id='city'
                                value={city}
                                name='city'
                                type='text'
                                onChange={e=>onChange(e)}
                                required
                                className='input-string'
                                placeholder='Ciudad'
                                />
                            </label>

                            <label htmlFor='street' className='label-input-create-post'>
                                Calle:
                                <input
                                id='street'
                                value={street}
                                name='street'
                                type='text'
                                onChange={e=>onChange(e)}
                                required
                                className='input-string'
                                placeholder='Calle'
                                />
                            </label>
                            
                            <label htmlFor='street_number' className='label-input-create-post'>
                                Altura de la calle:
                                <input
                                id='street_number'
                                value={street_number}
                                name='street_number'
                                type='text'
                                onChange={e=>onChangeNumbersFields(e)}
                                required
                                className='input-string'
                                placeholder='Altura'
                                />
                            </label>
                            {
                                isDept ? (
                                    <>
                                    
                                    <label htmlFor='num_flat' className='label-input-create-post'>
                                        Numero de piso del departamento:
                                        <input
                                        id='num_flat'
                                        value={num_flat}
                                        name='num_flat'
                                        type='number'
                                        onChange={e=>onChangeNumbersFields(e)}
                                        className='input-string'
                                        placeholder='Numero de piso (opcional)'
                                        />
                                    </label>


                                    <label htmlFor='id_department' className='label-input-create-post'>
                                        Identificador del departamento: 
                                        <input
                                        id='id_department'
                                        value={id_department}
                                        name='id_department'
                                        type='text'
                                        onChange={e=>onChange(e)}
                                        
                                        className='input-string'
                                        placeholder='Identificador del departamento (opcional)'
                                        />
                                    </label>
                                    
                                    </>
                                ):<></>
                            }
                            <p className='subtitle-form'>Ubicacion en el mapa</p>
                            <label htmlFor='latitude' className='label-input-create-post'>

                            Coordenada Latitud:
                            <input
                            id='latitude'
                            value={latitude}
                            name='latitude'
                            type='number'
                            onChange={e=>onChangeNumbers(e, e.target.name)}
                            required
                            className='input-string'
                            placeholder='Latitud'
                            />
                            </label>

                            <label htmlFor='longitude' className='label-input-create-post'>

                            Coordenada Longitud:
                            <input
                            id='longitude'
                            value={longitude}
                            name='longitude'
                            type='number'
                            onChange={e=>onChangeNumbers(e, e.target.name)}
                            required
                            className='input-string'
                            placeholder='Longitud'
                            />
                            </label>

                            
                            
                        </div>

                        <div className='cont-element-post-create'>
                            <p className='subtitle-form'>Caracteristicas del inmueble:</p>
                            <label htmlFor='feature' className='label-input-feature'>

                                <input
                                id='value_feature'
                                value={value_feature}
                                name='value_feature'
                                type='number'
                                onChange={
                                    e=>onChangeNumbers(e, e.target.name)
                                }
                                className='input-value-feature'
                                placeholder='Cantidad'
                                />
                                <Select
                                    id='feature'
                                    
                                    name='feature'
                                    options={options_feature}
                                    onChange={handleChangeFeature}
                                    className="select-input-feature"
                                    styles={{
                                        control: (styles) => {
                                            return {
                                                ...styles,
                                                cursor:"pointer",
                                                borderRadius:"none",
                                                height:'40px',

                                            }
                                            
                                        }
                                    }}
                                />
                                
                                <div onClick={handleClick} className='button-feature'>Agregar</div>
                                </label>
                                {
                                    features.length > 0 ?
                                    (
                                        <>
                                        
                                        <p className='delete-features' onClick={resetFeatures}>Eliminar</p>
                                        <div className='cont-items-feature'>
                                            {
                                                
                                                features.map((item,index) => (
                                                    <div key={index} className='item-list-feature'>
                                                        <p className='p-item-feature'>{item.value}</p>
                                                        <p className='p-item-feature'>{translateFeature(item.name, item.value)}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        </>
                                    ):<></>
                                }

                            <label htmlFor='terrain_sup' className='label-input-create-post'>
                                <span className='span-title-input'>

                                    Superficie del terreno: 
                                    {
                                        terrain_sup?
                                        <span className='delete-span' onClick={resetTerrainSup}>Borrar</span>
                                        :
                                        <></>
                                    }
                                </span>
                                <input
                                id='terrain_sup'
                                value={terrain_sup}
                                name='terrain_sup'
                                type='text'

                                onChange={
                                    e=>onChangeNumbersPositive(e, e.target.name)
                                }
                                
                                className='input-string'
                                placeholder='Superficie del terreno (opcional)'
                                />
                            </label>

                            <label htmlFor='id_department' className='label-input-create-post'>
                                <span className='span-title-input'>

                                    Superficie total del inmueble: 
                                    {
                                        total_sup ?
                                        <span className='delete-span' onClick={resetTotalSup}>Borrar</span>
                                        :
                                        <></>
                                    }
                                </span>
                                <input
                                id='total_sup'
                                value={total_sup}
                                name='total_sup'
                                type='text'
                                onChange={e=>onChangeNumbersPositive(e, e.target.name)}
                                
                                className='input-string'
                                placeholder='Superficie total del inmueble (opcional)'
                                />
                            </label>
                            <label htmlFor='id_department' className='label-input-create-post'>
                                <span className='span-title-input'>

                                    Superficie total cubierta del inmueble:
                                    
                                    {
                                        cover_sup ?
                                        <span className='delete-span' onClick={resetCoverSup}>Borrar</span>
                                        :
                                        <></>
                                    }
                                </span>
                                <input
                                id='cover_sup'
                                value={cover_sup}
                                name='cover_sup'
                                type='text'
                                onChange={e=>onChangeNumbersPositive(e, e.target.name)}
                                
                                className='input-string'
                                placeholder='Superficie cubierta del inmueble (opcional)'
                                />
                            </label>
                            
                            

                            <label htmlFor='antiquity' className='label-input-create-post'>
                                <span className='span-title-input'>

                                    Antiguedad:

                                    {
                                        antiquity ?
                                        <span className='delete-span' onClick={resetAntiquitySup}>Borrar</span>
                                        :
                                        <></>
                                    }
                                </span>
                                <input
                                id='antiquity'
                                value={antiquity}
                                name='antiquity'
                                type='text'
                                onChange={e=>onChangeNumbersPositive(e, e.target.name)}
                                
                                className='input-string'
                                placeholder='Antiguedad (opcional)'
                                />
                            </label>

                            <label htmlFor='operation' className='label-input-create-post'>
                                Tipo de operacion:
                                <Select
                                    id='operation'
                                    
                                    name='operation'
                                    options={options_operation}
                                    onChange={handleChangeOperation}
                                    className="select-input-create-post"
                                    styles={{
                                        control: (styles) => {
                                            return {
                                                ...styles,
                                                cursor:"pointer",
                                                borderRadius:"none",
                                                flexGrow:1,
                                                flexBasis:200,
                                                borderColor: 'primary50'
                                            }
                                            
                                        }
                                    }}
                                />
                            </label>

                            <label htmlFor='price' className='label-input-create-post'>
                                <span className='span-title-input'>

                                    Precio:

                                    {
                                        price ?
                                        <span className='delete-span' onClick={resetPrice}>Borrar</span>
                                        :
                                        <></>
                                    }
                                </span>
                                <input
                                id='price'
                                value={price}
                                name='price'
                                type='text'
                                onChange={e=>onChangeNumbersPositive(e, e.target.name)}
                                required
                                className='input-string'
                                placeholder='Precio'
                                />
                            </label>
                            

                            <label htmlFor='currency_price' className='label-input-create-post'>
                                Moneda del precio:
                                <Select
                                id='currency_price'
                                name='currency_price'
                                options={options_currency}
                                onChange={handleChangeCurrencyPrice}
                                className="select-input-create-post"
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
                                required
                                />
                            </label>

                            <label htmlFor='expenses' className='label-input-create-post'>
                            <span className='span-title-input'>

                                Expensas:

                                {
                                    expenses ?
                                    <span className='delete-span' onClick={resetExpenses}>Borrar</span>
                                    :
                                    <></>
                                }
                                </span> 
                                <input
                                id='expenses'
                                value={expenses}
                                name='expenses'
                                type='text'
                                onChange={e=>onChangeNumbersPositive(e, e.target.name)}
                                
                                className='input-string'
                                placeholder='Numero de piso (opcional)'
                                />

                            </label>

                            <label htmlFor='currency_expenses' className='label-input-create-post'>
                                Moneda de expensas:
                                <Select
                                id='currency_expenses'
                                name='currency_expenses'
                                options={options_currency}
                                onChange={handleChangeCurrencyExpenses}
                                className="select-input-create-post"
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
                            </label>

                            <label htmlFor='financing' className='label-input-create-post-row'>
                                Financiamiento:
                                <input
                                id='financing'
                                type="checkbox"
                                checked={financing}
                                className='check-input'
                                onChange={e => setFinancing(e.target.checked)}
                                />
                            </label>
                            <p className='subtitle-form'>Multimedia</p>
                            <label htmlFor='imageInput' className='label-input-create-post'>
                                Imagenes:
                                <div className='video-header-post-create'>

                                    
                                    <input 
                                    className="select-input-create-post"
                                    type="file" 
                                    id="imageInput" 
                                    accept="image/*" 
                                    multiple 
                                    required
                                    onChange={e=>handleFotoChange(e)} 
                                    />

                                    {
                                        (imagesForm && (imagesForm.length > 0))? 
                                        <div className='cont-delete-button'>
                                            <StandarBotton text='Eliminar' onClickAction={resetImagesForm}/>

                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                {
                                    (imagesForm  )? 
                                    (   
                                        <div className='cont-images-form'>
                                            {
                                                imagesForm.map((img, index) => (
                                                    <img 
                                                        className='prev-image-form'
                                                        key={index} 
                                                        src={URL.createObjectURL(img)} 
                                                        alt={`Image ${index}`}
                                                    />
                                                ))
                                            }
                                        </div>
                                    )
                                    :
                                    <></>
                                }
                            </label>

                            <label htmlFor='videoInput' className='label-input-create-post'>

                                Video:
                                <div className='video-header-post-create'>
                                    
                                    <input 
                                        className="select-input-create-post"
                                        type="file" 
                                        id="videoInput" 
                                        accept="video/*" 
                                        multiple 
                                        required
                                        onChange={e=>handleVideoChange(e)} 
                                    />
                                    {
                                        videoForm? 
                                        <div className='cont-delete-button'>
                                            <StandarBotton text='Eliminar' onClickAction={resetVideoForm}/>

                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                                
                                {
                                    videoForm? 
                                    (
                                        <>
                                        
                                        <video className='video-form' controls>
                                            <source src={URL.createObjectURL(videoForm)} type={videoForm.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                        </>
                                    )
                                    :
                                    <></>
                                }
                            </label>
                            <div className='button'>
                                {
                                    loading_posts? 
                                    (
                                        <StandarBotton text='Creando'
                                            loading_component={<Loading width={'15px'} height={'15px'} color={'#ffffff'}/>}
                                        />
                                    )
                                    :
                                    (
                                        <StandarBotton type='submit' text='Crear'/>
                                    )
                                }
                            </div>
                        </div>

                        
                        
                    </form> 
                    
                ):(
                    <p>No tienes permisos para acceder a la vista</p>
                )
            }
            
        </Layout>
    )
};

const mapStateToProps = (state:RootState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    loading_posts: state.posts.loading_posts,
    post: state.posts.post,
    msg: state.posts.msg_create_post
});

export default connect(mapStateToProps, {
    load_user,
    create_post,
    check_authenticated
})(CreatePostPage)