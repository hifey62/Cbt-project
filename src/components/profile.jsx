import { useContext } from "react"
import { AuthContext } from "../context/authcontext"



const Profile = () => {
    const {user} = useContext(AuthContext);
  return (
    <div>Profile

        <h1>I am :{user.name} Profile</h1>
    </div>
  )
}

export default Profile