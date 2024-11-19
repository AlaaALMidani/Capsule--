import React, { useState } from "react";
import Button from "@mui/material/Button";
import Post from "../../components/Post.js";
import { Box, Grid2, useMediaQuery } from "@mui/material";
import AddPost from "../../components/AddPost.js";
import Popup from "reactjs-popup";
//import doctor from "../../assets/img/doctorImage2.png";
import image from "../../assets/img/image.png";
import camera from "../../assets/img/camera.svg";

export const PharmacyHome = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [isOpen, setIsOpen] = useState(false); 
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false); 
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NzNiNDZiYWY4NDYwNDk0ZjE5ODRiZDkiLCJpYXQiOjE3MzE5Mzc5NzgsImV4cCI6MTczMjAyNDM3OH0.2p2hy1ug8erSlLukGneCn_VfVR3-fNgxY2c9RVPvMuc"
  const posts = [
    { id: 1, title: "Post 1", content: "Content of Post 1" },
    { id: 2, title: "Post 2", content: "Content of Post 2" },
    { id: 3, title: "Post 3", content: "Content of Post 3" },
  ];

  return (
    <div className={`${isOpen ? "backdrop-brightness-150" : ""}`}>
      <div
        className={`bg-[#f0f4f8] bg-gradient-to-tr from-[#d9e9f6] to-[#1b8942] p-[5%] pt-[100px] flex items-center justify-center transition-all duration-300 ${
          isOpen ? "backdrop-blur-3xl" : ""
        }`}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          <Grid2
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              fontFamily: "'Roboto', sans-serif",  // Setting default font to Roboto
            }}
          >
            {/* Text Section */}
            <Grid2
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: isMobile ? "center" : "left",
                padding: isMobile ? "10px" : "150px",
                maxWidth: isMobile ? "100%" : "60%",
                flexGrow: 1,
              }}
            >
              <h1
                style={{
                  fontSize: isMobile ? "1.5rem" : "1.8rem",
                  fontWeight: "700", // Making the header bold
                  color: "#156096",
                  marginBottom: "16px",
                }}
              >
                Welcome
              </h1>
              <p
                style={{
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  lineHeight: isMobile ? 1.4 : 1.6,
                  color: "#555555",
                  wordWrap: "break-word",
                  textAlign: isMobile ? "center" : "left",
                  marginBottom: "16px",
                }}
              >
                We’re here to assist you with your pharmacy needs. Explore the
                options below to add a new order or learn more about our
                services!
              </p>

              {/* Add New Order Button */}
              <Button
                variant="contained"
                onClick={() => setIsAddOrderOpen(true)} // Open AddOrder popup
                sx={{
                  backgroundColor: "#1b8942",
                  "&:hover": { backgroundColor: "#082544" },
                  color: "white",
                  padding: isMobile ? "10px 20px" : "12px 30px",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  width: isMobile ? "80%" : "auto",
                  maxWidth: "250px",
                  margin: "0 auto",
                  fontFamily: "'Roboto', sans-serif", // Using Roboto for the button text
                }}
              >
                Add New Order
              </Button>
            </Grid2>

            {/* Image Section */}
            <Grid2
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: isMobile ? "10px" : "20px",
                maxWidth: isMobile ? "100%" : "33%",
                flexGrow: 1,
              }}
            >
              <img
                src={image}
                alt="Doctor"
                style={{
                  width: isMobile ? "70%" : "100%",
                  maxWidth: isMobile ? "200px" : "400px",
                  height: "auto",
                  borderRadius: "8px",
                  margin: isMobile ? "0 auto" : "0",
                }}
              />
            </Grid2>
          </Grid2>
        </Box>
      </div>

      <div className="mt-6 m-auto">
        {/* Popup Trigger */}
        <Popup
          trigger={
            <div className="flex justify-center m-8">
              <img
                src={camera}
                className="h-20 mr-3 cursor-pointer"
                alt="camera"
              />
              <div className="sm:w-2/3 md:w-1/2 lg:w-1/3 cursor-pointer bg-[#103758] bg-opacity-40 px-10 shadow-lg h-20 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold">
                  Tell us about your product...
                </span>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-2xl ml-3 font-bold">
                ADD POST
              </button>
            </div>
          }
          onClose={() => setIsOpen(false)}
          open={isOpen}
          modal
          closeOnDocumentClick
        >
          {(close) => <AddPost />}
        </Popup>

        {/* Display Posts */}
        {posts.map((post) => (
          <div className="mb-4" key={post.id}>
            <Grid2 item xs={12} sm={6} md={4} spacing={2}>
              <Post title={post.title} content={post.content} />
            </Grid2>
          </div>
        ))}
      </div>
    </div>
  );
};