// import logo from '.../public/logo192'
import Nav from './nav'


const Header = () => {
    return (
        <div className="header">
        <div >
            <img src= {require ('../images /logo.jpg')} alt='logo'></img>
        </div>
        <Nav />
        </div>
    )
}

export default Header;