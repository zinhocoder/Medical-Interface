"use client"

/**
 * Componente da seção de prontuário
 *
 * Exibe o cronômetro de consulta e os botões para iniciar/finalizar
 * o atendimento, além de botões para prescrição e documentação.
 *
 * @param {Object} props - Propriedades do componente
 * @param {boolean} props.consultationStarted - Indica se a consulta está em andamento
 * @param {number} props.consultationTime - Tempo decorrido da consulta em segundos
 * @param {Function} props.onStartConsultation - Função para iniciar/finalizar a consulta
 * @param {Function} props.onOpenPrescription - Função para abrir o modal de prescrição
 * @param {Function} props.onOpenDocumentation - Função para abrir o modal de documentação
 */

import { Clock } from "lucide-react"
import "../css/ProntuarioSection.css"

const ProntuarioSection = ({
  consultationStarted,
  consultationTime,
  onStartConsultation,
  onOpenPrescription,
  onOpenDocumentation,
}) => {
  /**
   * Formata o tempo em segundos para o formato HH:MM:SS
   * @param {number} time - Tempo em segundos
   * @returns {string} Tempo formatado
   */
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = time % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="prontuario-section">
      {/* Cabeçalho da seção */}
      <div className="prontuario-header">
        <h1 className="prontuario-title">Prontuário</h1>
      </div>

      <div className="prontuario-content">
        {/* Cronômetro de consulta */}
        <div className="consultation-duration">
          <p className="duration-label">Duração da consulta</p>
          <div className="consultation-timer">
            <Clock className="timer-icon" size={20} />
            <span className="timer-text">{formatTime(consultationTime)}</span>
          </div>

          {/* Botão para iniciar/finalizar consulta */}
          <button
            className={`consultation-button ${consultationStarted ? "active" : ""}`}
            onClick={onStartConsultation}
          >
            <svg
              className="play-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 2L13 8L3 14V2Z" fill="currentColor" />
            </svg>
            {consultationStarted ? "Finalizar atendimento" : "Iniciar atendimento"}
          </button>
        </div>

        <div className="flex-1"></div>

        {/* Botões de ação */}
        <div className="action-buttons">
          <button className="action-button" onClick={onOpenPrescription}>
            Prescrição
          </button>
          <button className="action-button" onClick={onOpenDocumentation}>
            Atestado / Documentação
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProntuarioSection

