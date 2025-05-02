interface Props {
  type?: "in" | "out" | "default";
  title?: string;
}

const colors = {
  in: {
    background: "#b5eed6",
    color: "#00796B",
  },
  out: {
    background: "#e6b8b7",
    color: "#C62828",
  },
  default: {
    background: "#e4e2e2",
    color: "gray",
  },
};

export const Badge = ({ type = "default", title }: Props) => {
  return (
    <div
      style={{
        background: colors[type].background,
        color: colors[type].color,
        padding: "5px 10px",
        borderRadius: "5px",
        display: "inline-block",
        minWidth: "100px",
        textAlign: "center",
      }}
    >
      {type === "in" ? "ENTRADA" : type === "out" ? "SAÍDA" : title}
    </div>
  );
};
