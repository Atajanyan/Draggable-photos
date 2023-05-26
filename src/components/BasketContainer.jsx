import React, { useContext } from 'react'
import { Context } from '../App'
import './Baskets.css';
import Basket from './Basket';

function BasketsContainer() {
    const {keywords} = useContext(Context)


  return (
    <div className='basketsContainer'>
    {
     keywords.map(keyword=><Basket keyword={keyword} key={keyword}/>)
    }
  </div>
  )
}

export default BasketsContainer