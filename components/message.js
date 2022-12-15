function Message({children, avatar, username, description}){

    return(
        <div className="bg-white p-8 border-b-2 rounded-lg mb-5" >
            <div className="flex items-center gap-2">
                <img src={avatar} alt="user profile icon" className="w-10 rounded-full"/>
                <h2 className="">{username}</h2>
            </div>
            <div className="py-4">
                <p className="">{description}</p>
            </div>
            {children}
        </div>
    )
}

export default Message;