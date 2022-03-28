import { Link } from 'react-router-dom'


const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">GoLocal</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/create">Add Business</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile">Profile</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          🛠
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Sign Out</a>
          <a class="dropdown-item" href="#">Change Password</a>
          <a class="dropdown-item" href="#"></a>
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
