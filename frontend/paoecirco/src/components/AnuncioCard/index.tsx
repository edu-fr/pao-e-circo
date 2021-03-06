import React, { useCallback, useRef, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { components } from "react-select";
import { BsPencil } from "react-icons/bs"

interface AnuncioCard {
    Img: string;
    Titulo: string;
    Valor: number;
    isOwner: boolean
}

const AnuncioCard: React.FC<AnuncioCard> = ({ Img, Titulo, Valor, isOwner }) => {
    return (
        <div id="CardConteiner">
            <ul className="gridCard">
                <li className="Item-CardAnuncio-Img"><img id="Anuncio-img" src={Img} alt={Titulo} /></li>
                { isOwner && <li className="Item-CardAnuncio-Edit"><button className="btn-edit"><BsPencil /></button></li> }
                <li className="Item-CardAnuncio-Desc">
                    <div className="sub-grid-desc">
                        <div id="Valor-estimado">Valor estimado: <b id="valor">R${Valor}</b></div>
                        <div id="Titulo-anuncio">{Titulo}</div>
                    </div>
                </li>
                { isOwner && <li className="Item-CardAnuncio-Dest"><button className="btn-destaque">Destacar</button></li> }
            </ul>
        </div>
    )
};

export default AnuncioCard;