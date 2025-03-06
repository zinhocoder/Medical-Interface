"use client"

/**
 * Componente de conteúdo principal
 *
 * Exibe o resumo do paciente e a timeline de registros médicos.
 * Gerencia o estado de expansão dos registros e a funcionalidade
 * de carregar mais registros.
 */

import { useState } from "react"
import PatientSummary from "./PatientSummary"
import Timeline from "./Timeline"
import "../css/MainContent.css"

const MainContent = () => {
  // Dados do paciente (simulados)
  const patientData = {
    name: "Renato Henrique Alves",
    photo: "/Ellipse 78.svg?height=120&width=120",
    age: "23 anos, 14 dias",
    firstConsultation: "29/10/2017",
    insurance: "Unimed",
    appointments: 2,
    absences: 0,
  }

  // Registros médicos iniciais (simulados)
  const initialRecords = [
    {
      id: 1,
      date: { day: "20", month: "AGO", year: "2018" },
      doctor: "Dra. Ana Clara Rocha",
      duration: "00:00",
      title: "Consulta inicial",
      description: "Paciente relata dores nas costas...",
      expanded: false,
    },
    {
      id: 2,
      date: { day: "01", month: "AGO", year: "2018" },
      doctor: "Dra. Ana Clara Rocha",
      duration: "31:45",
      title: "Consulta de retorno",
      description: "Paciente apresenta melhora nos sintomas...",
      expanded: false,
    },
  ]

  // Estado para armazenar os registros médicos
  const [records, setRecords] = useState(initialRecords)

  /**
   * Carrega mais registros médicos (simulado)
   */
  const handleLoadMore = () => {
    const newRecord = {
      id: records.length + 1,
      date: { day: "15", month: "JUL", year: "2018" },
      doctor: "Dr. João Silva",
      duration: "45:00",
      title: "Consulta de rotina",
      description: "Paciente apresentou melhora significativa...",
      expanded: false,
    }
    setRecords([...records, newRecord])
  }

  return (
    <div className="main-content">
      <h2 className="content-title">Resumo</h2>

      {/* Resumo do paciente */}
      <PatientSummary patient={patientData} />

      {/* Timeline de registros médicos */}
      <Timeline records={records} onLoadMore={handleLoadMore} />
    </div>
  )
}

export default MainContent

