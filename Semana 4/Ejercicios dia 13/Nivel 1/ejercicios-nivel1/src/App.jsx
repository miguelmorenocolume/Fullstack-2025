// App.jsx
import Slider from './components/Slider'
import Carousel from './components/Carousel'
import Menu from './components/Menu'; 
import './App.css'

const imageList = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516972810927-80185027ca84?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?auto=format&fit=crop&w=800&q=80"
];

function App() {
  return (
    <>
      <Menu />
      <Slider images={imageList} />
      <Carousel images={imageList} />
    </>
  )
}

export default App;
