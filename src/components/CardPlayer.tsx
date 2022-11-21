import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import Divider from "@mui/material/Divider";

type CardProps = {
  id: number;
  src: string;
  rank: string;
  units: UnitProps[];
};
type UnitProps = {
  id: string;
  unitType: string;
  src: string;
};
export default function CardPlayer({ id, units, src, rank }: CardProps) {
  return (
    <Card
      key={id}
      sx={{
        width: 250,
        backgroundColor: "#fafafa",
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
      }}
    >
      <CardMedia sx={{ height: 250 }} image={src} />
      <Divider variant="middle" />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography color="primary" variant="h4">
          Player {id}
        </Typography>
        <Typography color="textSecondary" variant="h5" sx={{ pt: 2, mb: 2 }}>
          {rank}
        </Typography>
        {units.map((unit) => (
          <Typography key={unit.id} color="textSecondary" variant="subtitle2" sx={{ mb: 1 }}>
            {unit.unitType}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
