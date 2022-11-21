import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import Divider from "@mui/material/Divider";

type CardProps = {
  id: string;
  img: string;
  units: UnitProps[];
};
type UnitProps = {
  unitId: number;
  unitType: string;
};

export default function CardPlayer({ units, img, id }: CardProps) {
  console.log(units);
  function groupByOwner(units) {
    const groupedByOwner = new Map();
    units?.forEach((item) => {
      const key = item.owner;
      const collection = groupedByOwner.get(key);
      if (!collection) {
        groupedByOwner.set(key, [item]);
      } else {
        collection.push(item);
      }
      console.log(groupedByOwner);
    });
    return Array.from(groupedByOwner);
  }
  const groupedByOwner = groupByOwner(units);
  console.log(groupedByOwner);
  return (
    <>
      {groupedByOwner?.map((item) => (
        <Card
          key={item[0]}
          sx={{
            width: 250,
            backgroundColor: "#fafafa",
            boxShadow:
              "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <CardMedia sx={{ height: 250 }} image={img} />
          <Divider variant="middle" />

          <CardContent sx={{ textAlign: "center" }}>
            <Typography color="primary" variant="h4">
              {id}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              sx={{ overflowWrap: "break-word", mt: 1 }}
            >
              Address: {item[0]}
            </Typography>
            <Typography color="primary" variant="h5" sx={{ pt: 2, mb: 2 }}>
              Units
            </Typography>
            {item[1].map((unit) => (
              <>
                <Typography
                  key={unit.unitId}
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{ mb: 1 }}
                >
                  {unit.unitType}
                </Typography>
              </>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
}
