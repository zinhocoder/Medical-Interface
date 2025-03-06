"use client"

import type React from "react"

/**
 * Componente que representa uma entrada na timeline de registros médicos
 *
 * Exibe os dados de um registro médico, permitindo expandir/colapsar,
 * editar (quando aplicável) e realizar ações como imprimir e compartilhar.
 *
 * @author Roberto e Newtoo
 * @version 1.0.0
 */

import { useState } from "react"
import { Clock, Printer, Share2 } from "lucide-react"

interface TimelineEntryProps {
  record: {
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
  expanded: boolean
  onToggle: () => void
  onPrint: () => void
}

/**
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.record - Dados do registro médico
 * @param {boolean} props.expanded - Indica se o registro está expandido
 * @param {Function} props.onToggle - Função para alternar a expansão
 * @param {Function} props.onPrint - Função para imprimir o registro
 */
export default function TimelineEntry({ record, expanded, onToggle, onPrint }: TimelineEntryProps) {
  // Estados locais para os campos editáveis
  const [title, setTitle] = useState(record.title || "")
  const [description, setDescription] = useState(record.description || "")

  // Determina se o registro é editável (apenas o primeiro registro neste exemplo)
  const isEditable = record.id === 1

  // Determina se o card deve ser maior (apenas para o primeiro registro com 00:00)
  const isLargeCard = record.duration === "00:00"

  /**
   * Compartilha o registro médico (implementação simulada)
   */
  const handleShare = () => {
    // Implementação futura: integração com sistema de compartilhamento
    alert("Compartilhar registro")
  }

  return (
    <div className="flex mb-6">
      {/* Data do registro */}
      <div
        className="z-10 mr-6 cursor-pointer bg-[#4f92ed] text-white text-center"
        onClick={onToggle}
        aria-label={`Registro de ${record.date.day}/${record.date.month}/${record.date.year}`}
      >
        <div className="text-2xl font-bold px-2 py-1 rounded-t">{record.date.day}</div>
        <div className="text-xs px-2 py-1">{record.date.month}</div>
        <div className="text-xs px-2 py-1 rounded-b">{record.date.year}</div>
      </div>

      {/* Conteúdo do registro */}
      <div
        className={`flex-1 bg-white border border-[#d9d9d9] rounded-lg overflow-hidden ${isLargeCard && expanded ? "min-h-[300px]" : ""}`}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 border-b border-[#d9d9d9]">
          <p className="text-[#5a607f]">Por: {record.doctor}</p>
          <div className="flex items-center text-[#5a607f]">
            <Clock size={16} className="mr-1" />
            <span>{record.duration}</span>
          </div>
        </div>

        {/* Corpo expandido */}
        {expanded && (
          <>
            <div className="p-4">
              {isEditable ? (
                <>
                  <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 font-nunito w-full rounded-md border border-[#d9d9d9] px-3 py-2 text-sm focus:outline-none focus:border-[#B1C4DE]"
                    style={{ "--placeholder-color": "#B1C4DE" } as React.CSSProperties}
                  />
                  <textarea
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`font-nunito w-full rounded-md border border-[#d9d9d9] px-3 py-2 text-sm focus:outline-none focus:border-[#B1C4DE] ${isLargeCard ? "min-h-[180px]" : "min-h-[100px]"}`}
                    style={{ "--placeholder-color": "#B1C4DE" } as React.CSSProperties}
                  />
                </>
              ) : (
                <>
                  <h3 className="font-medium text-[#3248f2] mb-2">{record.title}</h3>
                  <p className="text-[#5a607f]">{record.description}</p>
                </>
              )}
            </div>

            {/* Rodapé com ações */}
            <div className="flex justify-end p-2 border-t border-[#d9d9d9]">
              <button
                className="w-8 h-8 flex items-center justify-center text-[#7e84a3] hover:text-[#3248f2] hover:bg-[#f5f6fa] rounded-md mr-2"
                onClick={handleShare}
                title="Compartilhar"
                aria-label="Compartilhar registro"
              >
                <Share2 size={16} />
              </button>
              <button
                className="w-8 h-8 flex items-center justify-center text-[#7e84a3] hover:text-[#3248f2] hover:bg-[#f5f6fa] rounded-md"
                onClick={onPrint}
                title="Imprimir"
                aria-label="Imprimir registro"
              >
                <Printer size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

