import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <h1>Hello, je suis le composant Layaout !</h1>
            <Outlet />
        </main>
    )
}

export default Layout;