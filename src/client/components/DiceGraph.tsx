import { Map } from "immutable";
import React, { useState, useEffect, PureComponent, memo } from "react";
import ResponsiveContainer from "@bit/recharts.recharts.responsive-container";
import ComposedChart from "@bit/recharts.recharts.composed-chart";
import Bar from "@bit/recharts.recharts.bar";
import XAxis from "@bit/recharts.recharts.x-axis";
import YAxis from "@bit/recharts.recharts.y-axis";
import CartesianGrid from "@bit/recharts.recharts.cartesian-grid";
import Tooltip from "@bit/recharts.recharts.tooltip";

import { IDice, ICount } from "../../socket";

interface IProps {
  dices: IDice[];
  counts: ICount[];
}

export default class DiceGraph extends PureComponent<IProps> {
  static defaultProps: IProps = {
    dices: [],
    counts: [],
  };
  render() {
    const { counts, dices } = this.props;
    return (
      <div style={{ width: "60%", height: 300 }}>
        {JSON.stringify(counts)}
        <p />
        {JSON.stringify(dices)}
        <p />
        <ResponsiveContainer>
          <ComposedChart
            data={counts}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <YAxis dataKey="count" type="number" allowDecimals={false} />
            <XAxis
              dataKey="value"
              domain={[2, 12]}
              tickFormatter={(tick) => {
                if (tick >= 2) {
                  return tick;
                }
                return "N/A";
              }}
            />
            <Tooltip />
            {/*<Legend />*/}
            <Bar
              dataKey={"count"}
              tickFormatter={(tick) => tick}
              barSize={20}
              fill="#413ea0"
            />
            {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" />*/}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
