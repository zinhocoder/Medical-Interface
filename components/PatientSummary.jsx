/**
 * Componente que exibe o resumo das informações do paciente
 *
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.patient - Dados do paciente
 * @param {string} props.patient.name - Nome do paciente
 * @param {string} props.patient.photo - URL da foto do paciente
 * @param {string} props.patient.age - Idade do paciente
 * @param {string} props.patient.firstConsultation - Data da primeira consulta
 * @param {string} props.patient.insurance - Convênio do paciente
 * @param {number} props.patient.appointments - Número de atendimentos
 * @param {number} props.patient.absences - Número de faltas
 */

import "../css/PatientSummary.css"

function PatientSummary({ patient }) {
  return (
    <div className="patient-card">
      <div className="patient-info">
        {/* Foto do paciente */}
        <div className="patient-photo">
          <img src={patient.photo || "/placeholder.svg"} alt={patient.name} />
        </div>

        {/* Detalhes do paciente */}
        <div className="patient-details">
          <h3 className="patient-name">{patient.name}</h3>
          <div className="patient-data">
            <div className="data-column">
              <p>Idade: {patient.age}</p>
              <p>Primeira consulta: {patient.firstConsultation}</p>
              <p>Convênio: {patient.insurance}</p>
            </div>
            <div className="data-column">
              <p>Atendimentos: {patient.appointments}</p>
              <p>Faltas: {patient.absences}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientSummary

