import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useContext } from "react";
import SystemContext from "../Context/SystemContext";

export const ReviewDate = () => {
  const { INITIAL_DATA, getCurrentData } = useContext(SystemContext);
  const currentUser = getCurrentData();

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Dados Pessoais
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={`
            Nome: ${currentUser.firstName} ${currentUser?.lastName}
            `}
            secondary={`Email: ${currentUser?.email}`}
          />
          <ListItemText
            primary={`
            CPF: ${currentUser.cpf}
            `}
            secondary={`Telefone: ${currentUser?.phoneNumber}`}
          />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom>
        Interesses de Destinos
      </Typography>
      {currentUser?.country.map((country) => {
        return (
          <div className="flex flex-col gap-2" key={country.code}>
            <div className="flex flex-col">
              <span>País: {country.name_ptbr}</span>
              <span>Código: {country.code}</span>
            </div>

            {currentUser.city.map((city) => {
              if (city?.country_code === country?.code)
                return (
                  <div
                    className="flex gap-2 justify-between items-start"
                    key={city.id}
                  >
                    <div className="flex flex-col">
                      <span>Cidade: {city.name_ptbr}</span>
                      <span>Código do País: {city.country_code}</span>
                    </div>
                    {city.url1 || city.url2 ? (
                      <img
                        className="max-w-[50%]"
                        src={city.url1 || city.url2 || ""}
                        alt={`Imagem da cidade ${city?.name_ptbr}`}
                      />
                    ) : null}
                  </div>
                );
            })}
          </div>
        );
      })}
    </div>
  );
};
