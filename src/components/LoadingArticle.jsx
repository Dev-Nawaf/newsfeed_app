import { Box, CardActionArea, CardContent, Skeleton } from "@mui/material";
import { StyledCard } from "./StyledCard";

const LoadingArticle = () => {
  return (
    <StyledCard>
      <CardActionArea>
        {/* skeleton for image */}
        <Skeleton variant="rectangular" height={200} />

        <CardContent>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        </CardContent>
      </CardActionArea>
      <Box p={2}>
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
        <Skeleton variant="text" width={200} sx={{ fontSize: "1.5rem" }} />
      </Box>
    </StyledCard>
  );
};

export default LoadingArticle;
