import  MySpinner  from "react-bootstrap/Spinner"




export const Spinner=()=>{


    return (
        <MySpinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </MySpinner>
    )
}