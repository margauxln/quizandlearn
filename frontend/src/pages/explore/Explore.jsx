import Header from "../../components/header/Header";
import { useLogIn } from "../../hooks/useLogIn";

const Explore = () => {

    const {user} = useLogIn();
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