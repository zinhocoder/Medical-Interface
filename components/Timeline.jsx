"use client"

/**
 * Componente que exibe a linha do tempo de registros médicos
 *
 * Gerencia o estado de expansão dos registros e fornece
 * funcionalidades para alternar a visualização e imprimir registros.
 *
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.records - Lista de registros médicos
 * @param {Function} props.onLoadMore - Função para carregar mais registros
 */

import { useState } from "react"
import TimelineEntry from "./TimelineEntry"
import "../css/Timeline.css"

function Timeline({ records, onLoadMore }) {
  // Estado para controlar quais registros estão expandidos
  const [expandedRecords, setExpandedRecords] = useState(
    records.reduce((acc, record) => {
      acc[record.id] = record.expanded || false
      return acc
    }, {}),
  )

  /**
   * Alterna a expansão de um registro específico
   * @param {number} recordId - ID do registro a ser alternado
   */
  const toggleRecord = (recordId) => {
    setExpandedRecords((prev) => ({
      ...prev,
      [recordId]: !prev[recordId],
    }))
  }

  /**
   * Abre uma visualização para impressão do registro
   * @param {number} recordId - ID do registro a ser impresso
   */
  const printRecord = (recordId) => {
    const record = records.find((r) => r.id === recordId)
    if (!record) return

    // Cria uma nova janela para impressão
    const printWindow = window.open("", "_blank")
    printWindow.document.write(`
      <html>
        <head>
          <title>Prontuário - ${record.date.day}/${record.date.month}/${record.date.year}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #1e5eff; }
            .header { margin-bottom: 20px; }
            .content { margin-bottom: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Prontuário Médico</h1>
            <p>Data: ${record.date.day}/${record.date.month}/${record.date.year}</p>
            <p>Médico: ${record.doctor}</p>
            <p>Duração: ${record.duration}</p>
          </div>
          <div class="content">
            <h2>${record.title || "Sem título"}</h2>
            <p>${record.description || "Sem descrição"}</p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div className="timeline-container">
      {/* Linha vertical da timeline */}
      <div className="timeline-line"></div>

      {/* Entradas da timeline */}
      {records.map((record) => (
        <TimelineEntry
          key={record.id}
          record={record}
          expanded={expandedRecords[record.id]}
          onToggle={() => toggleRecord(record.id)}
          onPrint={() => printRecord(record.id)}
        />
      ))}

      {/* Botão para carregar mais registros */}
      <div className="load-more">
        <button className="load-more-button" onClick={onLoadMore}>
          Ver mais
          <svg
            className="arrow-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Timeline

