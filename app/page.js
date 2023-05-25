"use client"
import ContenedorLista from "@/components/ContenedorLista"
import Head from 'next/head'

export default function Home() {
  return (
    <main id="contenedor-lista">

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <ContenedorLista />
    </main>
  )
}
