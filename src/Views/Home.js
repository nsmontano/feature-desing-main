import '..//Components/style/button.css';
import { useThemeContext } from '../Components/context/ThemeContext';

const Home = () => {
  const {contextTheme} = useThemeContext()    
  return (
    <div className="menu">
      <h1>Home</h1>
    </div>
  );
};

export default Home;
