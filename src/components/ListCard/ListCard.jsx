import { Link } from 'react-router-dom'

const ListCard = ({list}) => {
  return ( 
    <>
      <Link to='/listDetails' key={list.name} state={{list}} >{list.name}</Link> 
      <br />
    </>
  );
}
 
export default ListCard;