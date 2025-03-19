import styled from "styled-components";
import backgroundSrc from "../../assets/background.svg?react";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  backgroundImage: `url(${backgroundSrc})`,
  backgroundSize: "cover",
  position: "relative",
  overflow: "hidden",
});
