"use client"

import type React from "react"

/**
 * Modal para criação e edição de documentação médica
 *
 * Permite ao médico criar atestados, declarações e outros documentos,
 * visualizá-los, imprimi-los e enviá-los por e-mail.
 *
 * @author Roberto e Newtoo
 * @version 1.0.0
 */

import { useState } from "react"
import { X, Mail, Printer, Calendar, FileText } from "lucide-react"

interface DocumentationModalProps {
  onClose: () => void
}

/**
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.onClose - Função para fechar o modal
 */
const DocumentationModal = ({ onClose }: DocumentationModalProps) => {
  // Estados para os campos do formulário
  const [docDate, setDocDate] = useState("08/02/2024")
  const [docModel, setDocModel] = useState("Atestado padrão com CID")
  const [docText, setDocText] = useState("")

  /**
   * Abre uma janela de impressão com o conteúdo do documento
   * Formata o documento para impressão com estilos adequados
   */
  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${docModel}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; }
              h1 { color: #3248f2; font-size: 24px; margin-bottom: 20px; }
              .header { margin-bottom: 30px; }
              .content { line-height: 1.6; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${docModel}</h1>
              <p>Data: ${docDate}</p>
            </div>
            <div class="content">
              <p>${docText}</p>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  /**
   * Salva o documento e limpa o formulário para adicionar outro
   * Implementação simulada com alerta
   */
  const handleSaveAndAddAnother = () => {
    // Implementação futura: integração com API para salvar o documento
    alert("Documento salvo!")
    setDocText("")
  }

  /**
   * Salva o documento e fecha o modal
   * Implementação simulada com alerta
   */
  const handleSave = () => {
    // Implementação futura: integração com API para salvar o documento
    alert("Documento salvo!")
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] flex flex-col max-h-[90vh]">
        {/* Cabeçalho do modal */}
        <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB]">
          <h2 className="text-[#5a607f] text-lg font-medium">Documentação</h2>
          <button onClick={onClose} className="text-[#7e84a3] hover:text-[#5a607f] transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex gap-4 mb-6">
            {/* Campo de data */}
            <div className="flex-1">
              <label className="block text-[#5a607f] text-sm mb-2">Data</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
                  <div className="bg-[#EEF2FF] rounded-full p-1.5">
                    <Calendar size={16} className="text-[#3248f2]" />
                  </div>
                </div>
                <input
                  type="text"
                  value={docDate}
                  onChange={(e) => setDocDate(e.target.value)}
                  className="w-full pl-12 pr-3 py-2.5 border border-[#E5E7EB] rounded-md text-[#5a607f] focus:outline-none focus:border-[#B1C4DE] transition-all"
                  style={{ "--placeholder-color": "#B1C4DE" } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Campo de modelo de atestado */}
            <div className="flex-1">
              <label className="block text-[#5a607f] text-sm mb-2">Modelo de atestado</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
                  <div className="bg-[#EEF2FF] rounded-full p-1.5">
                    <FileText size={16} className="text-[#3248f2]" />
                  </div>
                </div>
                <select
                  value={docModel}
                  onChange={(e) => setDocModel(e.target.value)}
                  className="w-full pl-12 pr-10 py-2.5 border border-[#E5E7EB] rounded-md text-[#5a607f] appearance-none bg-white focus:outline-none focus:border-[#B1C4DE] transition-all"
                  style={{ "--placeholder-color": "#B1C4DE" } as React.CSSProperties}
                >
                  <option>Atestado padrão com CID</option>
                  <option>Declaração de Comparecimento</option>
                  <option>Relatório Médico</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#7e84a3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Campo de texto do documento */}
          <div className="mt-6">
            <textarea
              placeholder="Descrição"
              value={docText}
              onChange={(e) => setDocText(e.target.value)}
              className="w-full h-[300px] px-4 py-3 border border-[#E5E7EB] rounded-md text-[#5a607f] resize-none focus:outline-none focus:border-[#B1C4DE] transition-all"
              style={{ "--placeholder-color": "#B1C4DE" } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Rodapé do modal */}
        <div className="flex justify-between items-center p-6 border-t border-[#E5E7EB]">
          <div className="flex gap-2">
            {/* Botões de ação secundários */}
            <button
              onClick={() => alert("Enviar por e-mail")}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-md text-[#5a607f] hover:bg-[#f5f6fa] transition-colors"
            >
              <Mail size={16} />
              Enviar por e-mail
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E7EB] rounded-md text-[#5a607f] hover:bg-[#f5f6fa] transition-colors"
            >
              <Printer size={16} />
              Imprimir
            </button>
          </div>
          <div className="flex gap-2">
            {/* Botões de ação principais */}
            <button
              onClick={handleSaveAndAddAnother}
              className="px-4 py-2.5 text-[#3248f2] border border-[#3248f2] rounded-md hover:bg-[#f0f4ff] transition-colors"
            >
              Salvar e adicionar outro
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2.5 bg-[#3248f2] text-white rounded-md hover:bg-[#2a3cd9] transition-colors"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentationModal

