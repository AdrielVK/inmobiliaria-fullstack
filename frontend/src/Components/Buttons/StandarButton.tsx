import React from "react";
import  {StandarButtonProps}  from '@/Interfaces/ComponentsInterfaces'
import './Buttons.css'

const StandarBotton: React.FC<StandarButtonProps> = ({type, text, onClickAction, loading_component}) => (
    <button
        type={type}
        onClick={onClickAction}            
        className='button-button'
    >
        {text}
        {loading_component}
    </button>
)


export default StandarBotton;