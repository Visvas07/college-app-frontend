import { useEffect } from "react"
function NotFound(){
    useEffect(()=>{
        document.title="Page Not found"
    })
    return(
        <>
        <h1 className="text-center">Error 404: the requested page is not found</h1>
        </>
    )
}

export default NotFound