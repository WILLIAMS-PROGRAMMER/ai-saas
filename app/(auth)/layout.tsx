const AuthLayout = ({children}: {children:React.ReactNode}) => {
    return ( 
        <div className="bg-black h-full">
               <div className=" flex items-center justify-center pt-[50px]">
                    {children}
                </div> 
        </div>
     
    );
}
 
export default AuthLayout;