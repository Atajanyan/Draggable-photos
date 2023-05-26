import React, { useContext, useState } from 'react'
import { Context } from '../App'

function Basket({keyword}) {
    const {setSearchData,searchData,currentItem} = useContext(Context)
    const [basket, setBasket] = useState([])
    const [isShow,setIsShow] = useState(false)


    function dragEndHandler(e){
        e.target.style.boxShadow = 'none'
        e.target.style.opacity = 1
      }

    function dragOverHandler(e){
        e.preventDefault()
        if(e.target.className === 'basketName'){
          e.target.style.boxShadow = '0px -4px 3px yellow'
        }
      }
    
      function dragLeaveHandler(e){
        e.preventDefault()
        e.target.style.boxShadow = 'none'
      }
    
    
      function dropHandler(e){
        e.preventDefault()
        e.target.style.boxShadow = 'none'
        const currentIndex = searchData.indexOf(currentItem)
                
        if(e.target.innerText === currentItem.tag){
            searchData.splice(currentIndex,1)
            setBasket(basket.concat(currentItem))
           setSearchData(searchData.slice(0))
          }    
        }
   
  return (
        <div className='baskets'>
        <div
            className='basketName'
            onDragOver={(e)=>dragOverHandler(e)}
            onDragLeave={(e)=>dragLeaveHandler(e)}
            onDragEnd={(e)=>dragEndHandler(e)}
            onDrop={(e)=>dropHandler(e)}
            onClick={()=>setIsShow(!isShow)}
        >
         {keyword}
        </div>
        <div className='bask'>
           <div className='baskCont'>
              {
              isShow?basket.map(e=><img key={e.id} src={e.url} alt={e.title}/>):''
              }
           </div>
        </div>
      </div>
  )
}

export default Basket