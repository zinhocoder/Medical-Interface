/**
 * Componente de barra lateral com navegação principal
 *
 * Exibe o logo da aplicação e os ícones de navegação para as
 * diferentes seções do sistema, além do avatar do usuário e
 * acesso às configurações.
 */

import { Bell, Calendar, HelpCircle, Home, List, Settings, Users } from "lucide-react"
import "../css/Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo da aplicação */}
      <div className="sidebar-logo">
        <img
          src="/Logo Futurisaude 1.svg"
          alt="Futurisaude"
          className="logo-image"
        />
      </div>

      {/* Navegação principal */}
      <nav className="sidebar-nav">
        <SidebarButton icon={<Home size={24} />} tooltip="Início" />
        <SidebarButton icon={<List size={24} />} tooltip="Lista de Pacientes" />
        <SidebarButton icon={<Calendar size={24} />} tooltip="Agenda" />
        <SidebarButton icon={<Users size={24} />} tooltip="Equipe" />
        <SidebarButton icon={<Bell size={24} />} notifications={5} tooltip="Notificações" />
        <SidebarButton icon={<HelpCircle size={24} />} tooltip="Ajuda" />
      </nav>

      <div className="flex-1"></div>

      {/* Perfil do usuário e configurações */}
      <div className="sidebar-footer">
        <div className="avatar">
          <img src="/avatar.svg?height=40&width=40" alt="User" className="rounded-full" />
        </div>
        <SidebarButton icon={<Settings size={24} />} tooltip="Configurações" />
      </div>
    </div>
  )
}

/**
 * Componente de botão da barra lateral
 *
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.icon - Ícone a ser exibido
 * @param {number} props.notifications - Número de notificações (opcional)
 * @param {string} props.tooltip - Texto de ajuda ao passar o mouse (opcional)
 */
const SidebarButton = ({ icon, notifications, tooltip }) => (
  <button className="sidebar-button" title={tooltip}>
    {icon}
    {notifications && <span className="sidebar-notification">{notifications}</span>}
  </button>
)

export default Sidebar

