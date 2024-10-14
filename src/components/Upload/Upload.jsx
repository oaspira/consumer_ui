import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

export default function Upload() {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Por favor, selecione um arquivo para upload.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3000/products/upload", formData, {
        onUploadProgress: (progressEvent) => {
        },
      })
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.error("Erro ao fazer upload do arquivo", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Importar novo arquivo
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Selecione o arquivo a ser importado
        </DialogTitle>
        <DialogContent>
          <label htmlFor="file-upload" className="custom-file-upload">
            Escolher arquivo
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && <p>Arquivo selecionado: {file.name}</p>}
        </DialogContent>


        {!loading ? (
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleUpload} autoFocus>
              Importar
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <LoadingButton loading loadingPosition="start" variant="outlined">
              Carregando
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>
    </React.Fragment>
  );
}
