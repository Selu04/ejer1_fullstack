'use client'
import { redirect } from "next/navigation";
import  {useState} from "react";
import '../../../styles/estiloAgenda.css'

export default function CreateContact(){
    const [contacto, setContacto] = useState({
        nombre: "",
        apellidos: "",
        correo: "",
        telefono: 0,
        fecha_nacimiento: ""
    });

    async function crearContacto(e) {

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {"Content-Type": "application-json"},
            body: JSON.stringify(contacto)
        })
    }

    function onChange(e) {
        setContacto({...contacto,[e.target.name]:e.target.value})
    }

    function filtroContacto(e) {
        e.preventDefault();
        if(contacto.nombre && contacto.apellidos && contacto.telefono){
            if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.correo)){
                if(String(contacto.telefono).length == 9){
                    crearContacto()
                }
            }
            redirect("/")
        }
    }

    return (
        <div className="content">
            <h1 >Contacto nuevo</h1>
            <form onSubmit={filtroContacto} >
                <label>
                    Nombre:
                    <input
                        className="form"
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                        onChange={e => onChange(e)} value={contacto.nombre}
                        required
                    />
                </label><br />
                <label>
                    Apellidos:
                    <input
                        className="form"
                        name="apellidos"
                        type="text"
                        placeholder="Apellido"
                        onChange={e => onChange(e)} value={contacto.apellidos}
                        required
                    />
                </label><br />
                <label>
                    Número de Teléfono
                    <input
                        className="form"
                        name="telefono"
                        type="number"
                        placeholder="Teléfono"
                        onChange={e => onChange(e)} value={contacto.telefono}
                        required
                        pattern="[0-9]{9}"
                    />
                </label><br />
                <label>
                    Email
                    <input
                        className="form"
                        name="correo"
                        type="text"
                        placeholder="Correo"
                        onChange={e => onChange(e)} value={contacto.correo}
                        required
                    />
                </label><br />
                <label>
                    Fecha de Nacimiento
                    <input
                        className="form"
                        name="fecha_nacimiento"
                        type="date"
                        onChange={e => onChange(e)} value={contacto.fecha_nacimiento}
                        required
                    />
                </label><br />
                <input type="submit" value="Crear" id="add"/>
            </form>
        </div>
    )
}