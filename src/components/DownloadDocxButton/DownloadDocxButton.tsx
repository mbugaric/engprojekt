import React from "react";
import { useI18n } from "../../i18n/useI18n";
import "./DownloadDocxButton.scss";

const DownloadDocxButton: React.FC = () => {
  const { t } = useI18n();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/downloads/references.docx"; 
    link.download = "references.docx";
    link.click();
  };

  return (
    <div className="download-docx-wrapper">
      <button className="download-docx-button" onClick={handleDownload}>
        {t("downloadDocx")}
      </button>
    </div>
  );
};

export default DownloadDocxButton;
