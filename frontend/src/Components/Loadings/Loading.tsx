import React from 'react';
import ReactLoading from 'react-loading';
import './Loading.css'
interface LoadingProps  {
    color:string
    width: string;
    height: string;
}

const Loading: React.FC<LoadingProps> = ({color, height, width}) => (
    <ReactLoading color={color} className='loading' type={'spinningBubbles'} height={height} width={width} />
);
 
export default Loading;