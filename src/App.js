import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  Pagination,
  InputLabel,
  FormControl,
  Link,
  Button,
} from "@mui/material";
import "./App.css";
import Upload from "./components/Upload/Upload";
import Stack from "@mui/material/Stack";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("belgium");
  const [jobStatus, setJobStatus] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState();

  useEffect(() => {
    fetchProducts();
  }, [selectedCountry, page, recordsPerPage]);

  const fetchProducts = () => {
    axios
    .get(`http://localhost:3000/products`, {
      params: {
        country: selectedCountry,
        per_page: recordsPerPage,
        page: page,
      },
    })
    .then((response) => {
      setProducts(response.data.products);
      setTotalPages(response.data.total_pages);
    })
    .catch((error) => {
      console.error("Erro ao buscar produtos", error);
    });

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-filter">
          <FormControl sx={{ m: 1, minWidth: 180 }} size="small">
            <InputLabel id="demo-select-small-label">Filtrar</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-customized-select"
              value={selectedCountry}
              label="Filtrar"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <MenuItem value="belgium">Bélgica</MenuItem>
              <MenuItem value="france">França</MenuItem>
              <MenuItem value="germany">Alemanha</MenuItem>
              <MenuItem value="portugal">Portugal</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Upload />
      </div>

      {jobStatus === "processando" && (
        <p className="status">Processando arquivo...</p>
      )}
      {jobStatus === "concluido" && (
        <p className="status success">Processo concluído!</p>
      )}

      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "space-between", marginTop: '20px' }}
      >
        <h1>Lista de Produtos</h1>
        <Select
          labelId="demo-select-small-label"
          id="demo-customized-select"
          value={recordsPerPage ? recordsPerPage : 10}
          label="Records per page"
          onChange={(e) => setRecordsPerPage(e.target.value)}
        >
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="25">25</MenuItem>
          <MenuItem value="50">50</MenuItem>
          <MenuItem value="100">100</MenuItem>
        </Select>
      </Stack>

      <div className="list-products">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div id={product.id} className="product">
              <div>
                <p className="product_name">{product.product_name}</p>
                <p className="product_brand">{product.brand}</p>
                <p className="product_country">{product.country}</p>
                <p className="product_price">{product.price}</p>
              </div>
              <Link href={product.url} target="_blank">
                <Button
                  variant="outlined"
                  className="product_button"
                  sx={{ width: "100%" }}
                >
                  Ver produto
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      />
    </div>
  );
}

export default App;
