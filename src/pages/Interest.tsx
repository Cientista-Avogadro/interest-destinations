import {
  AppBar,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  Divider,
  Grid,
  IconButton,
  IconButtonProps,
  List,
  ListItem,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Copyright } from "../components/CopyRight";
import SystemContext from "../Context/SystemContext";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import HelpIcon from "@mui/icons-material/Help";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Interest() {
  const { getInterestList, deleteInterestList } = useContext(SystemContext);
  const [open, setOpen] = useState(-1);

  const handleExpandClick = (index: number) => {
    setOpen(open === index ? -1 : index);
  };

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <Typography variant="h6" color="inherit" noWrap>
              Ally Hub
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Typography component="h1" variant="h4" my="8px" align="center">
        Sistema de Marcações de Interesses - Histórico
      </Typography>
      <main
        className={`${
          getInterestList().length > 0
            ? "grid grid-cols-3 gap-3 p-8 items-start"
            : ""
        } `}
      >
        {getInterestList().length > 0 ? (
          getInterestList().map((interest, index) => (
            <Card key={interest.id}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {`${interest?.firstName[0]}${interest?.lastName[0]}`}
                  </Avatar>
                }
                action={
                  <IconButton
                    aria-label="settings"
                    onClick={() => deleteInterestList(interest.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                title={`${interest?.firstName} ${interest?.lastName}`}
                subheader={`${new Date(
                  interest.createdAt
                ).toLocaleDateString()} - ${new Date(
                  interest.createdAt
                ).getHours()}:${new Date(
                  interest.createdAt
                ).getMinutes()}:${new Date(interest.createdAt).getSeconds()}`}
              />
              {interest.city[0]?.url1 || interest.city[0]?.url2 ? (
                <CardMedia
                  component="img"
                  src={interest.city[0]?.url1 || interest.city[0]?.url2 || ""}
                  alt={`Imagem da cidade ${interest.city[0]?.name_ptbr}`}
                />
              ) : null}

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  #{interest.id.substring(-1, 8)}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={index === open}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={index === open}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={index === open} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography
                    variant="h6"
                    my="10px"
                    borderTop={"1px solid black"}
                    borderBottom={"1px solid black"}
                  >
                    Dados Pessoais
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    {`
            Nome: ${interest.firstName} ${interest?.lastName}
            `}
                  </Typography>
                  <Typography variant="h6">
                    {`Email: ${interest?.email}`}
                  </Typography>
                  <Typography variant="h6">
                    {`
            CPF: ${interest.cpf}
            `}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {`Telefone: ${interest?.phoneNumber}`}
                  </Typography>

                  <Typography
                    variant="h6"
                    my="10px"
                    borderTop={"1px solid black"}
                    borderBottom={"1px solid black"}
                  >
                    Interesses de Destinos
                  </Typography>
                  {interest?.country.map((country) => {
                    return (
                      <div key={country.code}>
                        <Typography>País: {country.name_ptbr}</Typography>
                        <Typography>Código: {country.code}</Typography>

                        {interest.city.map((city) => {
                          if (city?.country_code === country?.code)
                            return (
                              <div
                                className="flex gap-2 justify-between items-start"
                                key={city.id}
                              >
                                <div className="flex flex-col">
                                  <span>Cidade: {city.name_ptbr}</span>
                                  <span>
                                    Código do País: {city.country_code}
                                  </span>
                                  {city?.url1 || city?.url2 ? (
                                    <img
                                      className="max-w-full"
                                      src={city?.url1 || city?.url2 || ""}
                                      alt={`Imagem da cidade ${city?.name_ptbr}`}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            );
                        })}
                      </div>
                    );
                  })}
                </CardContent>
              </Collapse>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center flex-col gap-5 self-center">
            <HelpIcon sx={{ fontSize: 100 }} />
            <Typography>Ainda não tens um Interesse</Typography>
            <Link
              to="/"
              className="p-4 bg-gray-200 hover:bg-gray-300 transition-colors"
            >
              Historico Marcações
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
