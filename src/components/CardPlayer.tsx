import { Typography, Card, CardContent, CardMedia } from "@mui/material";

type CardProps = {
  id: number;
  src: string;
  rank: string;
  units: UnitProps[];
};
type UnitProps = {
  unitId: number;
  unitType: string;
  src: string;
};
export default function CardPlayer({ id, units, src, rank }: CardProps) {
  return (
    <Card
      sx={{
        width: 250,
        boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fafafa",
      }}
    >
      <CardMedia sx={{ height: 200 }} image={src} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography color="primary" variant="h4">
          Player {id}
        </Typography>
        <Typography color="textSecondary" variant="h5">
          {rank}
        </Typography>
        {units.map((unit) => (
          <Typography
            key={unit.unitId}
            color="textSecondary"
            variant="subtitle2"
          >
            {unit.unitType}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
