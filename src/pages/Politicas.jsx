import React from 'react';
import Tempadminaux from "../components/Template_admin_aux";
import Politicaspage from "../components/Politicascomps/page";
import { v4 as uuidv4 } from "uuid";

const contenido = () => {

  const testing_users = [
    {id:uuidv4(), nombre:"Juan Gonzales",cargo:"Profedsor"},
    {id:uuidv4(),nombre:"David Martinez",cargo:"Estudiante"},
    {id:uuidv4(),nombre:"Samuel Perez",cargo:"Profedsor"},
    {id:uuidv4(),nombre:"Pedro Martinez",cargo:"Profedsor"},
    {id:uuidv4(),nombre:"Sandra Saenz",cargo:"Estudiante"},
    {id:uuidv4(),nombre:"Miguel Gutierrez",cargo:"Profedsor"},
  ]
  const testing_accesibility = {abierta: {reserva:24,prestamo:7,renov:3},
                                restringida: {reserva:48,prestamo:15,renov:4},
                                confidencial: {reserva:72,prestamo:30,renov:6}
                                }

    return (
        <Politicaspage accesibilityconfigs={testing_accesibility} restrictedusers={testing_users} condidenceusers={testing_users}/>
    )
}
const Politicas = ({content,admin,user}) => {
  return (
    <Tempadminaux content={contenido()} admin={admin} user={user}/>
  )
}
export default Politicas;