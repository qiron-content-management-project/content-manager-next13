"use client";

import React, { useContext, useEffect, useState } from "react";
import MultipleSelect from "./MultipleSelect";
import { TextField } from "@mui/material";
import { AuthContext } from "@app/contexts/authContext";
import { findAllCategories } from "@app/api/ApiCategory";
import { useRouter } from "next/navigation";
import { createUser } from "@app/api/ApiUser";
import AlertComponent from "./AlertComponent";
import SelectComponent from "./SelectComponent";
import { findAllRoles } from "@app/api/ApiRole";

const RegisterForm = () => {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ categories, setCategories] = useState([]);
  const [ permissions, setPermissions] = useState([]);
  const [selectedPermission, setSelectedPermission] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [popUpType, setPopUpType] = useState("");

  useEffect(() => {
    const callApiFindAllCategories = async () => {
      const body = await findAllCategories(authState);

      setCategories(body);
    }

    try {
      callApiFindAllCategories();
    } catch (error) {
      console.log(error);
    }
  }, [authState]);

  useEffect(() => {
    const callApiFindAllRoles = async () => {
      const body = await findAllRoles(authState);

      setPermissions(body);
    }

    try {
      callApiFindAllRoles();
    } catch (error) {
      console.log(error);
    }
  }, [authState]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await createUser(authState, name, email, password, selectedCategories, selectedPermission);

    if(response?.status === 201) {
      setMessage("Novo usuário criado");
      setPopUpType("success");
    } else {
      console.log(response.message);
      setMessage("Erro ao criar usuário");
      setPopUpType("error");
    }
    setOpen("true");
  };

  return (
    <>
      {open ?
          <AlertComponent 
              open={open} 
              setOpen={setOpen}
              message={message}
              type={popUpType}
          />
          :null
      }
      <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-9">
        <div className="row d-flex justify-content-center">
          <div class="max-w-md w-full space-y-8">
            <div>
              <h2 class="text-center text-3xl font-extrabold text-gray-900">
                Criar usuário
              </h2>
            </div>

            <div class="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-9">
            <form
              class="space-y-6"
              onSubmit={submitHandler}
            >
              <div>
                <TextField variant="standard" label="Nome" id="outlined-basic" onChange={(e) => setName(e.target.value)} />
              </div>

              <div>
                <TextField variant="standard" label="Email" id="outlined-basic" onChange={(e) => setEmail(e.target.value)}/>
              </div>

              <div>
                <TextField variant="standard" label="Senha" id="outlined-basic" onChange={(e) => setPassword(e.target.value)}/>
              </div>

              <div>
                <MultipleSelect data={categories} selected={selectedCategories} setData={setSelectedCategories} label="Categorias"/>
              </div>

              <div>
              <p class="text-center text-indigo-900">
                Permissão:
              </p>
                <SelectComponent 
                  data={permissions} 
                  selected={selectedPermission}  
                  type="object"
                  fieldName="name"
                  setData={setSelectedPermission} 
                  disabled={false}
                />
              </div>
            <div>
              <button type="submit" class="mt-9 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Registrar
              </button>
            </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;