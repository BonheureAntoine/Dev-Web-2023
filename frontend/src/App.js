import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
        <Header />
        <NavBar />
        <Main />
    </div>
  );
}

function Header() {
  return (
    <header id="App-header">
          <Logo link="/"/>
          <Title />
          <ClickableText class="connect" name="Se connecter" link="/"/>
    </header>
  );
}
function Title() {
  return (
    <div className="Site-name">EquiManagement</div>
  );
}

function Logo(link) {
    return (
        <a href={link}>
            <img src={logo} className="App-logo" alt="logo"/>
        </a>
    );
}

/*function Button(usage) {
    return (
        <a className={usage.class} href={usage.link}>
            <button >{usage.name}</button>
        </a>
    );
}

 */

function ClickableText(usage) {
    return (
        <div className={usage.class}>
            <a href={usage.link}>
                {usage.name}
            </a>
        </div>
    );
}

function NavBar() {
    return (
        <div id="navBar">
            <ClickableText class="nav" name="ACCEUIL" link="/"/>
            <ClickableText class="nav" name="CALENDRIER" link="/"/>
            <ClickableText class="nav" name="CHEVAUX" link="/"/>
            <ClickableText class="nav-b" name="PARAMETRES" link="/"/>
        </div>
    );
}

function Main() {
    return (
        <div id="main-content">
            <div>Content</div>
        </div>
    );
}

export default App;
