import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";

interface Props {
  data: {
    name: string;
    in: number;
    out: number;
  }[];
}

export const Bars = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} stackOffset="sign">
        <XAxis dataKey="name" />
        <Bar dataKey="in" fill="#b5eed6" stackId="stack" />
        <Bar dataKey="out" fill="#e6b8b7" stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  );
};
