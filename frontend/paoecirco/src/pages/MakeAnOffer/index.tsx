import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { MdSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import { Container, TituloDestaque, ContainerItemDestaque } from "./styles";
import { ExternalContainer, ContainerFlexVertical, ContainerFlexVerticalWider, ContainerComments } from "./styles";
import Header from "../../components/Header";
import { Usuariofake, Anunciofake } from "../../components/Usuariofake";

const AcceptOffer: React.FC = (props: any) => {
  const { nome, cidade, estado, avaliacao, numTrocas, tituloAnuncio /*, imagens*/, objeto, categoria, estadoConservacao, descricao, itensTroca, valorEstimado } =
    (props.location && props.location.state) || {};
  return (
    <>
      <Header />
      
      <ExternalContainer className="ExternalContainer">
        
        {
          Usuariofake.map((usuario, index) => {
            return(
              <ContainerFlexVertical className = "VerticalContainerLeft">
              
                <h2> Informações do Anunciante </h2>

                {/* Foto */}

                <p> Nome: {usuario.nome} </p>
                <p> Cidade: {usuario.cidade} </p>
                <p> Estado: {usuario.estado} </p>
                <p> Avaliação: {usuario.avaliacao} </p>
                <p> Trocas concretizadas: {usuario.trocasConcretizadas} </p>
              </ContainerFlexVertical>
            );        
          })
        }

        {
          Anunciofake.map((anuncio, index) => {
            return(
              <>
                <ContainerFlexVerticalWider className = "VerticalContainerMiddle">
                  <h1> {tituloAnuncio} </h1>
                  {/* FOTO */ } 

                  <ContainerComments>
                    <h2> Comentários </h2>
                  </ContainerComments>

                </ContainerFlexVerticalWider>

                <ContainerFlexVertical className = "VerticalContainerRight">
                  <h2> Informações do anúncio </h2>
                  <p> Objeto: {anuncio.objeto} </p>
                  <p> Categoria: {anuncio.categoria} </p>
                  <p> Estado: {anuncio.estado} </p>
                  <p> Descricao: {anuncio.descricao} </p>
                  <p> Itens desejados em troca: {anuncio.itens} </p>
                  <p> Valor estimado: {anuncio.valor} </p>
                </ContainerFlexVertical>
              </>
            );
          })
        }
      </ExternalContainer>
    </>
  );
};

//styles

export default AcceptOffer;
