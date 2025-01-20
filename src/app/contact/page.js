
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import '../../styles/estiloAgenda.css'

export default function ListContact() {
    const [contacts, setContacts] = useState([]);

    async function deleteContact(id) {
        if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?, no hay vuelta atras")) {
            const response = await fetch("/api/contact", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id })
            });

            if (response.ok) {
                fetchContacts(); 
            } else {
                alert("Error al eliminar el contacto");
            }
        }
    }

    async function fetchContacts() {
        const response = await fetch("/api/contact");
        if (response.ok) {
            const body = await response.json();
            setContacts(body);
        } else {
            alert("Error al cargar los datos");
        }
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="content">
            <h1 id="title">Agenda</h1>
            {contacts.map((contact) => (
                <p key={contact.id}>
                    <Link href={`/contact/${contact.id}`}>
                        {contact.nombre} - {contact.apellidos}
                    </Link>
                    <button className="deleteButton" onClick={() => deleteContact(contact.id)}>Eliminar</button>
                </p>
            ))}
            <Link href="/contact/create">Contacto nuevo</Link>
        </div>
    );
}
