import { useLocation } from "react-router-dom";

const ListDetails = (props) => {
  const location = useLocation()
  const list = location.state.list

  return ( <><h1>{list.name}</h1></> );
}
 
export default ListDetails;