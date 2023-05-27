import { useEffect, useRef, useState } from 'react';
import './App.css';
import { createContext } from 'react';
import BasketsContainer from './components/BasketContainer';

export let Context = createContext()

function App() {
  const [searchData, setSearchData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [keywords  ,setKeywords] = useState([])
  const [currentItem,setCurrentItem] = useState(null)
  const [isShowMassage,setIsShowMassage] = useState(false)
  let massage = useRef(true)

  useEffect(()=>{
    if(massage.current){
      massage.current = false
    }else if(!searchData.length){
        setIsShowMassage(true)
      }else{
        setIsShowMassage(false)
      }
  },[searchData])


  const handleSearch = async(e) => {
    e.preventDefault();
    const tags = inputValue.trim().split(' ')
    setKeywords(tags)
    const data = []
    Promise.all(tags.map(tag => {
      return fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=432038f9a2f76cf4ff57cc1e679c08c6&tags=${tag}&per_page=5&page=1&format=json&nojsoncallback=1`)
     }))
    .then(Results => Promise.all(Results.map(Result => Result.json()))).then(res => {
      res.forEach((dataObj, index) => {
        const photos = dataObj.photos?.photo.map(photoObj => {
          return {
            id: photoObj.id+Math.random(),
            title: photoObj.title,
            url: `https://live.staticflickr.com/${photoObj.server}/${photoObj.id}_${photoObj.secret}.jpg`,
            tag: tags[index]
          }
        })
       data.push(...photos)
      })
      setSearchData(data.sort(() => 0.5 - Math.random()))
     })

  }

  function dragStartHandler(e,item){
    e.target.style.opacity = 0.2
    setCurrentItem(item)
  }

  function dragEndHandler(e){
    e.target.style.opacity = 1
  }


  return (
    <div className="App">
        <form onSubmit={handleSearch}>
          <div className="search">
          <input
            type="text"
            value={inputValue}
            placeholder="Search"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className='searchButton' disabled={inputValue.length === 0}>Search</button>
        </div>
      </form>
    <Context.Provider value={{setSearchData,searchData,keywords,currentItem}}>
      <div className='container'>
        <div className="photosContainer">
         {
           searchData.map(photoObj => {
             return <img 
                        key={photoObj.id}
                        src={photoObj.url}
                        alt={photoObj.title}
                        draggable = {true}
                        onDragStart={(e)=>dragStartHandler(e,photoObj)}
                        onDragEnd={(e)=>dragEndHandler(e)}
                    />
            })
         }
         <div className={!isShowMassage?'massage':'active_massage'}>All photos sorted</div>
        </div>
        <BasketsContainer/>
      </div>
    </Context.Provider>
    </div>
  );
}

export default App;


