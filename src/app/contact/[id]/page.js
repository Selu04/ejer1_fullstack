"use client"

import Link from "next/link"
import { use, useEffect, useState } from "react"

export default function Contact({ params }) {
    const { id } = use(params)
    const [contacto, setContacto] = useState()
    const [isEditing, setIsEditing] = useState(false)

    async function fetchContacto() {
        const url = await fetch("/api/contact/contactuser?id=" + id)
        const cont = await url.json()
        setContacto(cont[0])
    }

    useEffect(() => {
        fetchContacto()
    }, []) 

    async function editarContacto(e) {
        e.preventDefault()
        const url = await fetch("/api/contact/contactuser?id=" + id, {
            method: "PUT",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify(contacto)
        })
        fetchContacto()
    }

    function onChange(e) {
        const { name, value } = e.target
        setContacto(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    if (contacto) {
        return (
            isEditing ?
                <div>
                    <h1>Formulario de Registro</h1>
                    <form onSubmit={editarContacto}>
                        <label>Nombre:
                            <input type="text" name="nombre" onChange={e => onChange(e)} value={contacto.nombre} required />
                        </label><br />
                        <label>Apellidos:
                            <input type="text" name="apellidos" onChange={e => onChange(e)} value={contacto.apellidos} required />
                        </label><br />
                        <label>Correo Electrónico:
                            <input type="email" name="correo" onChange={e => onChange(e)} value={contacto.correo} required />
                        </label><br />
                        <label>Número de Teléfono:
                            <input type="tel" name="telefono" pattern="[0-9]{9}" onChange={e => onChange(e)} value={contacto.telefono} required />
                        </label><br />
                        <label>Fecha de Nacimiento:
                            <input type="date" name="fecha_nacimiento" onChange={e => onChange(e)} value={contacto.fecha_nacimiento} required />
                        </label><br />
                        <button type="submit">Guardar</button>
                    </form>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div> 
                :
            <div>
                <h1>Información de Contacto</h1>
                <p>Nombre: {contacto.nombre}</p>
                <p>Apellidos: {contacto.apellidos}</p>
                <p>Correo Electrónico: {contacto.correo}</p>
                <p>Número de Teléfono: {contacto.telefono}</p>
                <p>Fecha de Nacimiento: {contacto.fecha_nacimiento}</p>
                <button onClick={() => setIsEditing(true)}>Editar</button>
                <Link href="/">Volver</Link>
            </div>)
    } else {
        return <div> Cargando... </div>
    }
}
