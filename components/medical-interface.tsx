"use client"

/**
 * Componente principal da interface médica
 */

import { useState, useEffect } from "react"
import { Bell, Calendar, HelpCircle, Home, List, Clock, Settings, Users, Printer, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import PrescriptionModal from "./PrescriptionModal"
import DocumentationModal from "./DocumentationModal"

interface TimelineEntry {
  id: number
  date: {
    day: string
    month: string
    year: string
  }
  doctor: string
  duration: string
  title: string
  description: string
}

// Componente principal
const MedicalInterface = () => {
  // Estados para controle da consulta
  const [consultationStarted, setConsultationStarted] = useState(false)
  const [consultationTime, setConsultationTime] = useState(0)

  // Estados para controle dos modais
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [showDocumentationModal, setShowDocumentationModal] = useState(false)

  // Estados para controle da timeline
  const [expandedEntries, setExpandedEntries] = useState<Record<number, boolean>>({})
  const [entryTitles, setEntryTitles] = useState<Record<number, string>>({})
  const [entryDescriptions, setEntryDescriptions] = useState<Record<number, string>>({})
  const [hasMoreRecords, setHasMoreRecords] = useState(true)

  // Dados iniciais da timeline
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([
    {
      id: 1,
      date: { day: "20", month: "AGO", year: "2018" },
      doctor: "Dra. Ana Clara Rocha",
      duration: "00:00",
      title: "",
      description: "",
    },
    {
      id: 2,
      date: { day: "01", month: "AGO", year: "2018" },
      doctor: "Dra. Ana Clara Rocha",
      duration: "31:45",
      title: "Consulta",
      description: "Paciente apresenta melhora nos sintomas...",
    },
  ])

  /**
   * Efeito para gerenciar o cronômetro da consulta
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (consultationStarted) {
      interval = setInterval(() => {
        setConsultationTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [consultationStarted])

  /**
   * Alterna o estado da consulta entre iniciada e finalizada
   */
  const toggleConsultation = () => {
    setConsultationStarted(!consultationStarted)
    if (consultationStarted) {
      setConsultationTime(0)
    }
  }

  /**
   * Funções para abrir os modais
   */
  const openPrescriptionModal = () => setShowPrescriptionModal(true)
  const openDocumentationModal = () => setShowDocumentationModal(true)

  /**
   * Alterna a expansão de um registro específico na timeline
   */
  const toggleEntry = (id: number) => {
    setExpandedEntries((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  /**
   * Formata o tempo em segundos para o formato HH:MM:SS
   */
  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  /**
   * Atualiza o título de um registro específico
   */
  const handleTitleChange = (id: number, value: string) => {
    setEntryTitles((prev) => ({ ...prev, [id]: value }))
  }

  /**
   * Atualiza a descrição de um registro específico
   */
  const handleDescriptionChange = (id: number, value: string) => {
    setEntryDescriptions((prev) => ({ ...prev, [id]: value }))
  }

  /**
   * Compartilha um registro médico (implementação simulada)
   */
  const handleShare = (entry: TimelineEntry) => {
    alert("Compartilhar registro")
  }

  /**
   * Abre uma visualização para impressão do registro
   */
  const handlePrint = (entry: TimelineEntry) => {
    if (typeof window !== "undefined") {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Prontuário - ${entry.date.day}/${entry.date.month}/${entry.date.year}</title>
              <style>
                body { font-family: 'Nunito', sans-serif; margin: 40px; }
                h1 { color: #3248f2; font-size: 24px; margin-bottom: 20px; }
                .header { margin-bottom: 30px; }
                .content { line-height: 1.6; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Prontuário Médico</h1>
                <p>Data: ${entry.date.day}/${entry.date.month}/${entry.date.year}</p>
                <p>Médico: ${entry.doctor}</p>
                <p>Duração: ${entry.duration}</p>
              </div>
              <div class="content">
                <h2>${entryTitles[entry.id] || entry.title || "Sem título"}</h2>
                <p>${entryDescriptions[entry.id] || entry.description || "Sem descrição"}</p>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  /**
   * Carrega mais registros médicos na timeline
   */
  const loadMoreRecords = () => {
    const additionalRecords = [
      {
        id: timelineEntries.length + 1,
        date: { day: "15", month: "JUL", year: "2018" },
        doctor: "Dr. João Silva",
        duration: "45:00",
        title: "Consulta de rotina",
        description:
          "Paciente apresentou melhora significativa nos sintomas relatados anteriormente. Exames laboratoriais dentro dos parâmetros normais. Mantida a medicação atual.",
      },
      {
        id: timelineEntries.length + 2,
        date: { day: "05", month: "JUN", year: "2018" },
        doctor: "Dra. Mariana Costa",
        duration: "38:20",
        title: "Avaliação cardiológica",
        description:
          "Paciente encaminhado para avaliação cardiológica. Realizado eletrocardiograma que não apresentou alterações significativas. Recomendado acompanhamento preventivo anual.",
      },
    ]

    const loadedExtraRecords = timelineEntries.length - 2

    if (loadedExtraRecords === 0) {
      setTimelineEntries([...timelineEntries, additionalRecords[0]])
    } else if (loadedExtraRecords === 1) {
      setTimelineEntries([...timelineEntries, additionalRecords[1]])
      setHasMoreRecords(false)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Barra lateral esquerda - Apenas ícones */}
      <div className="w-[120px] bg-white border-r border-[#e5e7eb] flex flex-col items-center">
        {/* Logo */}
        <div className="flex items-center justify-center h-[120px] w-full border-b border-[#e5e7eb]">
          <img
            src="/Logo Futurisaude 1.svg"
            alt="Futurisaude"
            className="w-16 h-16"
          />
        </div>

        {/* Navegação */}
        <div className="flex flex-col items-center py-10 space-y-10">
          <button className="w-10 h-10 flex items-center justify-center text-[#7e84a3]">
            <Home size={30} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-[#7e84a3]">
            <List size={30} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-[#7e84a3]">
            <Calendar size={30} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-[#7e84a3]">
            <Users size={30} />
          </button>
          <div className="relative">
            <button className="w-10 h-10 flex items-center justify-center text-[#7e84a3]">
              <Bell size={30} />
            </button>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#3248f2] text-white text-xs flex items-center justify-center rounded-full">
              5
            </span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-[#7e84a3]">
            <HelpCircle size={30} />
          </button>
        </div>

        <div className="flex-1"></div>

        {/* Usuário e Configurações */}
        <div className="flex flex-col items-center py-6 space-y-8 mb-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
            <img src="/avatar.svg?height=40&width=40" alt="User" className="w-full h-full object-cover" />
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-[#7e84a3]">
            <Settings size={24} />
          </button>
        </div>
      </div>

      {/* Seção de Prontuário */}
      <div className="w-[300px] bg-[#f7f8fb] border-r border-[#e5e7eb] flex flex-col">
        <div className="h-[100px] flex items-center px-10 mt-1 border-b border-[#e5e7eb]">
          <h1 className="text-[#5a607f] text-lg font-medium">Prontuário</h1>
        </div>

        <div className="flex flex-col p-6 h-full">
          <div className="space-y-4 mb-6">
            <p className="text-[#3248f2] text-sm font-medium">Duração da consulta</p>
            <div className="border border-[#e5e7eb] rounded-md p-4 flex items-center justify-center bg-white">
              <Clock className="text-[#a1a7c4] mr-2" size={20} />
              <span className="text-[#a1a7c4] text-xl">{formatTime(consultationTime)}</span>
            </div>

            <Button
              className={`w-full ${
                consultationStarted ? "bg-[#dc2626]" : "bg-[#3248f2]"
              } hover:bg-[#2a3cd9] text-white py-3`}
              onClick={toggleConsultation}
            >
              <svg
                className="mr-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 2L13 8L3 14V2Z" fill="currentColor" />
              </svg>
              {consultationStarted ? "Finalizar atendimento" : "Iniciar atendimento"}
            </Button>
          </div>

          <div className="flex-1"></div>

          <div className="space-y-3 mt-auto">
            <Button className="w-full bg-[#3248f2] hover:bg-[#2a3cd9] text-white py-3" onClick={openPrescriptionModal}>
              Prescrição
            </Button>
            <Button className="w-full bg-[#3248f2] hover:bg-[#2a3cd9] text-white py-3" onClick={openDocumentationModal}>
              Atestado / Documentação
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 overflow-auto bg-[#f5f6fa]">
        <div className="p-6">
          <h2 className="text-xl text-[#5a607f] font-medium mb-6">Resumo</h2>

          {/* Card do Paciente */}
          <Card className="p-7 mb-8 border border-[#d9d9d9] max-w-[1300px]">
            <div className="flex flex-wrap">
              <div className="mr-6 mb-4">
                <img
                  src="/Ellipse 78.svg?height=120&width=120"
                  alt="Patient"
                  className="w-[120px] h-[120px] rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-[#3248f2] text-2xl font-bold mb-4">Renato Henrique Alves</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  <div>
                    <p className="text-[#5a607f] text-sm font-light mb-2">Idade: 23 anos, 14 dias</p>
                    <p className="text-[#5a607f] text-sm font-light mb-2">Primeira consulta: 29/10/2017</p>
                    <p className="text-[#5a607f] text-sm font-light mb-2">Convênio: Unimed</p>
                  </div>
                  <div>
                    <p className="text-[#5a607f] text-sm font-extralight mb-2">Atendimentos: 2</p>
                    <p className="text-[#5a607f] text-sm font-extralight">Faltas: 0</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <div className="relative max-w-[1300px]">
            {/* Linha vertical da Timeline */}
            <div className="absolute left-[24px] top-0 bottom-0 w-[2px] bg-[#d9d9d9]"></div>

            {/* Entradas da Timeline */}
            {timelineEntries.map((entry) => (
              <div key={entry.id} className="flex mb-6">
                {/* Caixa de Data */}
                <div className="z-10 mr-6 cursor-pointer flex-shrink-0 w-[50px]" onClick={() => toggleEntry(entry.id)}>
                  <div className="bg-[#4f92ed] text-white text-center rounded-t px-2 py-1">
                    <span className="text-2xl font-bold">{entry.date.day}</span>
                  </div>
                  <div className="bg-[#4f92ed] text-white text-center px-2 py-1">
                    <span className="text-xs">{entry.date.month}</span>
                  </div>
                  <div className="bg-[#4f92ed] text-white text-center rounded-b px-2 py-1">
                    <span className="text-xs">{entry.date.year}</span>
                  </div>
                </div>

                {/* Card de Conteúdo */}
                <Card
                  className={`border border-[#d9d9d9] flex-1 w-full ${entry.duration === "00:00" && expandedEntries[entry.id] ? "min-h-[300px]" : ""}`}
                >
                  {/* Cabeçalho */}
                  <div className="flex justify-between items-center p-4 border-b border-[#d9d9d9]">
                    <p className="text-[#5a607f]">Por: {entry.doctor}</p>
                    <div className="flex items-center text-[#3248f2]">
                      <Clock size={16} className="mr-1" />
                      <span>{entry.duration}</span>
                    </div>
                  </div>

                  {/* Conteúdo Expandido */}
                  {expandedEntries[entry.id] && (
                    <>
                      <div className="p-4">
                        {entry.id === 1 ? (
                          <>
                            <Input
                              type="text"
                              placeholder="Título"
                              value={entryTitles[entry.id] || ""}
                              onChange={(e) => handleTitleChange(entry.id, e.target.value)}
                              className="mb-4 font-nunito focus:outline-none focus:border-[#B1C4DE]"
                            />
                            <Textarea
                              placeholder="Descrição"
                              value={entryDescriptions[entry.id] || ""}
                              onChange={(e) => handleDescriptionChange(entry.id, e.target.value)}
                              className={`font-nunito focus:outline-none focus:border-[#B1C4DE] ${entry.duration === "00:00" ? "min-h-[180px]" : "min-h-[100px]"}`}
                            />
                          </>
                        ) : (
                          <>
                            <h3 className="font-medium text-[#3248f2]">{entry.title}</h3>
                            <p className="mt-2 text-[#5a607f]">{entry.description}</p>
                          </>
                        )}
                      </div>
                      <div className="flex justify-end p-2 border-t border-[#d9d9d9]">
                        <button
                          className="w-8 h-8 flex items-center justify-center text-[#7e84a3] hover:text-[#3248f2] hover:bg-[#f5f6fa] rounded-md mr-2"
                          onClick={() => handleShare(entry)}
                          title="Compartilhar"
                        >
                          <Share2 size={16} />
                        </button>
                        <button
                          className="w-8 h-8 flex items-center justify-center text-[#7e84a3] hover:text-[#3248f2] hover:bg-[#f5f6fa] rounded-md"
                          onClick={() => handlePrint(entry)}
                          title="Imprimir"
                        >
                          <Printer size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </Card>
              </div>
            ))}

            {/* Botão "Ver mais" */}
            {hasMoreRecords && (
              <div className="flex justify-center mt-6">
                <button
                  className="flex items-center gap-1 text-[#7e84a3] text-sm hover:text-[#3248f2] px-4 py-2 border border-[#E5E7EB] rounded-md"
                  onClick={loadMoreRecords}
                >
                  Ver mais
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      {showPrescriptionModal && <PrescriptionModal onClose={() => setShowPrescriptionModal(false)} />}
      {showDocumentationModal && <DocumentationModal onClose={() => setShowDocumentationModal(false)} />}
    </div>
  )
}

export default MedicalInterface