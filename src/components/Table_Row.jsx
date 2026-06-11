import showIcon from "../assets/show.png"
import hideIcon from "../assets/hide.png"
import { useState } from "react"

const Table_Row = (props) => {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const encode =()=>{
        let pass = ""
        for (let index = 0; index < props.password.length; index++) {
            pass = pass + "*"
            
        }
        return pass;
    }

    const remove = ()=>{
        props.removepassword(props.index)
    }

    const Edit = ()=>{
        props.edit_entry(props.index)
    }


    return (
        <tr>
            <td className="border px-4 py-2">{props.Link}</td>
            <td className="border px-4 py-2">{props.Username}</td>
            <td className="border px-4 py-2">
                <div className="flex items-center justify-between">
                    <span>{showPassword ? props.password : encode()}</span>
                    <img
                        onClick={togglePassword}
                        className="w-4 h-4 cursor-pointer"
                        src={showPassword ? hideIcon : showIcon}
                        alt={showPassword ? "Hide password" : "Show password"}
                    />
                </div>
            </td>
            <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 cursor-pointer"
                onClick={Edit}>
                    Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                onClick={remove}>
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default Table_Row

