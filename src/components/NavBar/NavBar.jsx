import { Link } from 'react-router-dom'


const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <img 
  src="/images/store.png"
  alt="logo"
  style={{width: "40px", height: "50px"}}
  className="navbar-brand" />
  <Link className="navbar-brand" to="/">GoLocal</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/create">Add Business</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">Profile</Link>
      </li>
      <li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          🛠
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link className="dropdown-item" to="" onClick={handleLogout} >Sign Out</Link>
          <Link className="dropdown-item" to="/changePassword">Change Password</Link>
          <Link className="dropdown-item" to="#"></Link>
        </div>
      </li>
    </ul>
  </div>
</nav>
      :
        <nav>
          <ul>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
      }
    </>
  )
}

export default NavBar
