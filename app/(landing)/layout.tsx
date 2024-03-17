const LandingLayout = ({children}: {children:React.ReactNode}) => {
    return ( <main className="h-full bg-[#111827] overflow-auto relative">
        <div className="mx-auto max-w-screen-xl h-full w-full relative z-10">
            <div className="absolute top-0 left-0 w-full h-full z-[-1]">
                <img
                    src="https://i.gifer.com/QWc9.gif"
                    alt=""
                    className="w-full z-[-1] h-full object-cover opacity-20"
                />
            </div>
           
            {children}
             
        </div>
    </main> );
}
 
export default LandingLayout;