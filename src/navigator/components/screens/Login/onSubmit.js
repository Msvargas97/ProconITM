import { fetchLoginAction } from '../../../../actions'
import { validation,normalize } from "../../../../utils"


const onSubmit = (values,dispatch,props) => {
    //alert(`${JSON.stringify(values)}`)
    return dispatch(fetchLoginAction({
        username: ((validation.isNumber(values.username)) ? //Si es un número de cc, añade los puntos
            normalize.numberWithDots(values.username) : values.username),
        password: values.password
    })) 
   // return false;
}

export default onSubmit;