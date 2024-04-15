import { FormEvent } from "react"


type Props = {}

function page({}: Props) {
    const handlerLogin =(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    }
  return (
    <div>
        <form>
            <input placeholder="usuario"/>
            <input placeholder="contraseña" type="password"/>
            <button>Ingresar</button>
        </form>
    </div>
  )
}

export default page