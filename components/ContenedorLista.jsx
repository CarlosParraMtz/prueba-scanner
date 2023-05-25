"use client"
//* Módulos
import { useEffect, useState } from 'react';
import ReactBarcodeReader from 'react-barcode-reader';


//* Componentes
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
} from '@mui/material';
import Producto from './Producto';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import listaJson from "./productos.json";

//* Funciones
import axiosGet from '@/functions/axiosGet';



export default function ContenedorLista() {

  const [lista, setLista] = useState([]);
  const [filtroTxt, setFiltroTxt] = useState("");
  //  const [paginaApi, setPaginaApi] = useState(1)

  const [dialogScanner, setDialogScanner] = useState(false)

  async function getProductos() {
    const _lista = await axiosGet(filtroTxt)//, paginaApi);

  }

  //useEffect(() => {
  //TODO revisar el query de la api para
  //TODO poder seguir trabajando con ella
  //getProductos();
  //}, [])






  //* Infinite scroll


  const cargarMasElementos = (nuevaCantidad) => {

    //! Aquí va la llamada a la API para obtener más elementos
    // const nuevos = await axiosGet(identificador, paginaApi)

    let _lista = [...lista]
    for (let i = lista.length; i < nuevaCantidad; i++) {
      if (listaJson[i] != undefined) {
        _lista.push(listaJson[i])
      }
    }

    setTimeout(() => { // Este timeout simula la espera a la base de datos
      setLista(_lista);
    }, 1000)

  };

  useEffect(() => {

    // Función para cargar más elementos cuando se llega al final de la página
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight) {
        cargarMasElementos(lista.length + 10)
      }
    };

    // Agregar el evento de scroll al objeto window
    window.addEventListener('scroll', handleScroll);

    // Eliminar el evento de scroll al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };





  }, [cargarMasElementos]);

  useEffect(() => {
    cargarMasElementos(lista.length + 10)
  }, [])






  //* Funciones para el input

  const borrarFiltro = () => {
    setFiltroTxt("")
  }

  const abrirLector = () => {
    setDialogScanner(true)
  }

  const cerrarLector = () => {
    setDialogScanner(false)
  }





  //* Validador de dirección de scroll

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const handleScroll = () => {
    setIsNavVisible(prevScrollPos > window.scrollY || window.scrollY < 70);
    setPrevScrollPos(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);









  //* Scanner

  const handleScan = (data) => {
    setFiltroTxt(data);
    cerrarLector();
  };










  return (
    <div className='container'>

      {
        dialogScanner
          ? <div className="scanner-container">
            <div className="scanner-head">
              <button onClick={cerrarLector} ><ArrowBackIcon /> Regresar</button>
              <span><b>Escanea el código</b></span>
            </div>
            <ReactBarcodeReader
              onScan={handleScan} 
              onError={(error) => console.log(error)}
            />
          </div>

          : <>
            {/* Búsqueda */}

            <div className={isNavVisible ? "busqueda-component top-70" : "busqueda-component top-0"}>
              <div className="busqueda-elementos">
                <div className="input-busqueda">
                  <img alt="search-icon" src="search-icon.svg" />
                  <input
                    type="text"
                    placeholder='Buscar producto'
                    value={filtroTxt}
                    onChange={e => setFiltroTxt(e.target.value)}
                  />
                  <IconButton onClick={filtroTxt === "" ? abrirLector : borrarFiltro} >
                    {
                      filtroTxt === ""
                        ? <img alt="barcode-icon" src="barcode-icon.svg" />
                        : <CancelIcon />
                    }

                  </IconButton>
                </div>

                <a href="#" className="a-filtros" >Filtros</a>
              </div>
              {(window != undefined && window.scrollY > 0) && <div className="barra-azul"></div>}
            </div>


            {/* Lista */}
            <div className="lista-container">
              <List>
                {
                  lista
                    .filter(producto => producto.id.toString().includes(filtroTxt))
                    .map(producto => <Producto key={producto.id} producto={producto} />)
                }
              </List>

              {
                (filtroTxt != ""
                  && lista.filter(producto => producto.id.toString().includes(filtroTxt)).length === 0) &&

                <div className="sin-resultados">
                  <SearchOffIcon fontSize='large' />
                  <p>No existen resultados para esta búsqueda</p>
                </div>
              }

            </div>

          </>
      }













    </div>
  )
}
