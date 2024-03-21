import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const ExperienceChart = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 30,
          right: 40,
          left: 0,
          bottom: 10,
        }}
      >
        <CartesianGrid stroke="#02080977" strokeDasharray="3" />
        <XAxis dataKey="label" scale="auto" stroke="#6b7280CC" />
        <YAxis stroke="#6b7280CC" />
        <Tooltip
          contentStyle={{
            background: '#11151c',
            padding: '0.5rem',
            borderColor: '#ffffff22',
            boxShadow: '2px 2px 10px #000000AA',
            borderRadius: '0.5rem',
            color: 'white',
          }}
          labelStyle={{ lineHeight: '1rem' }}
          itemStyle={{ lineHeight: '1rem' }}
        />
        {/* <Legend /> */}

        <Line
          dataKey="points"
          stroke="#10b981"
          label="Cards added"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExperienceChart;
