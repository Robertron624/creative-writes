import Nav from "./nav";

function Layout({children}){
    return(
        <div className="mx-6 md:max-w-2xl md:mx-auto bg-red-50 font-poppins">
            <Nav />
            <main>{children}</main>
        </div>
    )
}

export default Layout;