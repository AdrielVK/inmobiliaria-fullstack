import bedroom from '@/assets/bedroom.svg';
import bathroom from '@/assets/toilets.svg';
import enviroment from '@/assets/enviroment.svg';
import surface from '@/assets/surface.svg';

import React from 'react';

interface IconProps {
    type:string;
    value?:number;
}

const Icon: React.FC<IconProps> = ({ type,value }) => {
  // Lógica para asignar el SVG según el tipo
  switch (type) {
    case 'surface':
        return <span className='icon'><img className='icon-img' src={surface}/><p className='value-icon'>{`${value?value:''} m² cubiertos`}</p></span>
    case 'bedrooms':
        return <span className='icon'><img className='icon-img' src={bedroom}/><p className='value-icon'>{`${value?value:''} dormitorios`}</p></span>
    case 'bathroom':
        return <span className='icon'><img className='icon-img' src={bathroom}/><p className='value-icon'>{`${value?value:''} banos`}</p></span>
    case 'environments':
        return <span className='icon'><img className='icon-img' src={enviroment}/><p className='value-icon'>{`${value?value:''} ambientes`}</p></span>
    default:
      return null; // O un icono predeterminado si no coincide con ningún caso
  }
};

export default Icon;
