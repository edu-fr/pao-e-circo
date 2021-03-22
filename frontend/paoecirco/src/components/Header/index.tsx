import React, { useCallback, useRef, useState } from "react";
import "./styles.css";
import Logo from "../../assets/logo.png";
import Avatar from "../../assets/avatar-mini.jpg";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FormHandles } from "@unform/core";
import * as yup from "yup";
import api from "../../services/api";
import { Form } from "@unform/web";
import Input from "../Input";

interface StateBuscaUsuario {
  name: string;
  titulo: string;
  avaliacao: string;
  cidade: string;
  estado: string;
}

interface StateBuscaAnuncio {
  titulo: string;
  valorEstimado: string;
  itemDesejado: string;
  anunciante: string;
}

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const formRef = useRef<FormHandles>(null);
  const [stateUsuario, setStateUsuario] = useState<StateBuscaUsuario>({
    name: "",
    avaliacao: "",
    cidade: "",
    estado: "",
    titulo: "",
  });

  const [stateAnuncio, setStateAnuncio] = useState<StateBuscaAnuncio>({
    titulo: "",
    valorEstimado: "",
    itemDesejado: "",
    anunciante: "flavin do pneu",
  });

  function handleLogout() {
    setIsLoggedIn(false);
  }

  const handleSubmitUsuario = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          name: yup.string().required("Campo obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log(data);
        const resultado = await api.post("clientess", data);

        setStateUsuario(resultado.data);
        console.log(stateUsuario);
      } catch (err) {
        //se for um erro do yup, tipo não digitou senha, email inválido, etc
        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [stateUsuario]
  );

  const handleSubmitAnuncio = useCallback(
    async (data: any) => {
      try {
        formRef.current?.setErrors({});
        const schema = yup.object().shape({
          anuncio: yup.string().required("Campo obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        console.log(data);
        const resultado = await api.post("anuncioss", data);

        setStateAnuncio(resultado.data);
        console.log(stateAnuncio);
      } catch (err) {
        //se for um erro do yup, tipo não digitou senha, email inválido, etc
        if (err instanceof yup.ValidationError) {
          return;
        }
      }
    },
    [stateAnuncio]
  );

  return (
    <div className="header">
      <div className="ladoEsquerdo">
        <Link to="/">
          <img src={Logo} alt="logo" className="logo" />
        </Link>

        <div className="containerAleatorio">
          <Form
            ref={formRef}
            onSubmit={handleSubmitUsuario}
            className="containerAleatorio"
          >
            <Input
              type="text"
              icon={FiSearch}
              name="name"
              onSubmit={handleSubmitUsuario}
              placeholder="Buscar um usuário..."
              className="inputText"
            ></Input>

            <button className="iconContainer" type="submit">
              <Link
                to={{
                  pathname: "/buscausuario",
                  state: {
                    name: stateUsuario.name,
                    avaliacao: stateUsuario.avaliacao,
                    cidade: stateUsuario.cidade,
                    estado: stateUsuario.estado,
                  },
                }}
                className="linkContainerHeader"
              >
                Buscar usuário
              </Link>
            </button>
          </Form>
          <Form
            ref={formRef}
            onSubmit={handleSubmitAnuncio}
            className="containerAleatorio"
          >
            <Input
              type="text"
              icon={FiSearch}
              name="anuncio"
              onSubmit={handleSubmitAnuncio}
              placeholder="Buscar um anúncio..."
              className="inputText"
            ></Input>
            <button className="iconContainer" type="submit">
              <Link
                to={{
                  pathname: "/buscaanuncio",
                  state: {
                    titulo: stateAnuncio.titulo,
                    anunciante: "Flavin do pneu",
                    itemDesejado: stateAnuncio.itemDesejado,
                    valorEstimado: stateAnuncio.valorEstimado,
                  },
                }}
                className="linkContainerHeader"
              >
                Buscar anúncio
              </Link>
            </button>
          </Form>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="loggedContainer">
          <img src={Avatar} className="avatar" alt="avatar" />
          <Link to="/destaques" className="destaques">
            DESTAQUES
          </Link>
          <Link to="/createexchangead" className="linkLogged">
            ANUNCIAR
          </Link>

          <Link to="/makeanoffer" className="link">
            <p> placeholder make an offer</p>
          </Link>
          <button onClick={handleLogout} className="sair">
            SAIR
          </button>
        </div>
      ) : (
        <div className="loggedContainer">
          <Link to="/signin" className="linkSignin">
            <button className="btLogin">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
