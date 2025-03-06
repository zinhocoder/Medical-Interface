"use client"

import type React from "react"

/**
 * Modal para criação e edição de prescrições médicas
 *
 * Permite ao médico criar prescrições, visualizá-las,
 * imprimi-las e enviá-las por e-mail.
 *
 * @author Roberto e Newtoo
 * @version 1.0.0
 */

import { useState } from "react"
import { X, Mail, Printer, Calendar } from "lucide-react"
import "../css/Modal.css"

interface PrescriptionModalProps {
  onClose: () => void
}

/**
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onClose - Função para fechar o modal
 */
const PrescriptionModal = ({ onClose }: PrescriptionModalProps) => {
  // Estados para os campos do formulário
  const [prescriptionDate, setPrescriptionDate] = useState("08/02/2024")
  const [prescriptionText, setPrescriptionText] = useState("")

  /**
   * Abre uma janela de impressão com o conteúdo da prescrição
   * Formata a prescrição para impressão com estilos adequados
   */
  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Prescrição Médica</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #3248f2; font-size: 24px; margin-bottom: 20px; }
              .header { margin-bottom: 30px; }
              .content { line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Prescrição Médica</h1>
              <p>Data: ${prescriptionDate}</p>
            </div>
            <div class="content">
              <p>${prescriptionText}</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  /**
   * Salva a prescrição e limpa o formulário para adicionar outra
   * Implementação simulada com alerta
   */
  const handleSaveAndAddAnother = () => {
    // Implementação futura: integração com API para salvar a prescrição
    alert("Prescrição salva!")
    setPrescriptionText("")
  }

  /**
   * Salva a prescrição e fecha o modal
   * Implementação simulada com alerta
   */
  const handleSave = () => {
    // Implementação futura: integração com API para salvar a prescrição
    alert("Prescrição salva!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] flex flex-col max-h-[90vh]">
        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB]">
          <h2 className="text-[#5a607f] text-lg font-medium">Prescrição</h2>
          <button
            className="text-[#7e84a3] hover:text-[#5a607f] transition-colors"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="p-6 flex-1 overflow-auto">
          {/* Campo de data */}
          <div className="mb-6">
            <label className="block text-[#5a607f] text-sm mb-2" htmlFor="prescription-date">
              Data
            </label>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
                <div className="bg-[#EEF2FF] rounded-full p-1.5">
                  <Calendar size={16} className="text-[#3248f2]" />
                </div>
              </div>
              <input
                id="prescription-date"
                type="text"
                className="w-full pl-12 pr-3 py-2.5 border border-[#E5E7EB] rounded-md text-[#5a607f] focus:outline-none focus:border-[#B1C4DE] transition-all"
                value={prescriptionDate}
                onChange={(e) => setPrescriptionDate(e.target.value)}
                style={{ "--placeholder-color": "#B1C4DE" } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Campo de texto da prescrição */}
          <div className="mt-6">
            <textarea
              className="w-full h-[300px] px-4 py-3 border border-[#E5E7EB] rounded-md text-[#5a607f] resize-none focus:outline-none focus:border-[#B1C4DE] transition-all"
              placeholder="Digite a prescrição aqui..."
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              style={{ "--placeholder-color": "#B1C4DE" } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Rodapé do modal */}
        <div className="flex justify-between items-center p-6 border-t border-[#E5E7EB]">
          <div className="flex gap-2">
            {/* Botões de ação secundários */}
            <button
              className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-md text-[#5a607f] hover:bg-[#f5f6fa] transition-colors"
              onClick={() => alert("Enviar por e-mail")}
              aria-label="Enviar por e-mail"
            >
              <Mail size={16} />
              Enviar por e-mail
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-md text-[#5a607f] hover:bg-[#f5f6fa] transition-colors"
              onClick={handlePrint}
              aria-label="Imprimir"
            >
              <Printer size={16} />
              Imprimir
            </button>
          </div>
          <div className="flex gap-2">
            {/* Botões de ação principais */}
            <button
              className="px-4 py-2.5 text-[#3248f2] border border-[#3248f2] rounded-md hover:bg-[#f0f4ff] transition-colors"
              onClick={handleSaveAndAddAnother}
              aria-label="Salvar e adicionar outro"
            >
              Salvar e adicionar outro
            </button>
            <button
              className="px-4 py-2.5 bg-[#3248f2] text-white rounded-md hover:bg-[#2a3cd9] transition-colors"
              onClick={handleSave}
              aria-label="Salvar"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionModal

