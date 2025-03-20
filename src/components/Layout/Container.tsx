import styled from "styled-components";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  position: "fixed", // Фиксируем контейнер чата
  top: 0,
  left: 0,
  zIndex: 1000, // Высокий z-index для перекрытия содержимого страницы
  pointerEvents: "none", // Позволяет кликать сквозь контейнер на элементы страницы
  // Делаем видимыми только элементы внутри контейнера
  "& > *": {
    pointerEvents: "auto",
  },
});