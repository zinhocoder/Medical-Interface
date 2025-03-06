"use client"

/**
 * Aplicação principal do sistema de prontuário médico
 *
 * Este componente é o ponto de entrada da aplicação e coordena
 * todos os componentes principais do sistema, gerenciando o estado
 * global da aplicação e as interações entre os diferentes módulos.
 *
 * @author Roberto e Newtoo
 * @version 1.0.0
 */

import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import ProntuarioSection from "./components/ProntuarioSection"
import MainContent from "./components/MainContent"
import PrescriptionModal from "./components/PrescriptionModal"
import DocumentationModal from "./components/DocumentationModal"
import "./css/App.css"

// Importação da fonte Nunito (alternativa para projetos sem Next.js)
// Descomente se estiver usando um projeto React puro sem Next.js
// import '@fontsource/nunito/400.css';
// import '@fontsource/nunito/500.css';
// import '@fontsource/nunito/600.css';
// import '@fontsource/nunito/700.css';

function App() {
  // Estado para controlar se a consulta está em andamento
  const [consultationStarted, setConsultationStarted] = useState(false)

  // Estado para armazenar o tempo decorrido da consulta em segundos
  const [consultationTime, setConsultationTime] = useState(0)

  // Estados para controlar a exibição dos modais
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [showDocumentationModal, setShowDocumentationModal] = useState(false)

  // Efeito para gerenciar o cronômetro da consulta
  useEffect(() => {
    let interval
    if (consultationStarted) {
      // Inicia o cronômetro quando a consulta começa
      interval = setInterval(() => {
        setConsultationTime((prevTime) => prevTime + 1)
      }, 1000)
    } else {
      // Limpa o intervalo quando a consulta é finalizada
      clearInterval(interval)
    }

    // Função de limpeza para evitar memory leaks
    return () => clearInterval(interval)
  }, [consultationStarted])

  /**
   * Alterna o estado da consulta entre iniciada e finalizada
   * Quando finalizada, o cronômetro é resetado
   */
  const toggleConsultation = () => {
    setConsultationStarted(!consultationStarted)
    if (consultationStarted) {
      setConsultationTime(0)
    }
  }

  // Funções para abrir os modais
  const openPrescriptionModal = () => setShowPrescriptionModal(true)
  const openDocumentationModal = () => setShowDocumentationModal(true)

  return (
    <div className="flex h-screen font-nunito">
      {/* Barra lateral com navegação principal */}
      <Sidebar />

      {/* Seção de prontuário com cronômetro e ações */}
      <ProntuarioSection
        consultationStarted={consultationStarted}
        consultationTime={consultationTime}
        onStartConsultation={toggleConsultation}
        onOpenPrescription={openPrescriptionModal}
        onOpenDocumentation={openDocumentationModal}
      />

      {/* Conteúdo principal com dados do paciente e histórico */}
      <MainContent />

      {/* Modais para prescrição e documentação */}
      {showPrescriptionModal && <PrescriptionModal onClose={() => setShowPrescriptionModal(false)} />}
      {showDocumentationModal && <DocumentationModal onClose={() => setShowDocumentationModal(false)} />}
    </div>
  )
}

export default App

