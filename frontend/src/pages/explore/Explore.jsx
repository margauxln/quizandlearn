import Header from "../../components/header/Header";
import { useAuth } from "../../hooks/useAuth";

const Explore = () => {

    const {user} = useAuth();
    console.log(user);
    //contient userId (du back)

    return(
        <>
            <Header/>
            <div>Page explorer !</div>
        </>
        
    )
};

export default Explore;