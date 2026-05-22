import React, { useState } from "react";
import { Modal, IconButton, Box, Backdrop, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

// 1. Tambahkan parameter variasi nama properti di dalam destructuring
const Certificate = ({ img, ImgSertif, Img }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // 2. Satukan semua kemungkinan ke dalam satu variabel konstan
  const finalSrc = img || ImgSertif || Img;

  return (
    <Box component="div" sx={{ width: "100%" }}>
      {/* Thumbnail */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          border: "1px solid rgba(255,255,255,0.05)",
          backgroundColor: "rgba(255,255,255,0.02)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 30px rgba(20,184,166,0.15)",
            borderColor: "rgba(20,184,166,0.3)",

            "& .overlay": {
              opacity: 1,
            },

            "& .hover-content": {
              transform: "translate(-50%, -50%)",
              opacity: 1,
            },

            "& .certificate-image": {
              filter: "contrast(1.02) brightness(1) saturate(1.05)",
              transform: "scale(1.03)",
            },
          },
        }}
      >
        {/* Image */}
        <Box
          sx={{
            position: "relative",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(3,20,17,0.2)",
              zIndex: 1,
            },
          }}
        >
          {/* 3. Ubah kondisi pengecekan menggunakan finalSrc */}
          {finalSrc ? (
            <img
              className="certificate-image"
              src={finalSrc}
              alt="Professional Certificate"
              loading="lazy"
              onClick={handleOpen}
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "cover",
                filter: "contrast(1.05) brightness(0.85) saturate(1)",
                transition: "all 0.5s ease",
                aspectRatio: "16/11.5",
                cursor: "pointer",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                aspectRatio: "16/11.5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              <Typography variant="caption">Image Not Found</Typography>
            </Box>
          )}
        </Box>

        {/* Overlay */}
        <Box
          className="overlay"
          onClick={handleOpen}
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(3,20,17,0.85), rgba(20,184,166,0.2))",
            opacity: 0,
            transition: "all 0.3s ease",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              opacity: 0,
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            <FullscreenIcon
              sx={{
                fontSize: 40,
                mb: 1,
                color: "#2dd4bf",
                filter: "drop-shadow(0 2px 8px rgba(20,184,166,0.4))",
              }}
            />

            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              View Certificate
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
          sx: {
            backgroundColor: "rgba(3,20,17,0.9)",
            backdropFilter: "blur(8px)",
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              bgcolor: "rgba(4,33,27,0.8)",
              border: "1px solid rgba(20,184,166,0.2)",
              zIndex: 3,

              "&:hover": {
                bgcolor: "#14b8a6",
                color: "black",
                transform: "scale(1.1)",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </IconButton>

          {/* 4. Ubah tag image modal menggunakan finalSrc */}
          {finalSrc && (
            <img
              src={finalSrc}
              alt="Certificate Full View"
              loading="lazy"
              style={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "90vh",
                margin: "0 auto",
                objectFit: "contain",
                borderRadius: "8px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;
