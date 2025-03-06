"use client"

import dynamic from "next/dynamic"

// Importar o componente com carregamento dinâmico para evitar problemas de SSR
const MedicalInterface = dynamic(() => import("@/components/medical-interface"), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center bg-[#f5f6fa]">
      <div className="animate-pulse text-[#3248f2] text-xl">Carregando interface médica...</div>
    </div>
  ),
})

export default function Home() {
  return <MedicalInterface />
}

