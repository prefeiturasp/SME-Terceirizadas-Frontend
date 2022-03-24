import React, { useEffect, useState, useContext } from "react";
import { Spin, Pagination } from "antd";
import "./styles.scss";
import {
  getDownloads,
  setDownloadMarcarDesmarcarLida,
  deletarDownload
} from "services/downloads.service";
import { gerarParametrosConsulta } from "helpers/utilities";
import ListagemDownloads from "./components/ListagemDownloads";
import { CentralDeDownloadContext } from "context/CentralDeDownloads";
import { toastError, toastSuccess } from "components/Shareable/Toast/dialogs";

export default () => {
  const centralDownloadContext = useContext(CentralDeDownloadContext);

  const [carregando, setCarregando] = useState(false);
  const [downloads, setDownloads] = useState([]);

  const [totalDownloads, setTotalDownloads] = useState(0);

  const [page, setPage] = useState(1);

  const buscarDownloads = async page => {
    setCarregando(true);
    let payload = gerarParametrosConsulta({ page });
    let data = await getDownloads(payload);

    setDownloads(data.results);
    setTotalDownloads(data.count);
    setCarregando(false);
  };

  const nextPage = page => {
    buscarDownloads(page);
    setPage(page);
  };

  const marcarVisto = async (download, index) => {
    setCarregando(true);
    const payload = {
      uuid: download.uuid,
      visto: !download.visto
    };

    let downloadsNew = downloads;
    downloadsNew[index].visto = !downloadsNew[index].visto;
    setDownloads([...downloadsNew]);

    await setDownloadMarcarDesmarcarLida(payload);
    centralDownloadContext.getQtdeDownloadsNaoLidas();
    setCarregando(false);
  };

  const deletaDownload = async download => {
    try {
      setCarregando(true);
      await deletarDownload(download.uuid);
      setCarregando(false);
      toastSuccess("Download deletado com sucesso!");
      let downloadsNew = downloads.filter(d => d.uuid !== download.uuid);
      setDownloads([...downloadsNew]);
    } catch {
      toastError("Ocorreu um erro ao deletar o download!");
    }
  };

  useEffect(() => {
    buscarDownloads(1);
    setPage(1);
  }, []);

  return (
    <Spin tip="Carregando..." spinning={carregando}>
      <div className="card mt-3 card-downloads">
        <div className="card-body downloads">
          {downloads && (
            <>
              <ListagemDownloads
                downloads={downloads}
                deletaDownload={deletaDownload}
                marcarVisto={marcarVisto}
              />
              <div className="row">
                <div className="col">
                  <Pagination
                    current={page}
                    total={totalDownloads}
                    showSizeChanger={false}
                    onChange={nextPage}
                    pageSize={10}
                    className="float-left mb-2"
                  />
                </div>
              </div>
            </>
          )}
          {totalDownloads === 0 && (
            <div className="text-center mt-5">
              Não existem downloads para os critérios de busca utilizados.
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
};
