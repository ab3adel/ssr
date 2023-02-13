import Form from 'react-bootstrap/Form'
import './checkBox.scss'
import {CheckSquare,Square} from 'react-bootstrap-icons'

interface iProps {checked :boolean,setChecked:Function,label:string}
export const CheckBox =({label,checked,setChecked}:iProps)=>{

const handleChecked= ()=>{
    setChecked(!checked)
}
    return (

        <Form.Group className="customisedCheckbox "
        onClick={handleChecked}>
            <Form.Label>
                {
                    checked?
                   <CheckSquare className='checkIcon' />
                   :
                   <Square className='checkIcon' />
                }
            </Form.Label>

            <Form.Check
            className="input"
            type={'checkbox'}
            label={label}
            >
                


            </Form.Check>
        </Form.Group>
    )
}