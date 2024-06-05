// import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";

export default function Popular({ item }) {
  const nav = useNavigate();
  return (
    <Card
      style={{
        padding: "20px",
        flexGrow: 1,
        flexBasis: 345,
        borderRadius: "15px",
        transition: "transform 0.5s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardMedia
        component="img"
        alt={item.title}
        height="200"
        image={item.img}
        sx={{ borderRadius: "15px" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ height: "63px", overflowY: "auto" }}
        >
          {item.desc}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <StarBorderOutlinedIcon sx={{ color: "#FFD700" }} />
          <Typography variant="h6" fontWeight={"bold"} noWrap component="div">
            {item.rating}
          </Typography>
        </div>
        <Button
          variant="contained"
          size="medium"
          onClick={() => nav("/game/" + item.gameID)}
        >
          See More
        </Button>
      </CardActions>
    </Card>
  );
}
