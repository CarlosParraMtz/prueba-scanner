import { ListItem } from "@mui/material"

export default function Producto({producto}) {
    return (
        <ListItem divider disablePadding>
            <div className="producto">
                <div className="producto-imagen">
                    <img alt={producto.name} src={producto.image} />
                </div>
                <div className="producto-texto">
                    <span className="producto-name" > {producto.name} </span>
                    <span className="producto-model" > {producto.model} </span>
                    <span className="producto-precio" > {producto.precio} </span>
                    <span className="producto-cm" > {producto.color} </span>
                    <span className="producto-cm" > {producto.material} </span>
                </div>
            </div>
        </ListItem>
    )
}
