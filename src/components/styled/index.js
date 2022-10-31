import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const VBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const HBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
});

export const StyledGridItem = ({ children }) => {
  return (
    <Grid item xxs={6} xs={6} sm={4} md={3} lg={2}>
      {children}
    </Grid>
  );
};
