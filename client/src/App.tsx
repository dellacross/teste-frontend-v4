import './styles/App.css';
import Wrapper from './layout/Wrapper/wrapper';
import NavBar from './layout/NavBar/navbar';
import Main from './layout/Main/main';

function App() {
  return (
    <Wrapper>
      <NavBar />
      <Main />
    </Wrapper>
  );
}

export default App;
