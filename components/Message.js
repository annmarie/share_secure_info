import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function Message(props) {
  return (
    <Container size="sm" style={{ textAlign: "center" }}>
      <Typography variant="h4" color="textPrimary">
        {props.text}
      </Typography>
    </Container>
  );
}
