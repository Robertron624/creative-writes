import Nav from "./nav";

function Layout({children}){
    return(
        <div className="mx-6 md:max-w-7xl px-8 md:mx-auto bg-red-50 font-poppins">
            <Nav />
            <main>{children}</main>
        </div>
    )
}

export default Layout;