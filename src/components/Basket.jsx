import React, { useContext, useState } from 'react'
import { Context } from '../App'

function Basket({keyword}) {
    const {setSearchData,searchData,currentItem,} = useContext(Context)
    const [basket, setBasket] = useState([])
    const [isShow,setIsShow] = useState(false)


    function dragEndHandler(e){
        e.target.style.boxShadow = 'none'
        e.target.style.opacity = 1
      }

    function dragEnterHandler(e){
        e.preventDefault()
        if(e.target.className === 'basketName'){
          e.target.style.boxShadow = '0px -4px 3px blue'
        }
      }
    
    function dragLeaveHandler(e){
        e.preventDefault()
        e.target.style.boxShadow = 'none'
      }
    
    
    function dropHandler(e){
        e.preventDefault()
        e.target.style.boxShadow = 'none'
                
        if(e.target.innerText === currentItem.tag){
              setBasket(basket.concat(currentItem))
              setSearchData(searchData.filter(e=>e.id !== currentItem.id))
          }   
        }
   
      return (
        <div className='baskets'>
        <div
            className='basketName'
            onDragLeave={(e)=>dragLeaveHandler(e)}
            onDragEnd={(e)=>dragEndHandler(e)}
            onDragEnter={(e)=>dragEnterHandler(e)}
            onDragOver={(e)=>e.preventDefault()}
            onDrop={(e)=>dropHandler(e)}
            onClick={()=>setIsShow(!isShow)}
        >
         {keyword}
        </div>
           <div className='basket'>
              {
              isShow?basket.map(e=><img key={e.id} src={e.url} alt={e.title}/>):''
              }
           </div>
        </div>
  )
}

export default Basket